import Elysia, { t } from "elysia";
import { HotUpdater } from "./service";

export const index = new Elysia().get(
  "/app-version/:platform/:appVersion/:channel/:minBundleId/:bundleId",
  async (ctx) => {
    try {
      const data = await HotUpdater.updateAppVersion({
        appPlatform: ctx.params.platform,
        appVersion: ctx.params.appVersion,
        channel: ctx.params.channel,
        minBundleId: ctx.params.minBundleId,
        bundleId: ctx.params.bundleId,
      });

      return {
        ...data,
        fileUrl: data.fileUrl,
      };
    } catch (err) {
      console.log("Err: ", err);
    }
  },
  {
    params: t.Object({
      platform: t.UnionEnum(["ios", "android"]),
      minBundleId: t.Optional(t.String()),
      bundleId: t.Optional(t.String()),
      appVersion: t.Optional(t.String()),
      channel: t.Optional(t.String()),
    }),
  }
);
