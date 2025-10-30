import Elysia, { t } from "elysia";
import { Database } from "./service";
import { DatabaseModel } from "./model";

export const index = new Elysia({ prefix: "/database" })
  .get("/channels", async (ctx) => {
    const data = await Database.getChannels();

    return data;
  })
  .get("bundles/:bundleId", async ({ params }) => {
    const data = await Database.getBundleById(params.bundleId);

    return {
      ...data,
    };
  })
  .get(
    "/bundles",
    async ({ query }) => {
      const data = await Database.getBundles({
        channel: query.channel,
        platform: query.platform,
        limit: query.limit,
        offset: query.offset,
      });

      return {
        ...data,
        message: "Bundles retrieved successfully",
      };
    },
    {
      query: DatabaseModel.getBundlesRequest,
    }
  )
  .post(
    "/bundles",
    async (context) => {
      const body = context.body as DatabaseModel.postBundlesResponse;
      console.log("🚀 ~ body:", body);
      await Database.commitBundle({ changedSets: body.changedSets });

      return {
        message: "Bundle appended successfully",
      };
    },
    {
      body: DatabaseModel.postBundlesResponse,
    }
  );
