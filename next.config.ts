import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // app/icon.png is the favicon; this keeps crawlers and tools that ask for
  // /favicon.ico by hand (RSS readers, link previews) from getting a 404.
  rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon.png" }];
  },
  // The pattern tool used to live at /generator; keep old links working.
  redirects() {
    return [{ source: "/generator", destination: "/playtime", permanent: true }];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
