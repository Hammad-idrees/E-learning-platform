// config/s3.config.js
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION;
const bucket = process.env.S3_BUCKET;

// Support both common env var names
const credentials = {
  accessKeyId:
    process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY || "",
  secretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_KEY || "",
};

const forcePathStyle = process.env.S3_FORCE_PATH_STYLE === "true";
export const s3Client = new S3Client({ region, credentials, forcePathStyle });
export const S3_BUCKET = bucket;
export const S3_REGION = region;

export const putObject = async ({ Key, Body, ContentType, ACL }) => {
  const params = { Bucket: bucket, Key, Body, ContentType };
  // Only include ACL when explicitly allowed; some buckets disable ACLs
  if (process.env.S3_ALLOW_ACL === "true" && ACL) {
    params.ACL = ACL;
  }
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return { key: Key, url: getPublicUrl(Key) };
};

export const deleteObject = async (Key) => {
  const command = new DeleteObjectCommand({ Bucket: bucket, Key });
  await s3Client.send(command);
};

export const getPublicUrl = (key) => {
  const overrideBase = process.env.S3_PUBLIC_BASE_URL;
  const normalizedKey = key.replace(/^\//, "");
  if (overrideBase) {
    return `${overrideBase.replace(/\/$/, "")}/${normalizedKey}`;
  }
  if (!bucket || !region) return "";
  if (forcePathStyle) {
    return `https://s3.${region}.amazonaws.com/${bucket}/${normalizedKey}`;
  }
  return `https://${bucket}.s3.${region}.amazonaws.com/${normalizedKey}`;
};
