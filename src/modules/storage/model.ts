import { t } from "elysia";

export namespace StorageModel {
  export const uploadBundleBody = t.Object({
    bundleId: t.String(),
    bundleFile: t.Optional(t.File()),
  });
  export type uploadBundleBody = typeof uploadBundleBody.static;

  export const uploadBundleResponse = t.Object({
    storageUri: t.String(),
  });
  export type uploadBundleResponse = typeof uploadBundleResponse.static;

  export const deleteBundleParams = t.Object({
    bundleId: t.String(),
  });
  export type deleteBundleParams = typeof deleteBundleParams.static;
}
