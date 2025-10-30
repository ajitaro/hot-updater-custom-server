import { t } from "elysia";

export namespace DatabaseModel {
  export const getBundleResponse = t.Array(t.Optional(t.String()));
  export type getBundleResponse = typeof getBundleResponse.static;

  export const getBundleByIdRequest = t.String();
  export type getBundleByIdRequest = typeof getBundleByIdRequest.static;

  export const getBundleByIdResponse = t.Object({
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
  });
  export type getBundleByIdResponse = typeof getBundleByIdResponse.static;

  export const getBundlesRequest = t.Object({
    channel: t.Optional(t.String()),
    platform: t.Optional(t.UnionEnum(["ios", "android"])),
    limit: t.Optional(t.Number({
        default: 0
    })),
    offset: t.Optional(t.Number({ default: 0 })),
  });
  export type getBundlesRequest = typeof getBundlesRequest.static;

  export const getBundlesResponse = t.Object({
    data: t.Array(getBundleByIdResponse),
    pagination: t.Object({
      total: t.Number(),
      hasNextPage: t.Boolean(),
      hasPreviousPage: t.Boolean(),
      totalPages: t.Number(),
      currentPage: t.Number(),
    }),
  });
  export type getBundlesResponse = typeof getBundlesResponse.static;

  export const postBundlesResponse = t.Object({
      changedSets: t.Array(t.Object({
        operation: t.UnionEnum(["insert", "update", "delete"]),
        data: t.Object({
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
          fingerprintHash: t.Optional(t.Nullable(t.String())),
          metadata: t.Optional(
            t.Object({
              app_version: t.Optional(t.String()),
            })
          ),
        }),
      })),
    })
  export type postBundlesResponse = typeof postBundlesResponse.static;
}
