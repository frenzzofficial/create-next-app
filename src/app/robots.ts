import type { MetadataRoute } from "next";
import { appConfig } from "@/packages/configs/app.configs";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you"],
    },
  ],
  sitemap: `${appConfig.site.url}/sitemap.xml`,
});

export default robots;
