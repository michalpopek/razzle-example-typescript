// eslint-disable-next-line import/order
import express from "express";

let app = require("./server").default;

if (module.hot) {
  module.hot.accept("./server", () => {
    console.log("🔁  HMR Reloading `./server`...");
    try {
      app = require("./server").default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

process.on("uncaughtException", (error) => {
  const reason = error?.message || error || "reason unknown";
  console.error(`💥  Uncaught exception: ${reason}`);
});

process.on("unhandledRejection", (error) => {
  const reason = error || "reason unknown";
  console.error(`💥  Unhandled rejection: ${reason}`);
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, () => {
    console.log(`🚀  App started http://localhost:${port}`);
  });
