import { Elysia } from "elysia";
import { index as storage } from "./modules/storage";
import { index as database } from "./modules/database";
import { index as hotUpdater } from "./modules/hot-updater";
import { cors } from "@elysiajs/cors";
import logixlysia from "logixlysia";
import { elysiaHelmet } from "elysiajs-helmet";
import { healthcheckPlugin } from "elysia-healthcheck";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia({
  name: "Hot Updater Storemode API",
})
  .get("/ping", () => {
    return {
      status: "ok",
      message: "pong",
    };
  })
  .use(cors())
  .use(elysiaHelmet())
  .use(healthcheckPlugin())
  .use(openapi())
  .use(
    logixlysia({
      config: {
        showStartupMessage: true,
        startupMessageFormat: "simple",
        timestamp: {
          translateTime: "yyyy-mm-dd HH:MM:ss",
        },
        ip: true,
        logFilePath: "./logs/example.log",
        logRotation: {
          maxSize: "10m",
          interval: "1d",
          maxFiles: "7d",
          compress: true,
        },
        customLogFormat:
          "🦊 {now} {level} {duration} {method} {pathname} {status} {message} {ip} {epoch}",
        logFilter: {
          level: ["ERROR", "WARNING"],
          status: [500, 404],
          method: "GET",
        },
      },
    })
  )
  .use(hotUpdater)
  .use(storage)
  .use(database)
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
