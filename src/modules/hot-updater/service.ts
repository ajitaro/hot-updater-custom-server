import { S3Client } from "bun";
import { PrismaClient } from "../../generated/prisma";
import { filterCompatibleAppVersions } from "../../utils";
import { HotUpdaterModel } from "./model";

const prisma = new PrismaClient();
const s3Client = new S3Client({
  accessKeyId: process.env.S3_ACCESS_KEY_ID!,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  endpoint: process.env.S3_ENDPOINT!,
  region: "us-east-1",
  bucket: process.env.S3_BUCKET_NAME!,
});

export abstract class HotUpdater {
  static async updateAppVersion(
    params: HotUpdaterModel.getAppVersionRequest
  ): Promise<HotUpdaterModel.getAppVersionResponse> {
    const NIL_UUID = "00000000-0000-0000-0000-000000000000";
    const response = await prisma.$transaction(async (prisma) => {
      const appVersionList = await prisma.bundles.findMany({
        where: {
          platform: params.appPlatform,
          id: {
            gte: params.minBundleId,
          },
        },
        distinct: ["target_app_version"],
        select: {
          target_app_version: true,
        },
      });

      const compatibleAppVersionList = filterCompatibleAppVersions(
        appVersionList?.map((group) => group.target_app_version) ?? [],
        params.appVersion || ""
      );

      const updateCandidate = await prisma.bundles.findFirst({
        where: {
          enabled: true,
          platform: params.appPlatform,
          channel: params.channel,
          id: {
            gte: params.bundleId,
            gt: params.minBundleId,
          },
          target_app_version: {
            in: compatibleAppVersionList,
          },
        },
        orderBy: {
          id: "desc",
        },
      });

      let result = null;
      if (updateCandidate) {
        result = {
          ...updateCandidate,
          status: "UPDATE",
        };
      } else {
        const rollbackCandidate = await prisma.bundles.findFirst({
          where: {
            enabled: true,
            platform: params.appPlatform,
            id: {
              lt: params.bundleId,
              gt: params.minBundleId,
            },
          },
          orderBy: {
            id: "desc",
          },
        });

        if (rollbackCandidate) {
          result = {
            ...rollbackCandidate,
            should_force_update: true,
            status: "ROLLBACK",
          };
        }
      }

      // 3️⃣ Kalau tidak ada hasil sama sekali → default rollback
      if (
        !result &&
        params.bundleId &&
        params.minBundleId &&
        params.bundleId !== NIL_UUID &&
        params.bundleId > params.minBundleId
      ) {
        const existingBundle = await prisma.bundles.findFirst({
          where: {
            id: params.bundleId,
            enabled: true,
            platform: params.appPlatform,
          },
          select: { id: true },
        });

        if (!existingBundle) {
          result = {
            id: NIL_UUID,
            should_force_update: true,
            message: null,
            status: "ROLLBACK",
            storage_uri: null,
          };
        }
      }

      // 4️⃣ Pastikan hasil tidak sama dengan bundle_id
      if (result?.id === params.bundleId) return null;

      return result;
    });

    if (!response) {
      throw new Error("No update available");
    }

    if (!response.storage_uri) {
      throw new Error("Storage URI is missing");
    }

    // @ts-ignore
    return {
      id: response.id,
      platform: response.platform as "android" | "ios",
      shouldForceUpdate: response.should_force_update,
      enabled: response.enabled,
      fileHash: response.file_hash,
      storageUri: response.storage_uri,
      gitCommitHash: response.git_commit_hash,
      message: response.message as string,
      channel: response.channel as string,
      fingerprintHash: response.fingerprint_hash as string,
      targetAppVersion: response.target_app_version,
      fileUrl: s3Client.presign(`${response.id}/bundle.zip`, {
        acl: "public-read",
        region: "us-east-1",
        expiresIn: 60 * 60 * 1,
      }),
    };
  }
}
