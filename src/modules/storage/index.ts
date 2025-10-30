import { Elysia, t } from "elysia";
import { Storage } from "./service";
import { StorageModel } from "./model";

export const index = new Elysia({ prefix: "/storage" })
  .post(
    "/upload-bundle",
    async ({ body }) => {
      const response = await Storage.uploadBundle(body);
      console.log("🚀 ~ response:", response);

      return response;
    },
    {
      body: StorageModel.uploadBundleBody,
      afterResponse: (ctx) => {
        console.log("Body: ", ctx);
      },
      beforeHandle: (ctx) => {
        console.log("Body: ", ctx);
      },
      afterHandle: (ctx) => {
        console.log("Body: ", ctx);
      },
      
      error: (err) => {
        console.log("Body: ", err);
      },

    }
  )
  .get(
    "/delete-bundle/:bundleId",
    async ({ params }) => {
      await Storage.deleteBundle(params.bundleId);

      return { message: "Bundle deleted successfully" };
    },
    {
      params: StorageModel.deleteBundleParams,
      response: {
        200: t.Object({
          message: t.String(),
        }),
      },
    }
  );
