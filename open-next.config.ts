import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig(),
  // Avoid recursive `npm run build` — OpenNext calls this for the Next.js step.
  buildCommand: "npm run build:next",
};
