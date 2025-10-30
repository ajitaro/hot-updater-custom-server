import { S3Client } from "bun";
import type { StorageModel } from "./model";

const s3Client = new S3Client({
  accessKeyId: process.env.S3_ACCESS_KEY_ID!,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  endpoint: process.env.S3_ENDPOINT!,
  region: "us-east-1",
  bucket: process.env.S3_BUCKET_NAME!,
});

export abstract class Storage {
  static async uploadBundle({
    bundleId,
    bundleFile,
  }: StorageModel.uploadBundleBody): Promise<StorageModel.uploadBundleResponse> {
    try {
      const filePath = `${bundleId}/bundle.zip`;

      if (bundleFile) {
        await s3Client.write(filePath, bundleFile, {
          acl: "public-read",
        });
      }

      return {
        storageUri: `s3://${process.env.S3_BUCKET_NAME}/${filePath}`,
      };
    } catch (error) {
      throw new Error("Failed to upload bundle to S3");
    }
  }

  static async deleteBundle(bundleId: string) {
    try {
      const data = await s3Client.exists(bundleId);
      if (data) {
        await s3Client.delete(bundleId + "/bundle.zip");
      }
    } catch (error) {
      throw new Error("Failed to delete bundle from S3");
    }
  }
}
