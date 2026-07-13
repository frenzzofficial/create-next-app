import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { appConfig } from "@/packages/configs/app.configs";

const getBlogSlugs = (): string[] => {
  const blogDir = path.join(process.cwd(), "content", "blogs");

  if (!fs.existsSync(blogDir)) return [];

  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
};

const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: appConfig.site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${appConfig.site.url}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${appConfig.site.url}/about-us`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${appConfig.site.url}/contact-us`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${appConfig.site.url}/blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${appConfig.site.url}/blogs/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
};

export default sitemap;
