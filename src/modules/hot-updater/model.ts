import { t } from "elysia";

export namespace HotUpdaterModel {
  export const getAppVersionRequest = t.Object({
    appPlatform: t.UnionEnum(["ios", "android"]),
    minBundleId: t.Optional(t.String()),
    bundleId: t.Optional(t.String()),
    appVersion: t.Optional(t.String()),
    channel: t.Optional(t.String()),
  });
  export type getAppVersionRequest = typeof getAppVersionRequest.static;

  export const getAppVersionResponse = t.Object({
    id: t.String(),
    platform: t.UnionEnum(["ios", "android"]),
    shouldForceUpdate: t.Boolean(),
    enabled: t.Boolean(),
    fileHash: t.String(),
    storageUri: t.String(),
    gitCommitHash: t.Optional(t.String()),
    message: t.Optional(t.String()),
    channel: t.String(),
    targetAppVersion: t.Optional(t.String()),
    fingerprintHash: t.Optional(t.String()),
    metadata: t.Optional(
      t.Object({
        app_version: t.Optional(t.String()),
      })
    ),
    fileUrl: t.String(),
  });
  export type getAppVersionResponse = typeof getAppVersionResponse.static;
}
