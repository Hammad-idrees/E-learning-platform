class LocalStorageAdapter {
  async streamVideo(hlsPath, res) {
    const fullPath = path.join(process.cwd(), "public", hlsPath);

    if (!fs.existsSync(fullPath)) {
      throw new Error("File not found");
    }

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    return fs.createReadStream(fullPath).pipe(res);
  }
}

class S3StorageAdapter {
  constructor() {
    this.s3 = new AWS.S3(); // Configured elsewhere
  }

  async streamVideo(hlsPath, res) {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: hlsPath.replace("/uploads/", ""), // Remove local prefix
    };

    const { Body } = await this.s3.getObject(params).promise();
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    return Body.pipe(res);
  }
}

// Factory selector
export default process.env.STORAGE_TYPE === "s3"
  ? new S3StorageAdapter()
  : new LocalStorageAdapter();
