import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "backendengineer.in" }],
        destination: "https://www.backendengineer.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
