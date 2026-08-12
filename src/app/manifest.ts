import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Backend Engineer",
    short_name: "Backend Engineer",
    description:
      "Backend engineering, made clear - visual lessons, real architecture deep dives, and hands-on projects.",
    start_url: "/",
    display: "standalone",
    background_color: "#EEE9E3",
    theme_color: "#EEE9E3",
    icons: [
      {
        src: "/favicon.png?v=2",
        sizes: "128x128",
        type: "image/png",
      },
    ],
  };
}
