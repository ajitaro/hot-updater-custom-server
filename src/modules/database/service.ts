import { PrismaClient } from "../../generated/prisma";
import { DatabaseModel } from "./model";

const prisma = new PrismaClient();

export abstract class Database {
  static async getChannels(): Promise<DatabaseModel.getBundleResponse> {
    const dataChannel = await prisma.bundles.findMany({
      orderBy: {
        channel: "asc",
      },
      distinct: ["channel"],
      select: {
        channel: true,
      },
    });

    if (dataChannel && dataChannel.length > 0) {
      return dataChannel.map((item) => {
        if (item.channel) {
          return item.channel;
        }
        return "";
      });
    }

    return [];
  }

  static async getBundleById(
    bundleId: DatabaseModel.getBundleByIdRequest
  ): Promise<DatabaseModel.getBundleByIdResponse> {
    const dataBundle = await prisma.bundles.findUnique({
      where: {
        id: bundleId,
      },
    });

    if (!dataBundle) {
      throw new Error("Bundle not found");
    }

    return {
      id: dataBundle.id,
      platform:
        dataBundle.platform as DatabaseModel.getBundleByIdResponse["platform"],
      shouldForceUpdate: dataBundle.should_force_update,
      enabled: dataBundle.enabled,
      fileHash: dataBundle.file_hash,
      storageUri: dataBundle.storage_uri,
      gitCommitHash: dataBundle.git_commit_hash || undefined,
      message: dataBundle.message || undefined,
      channel: dataBundle.channel as string,
      targetAppVersion: dataBundle.target_app_version || undefined,
      fingerprintHash: dataBundle.fingerprint_hash || undefined,
      metadata: dataBundle.metadata
        ? {
            // @ts-ignore
            app_version: dataBundle.metadata.app_version as string,
          }
        : undefined,
    };
  }

  static async getBundles(
    options: DatabaseModel.getBundlesRequest
  ): Promise<DatabaseModel.getBundlesResponse> {
    const { channel, platform, limit = 10, offset = 0 } = options ?? {};
    const dataBundles = await prisma.bundles.findMany({
      where: {
        OR: [
          {
            channel: channel,
          },
          {
            platform: platform,
          },
        ],
      },
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalBundle = await prisma.bundles.count();
    let currentPage = Math.floor(offset / limit) + 1;
    let totalPages = Math.ceil(totalBundle / limit);

    return {
      data: dataBundles.map((dataBundle) => ({
        id: dataBundle.id,
        platform:
          dataBundle.platform as DatabaseModel.getBundleByIdResponse["platform"],
        shouldForceUpdate: dataBundle.should_force_update,
        enabled: dataBundle.enabled,
        fileHash: dataBundle.file_hash,
        storageUri: dataBundle.storage_uri,
        gitCommitHash: dataBundle.git_commit_hash || undefined,
        message: dataBundle.message || undefined,
        channel: dataBundle.channel as string,
        targetAppVersion: dataBundle.target_app_version || undefined,
        fingerprintHash: dataBundle.fingerprint_hash || undefined,
        metadata: dataBundle.metadata
          ? {
              // @ts-ignore
              app_version: dataBundle.metadata.app_version as string,
            }
          : undefined,
      })),
      pagination: {
        total: totalBundle,
        hasNextPage: offset + limit < totalBundle,
        hasPreviousPage: offset > 0,
        totalPages: totalPages,
        currentPage: currentPage,
      },
    };
  }

  static async commitBundle({
    changedSets,
  }: {
    changedSets: DatabaseModel.postBundlesResponse["changedSets"];
  }): Promise<void> {
    if (!changedSets || changedSets.length === 0) {
      throw new Error("No changes to commit");
    }

    for (const change of changedSets) {
      const { operation, data } = change ?? {};
      if (change.operation === "insert") {
        await prisma.bundles.create({
          data: {
            id: data.id,
            platform: data.platform,
            should_force_update: data.shouldForceUpdate,
            enabled: data.enabled,
            file_hash: data.fileHash,
            storage_uri: data.storageUri,
            git_commit_hash: data.gitCommitHash as string,
            message: data.message,
            channel: data.channel,
            target_app_version: data.targetAppVersion as string,
            fingerprint_hash: data?.fingerprintHash ?? '',
            metadata: data.metadata as string,
          },
        });
      } else if (change.operation === "update") {
        await prisma.bundles.update({
          where: {
            id: data.id,
          },
          data: {
            platform: data.platform,
            should_force_update: data.shouldForceUpdate,
            enabled: data.enabled,
            file_hash: data.fileHash,
            storage_uri: data.storageUri,
            git_commit_hash: data.gitCommitHash as string,
            message: data.message,
            channel: data.channel,
            target_app_version: data.targetAppVersion as string,
            fingerprint_hash: data?.fingerprintHash ?? '',
            metadata: data.metadata as string,
          },
        });
      } else if (operation === "delete") {
        await prisma.bundles.delete({
          where: {
            id: data.id,
          },
        });
      }
    }
  }
}
