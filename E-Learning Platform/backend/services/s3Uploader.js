import fs from "fs";
import path from "path";
import mime from "mime";
import {
  putObject,
  deleteObject,
  getPublicUrl,
  s3Client,
  S3_BUCKET,
} from "../config/s3.config.js";
import { ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";

const CONTENT_TYPE_OVERRIDES = {
  ".m3u8": "application/vnd.apple.mpegurl",
  ".ts": "video/MP2T",
};

export const uploadBufferToS3 = async ({ buffer, key, contentType, acl }) => {
  const finalContentType =
    contentType ||
    CONTENT_TYPE_OVERRIDES[path.extname(key).toLowerCase()] ||
    mime.getType(key) ||
    "application/octet-stream";
  return putObject({
    Key: key,
    Body: buffer,
    ContentType: finalContentType,
    ACL: acl,
  });
};

export const uploadFileToS3 = async ({ filePath, key, acl }) => {
  const body = fs.readFileSync(filePath);
  const contentType =
    CONTENT_TYPE_OVERRIDES[path.extname(key).toLowerCase()] ||
    mime.getType(key) ||
    "application/octet-stream";
  return putObject({
    Key: key,
    Body: body,
    ContentType: contentType,
    ACL: acl,
  });
};

export const uploadDirectoryToS3 = async ({ localDir, baseKey, acl }) => {
  const uploaded = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir)) {
      const abs = path.join(dir, entry);
      const stat = fs.statSync(abs);
      if (stat.isDirectory()) {
        walk(abs);
      } else {
        const rel = path.relative(localDir, abs).replace(/\\/g, "/");
        const key = `${baseKey.replace(/\/$/, "")}/${rel}`;
        const contentType =
          CONTENT_TYPE_OVERRIDES[path.extname(key).toLowerCase()] ||
          mime.getType(key) ||
          "application/octet-stream";
        uploaded.push(
          putObject({
            Key: key,
            Body: fs.readFileSync(abs),
            ContentType: contentType,
            ACL: acl,
          })
        );
      }
    }
  };
  walk(localDir);
  await Promise.all(uploaded);
  return true;
};

export const deleteS3Object = async (key) => deleteObject(key);
export const publicUrlForKey = (key) => getPublicUrl(key);

// Delete all objects under a given prefix (acts like recursive folder delete)
export const deleteS3Prefix = async (prefix) => {
  const normalizedPrefix = String(prefix).replace(/^\/+/, "");
  let continuationToken = undefined;
  let totalDeleted = 0;
  do {
    const listParams = {
      Bucket: S3_BUCKET,
      Prefix: normalizedPrefix,
      ContinuationToken: continuationToken,
    };
    const listResp = await s3Client.send(new ListObjectsV2Command(listParams));
    const objects = listResp.Contents || [];
    if (objects.length > 0) {
      const deleteParams = {
        Bucket: S3_BUCKET,
        Delete: {
          Objects: objects.map((o) => ({ Key: o.Key })),
          Quiet: true,
        },
      };
      await s3Client.send(new DeleteObjectsCommand(deleteParams));
      totalDeleted += objects.length;
    }
    continuationToken = listResp.IsTruncated
      ? listResp.NextContinuationToken
      : undefined;
  } while (continuationToken);
  return totalDeleted;
};
