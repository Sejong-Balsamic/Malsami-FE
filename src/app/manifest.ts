import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    // 자료게시판 테마 색상(document-main)
    theme_color: "#00D1F2",
    icons: [
      {
        src: "/image/og-image.png",
        sizes: "1200x1200",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
