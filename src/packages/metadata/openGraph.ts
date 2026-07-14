import type { Metadata } from "next";
import { appConfig } from "@/packages/configs/app.configs";

type OpenGraphOverrides = {
  title?: string;
  description?: string;
  /** Page-relative or absolute path — resolved against appConfig.site.url if relative. */
  path?: string;
  imageUrl?: string;
  type?: "website" | "article" | "profile";
};

/**
 * openGraph.ts
 * --------------------------------------------------------------
 * Per-page Open Graph metadata, layered on top of the app-wide defaults
 * in app.metadata.ts. Use this for pages that need their own title/image
 * (a blog post, a product page) instead of duplicating the OG block by
 * hand in every `generateMetadata`.
 *
 *   export const generateMetadata = (): Metadata => ({
 *     ...buildOpenGraph({ title: post.title, description: post.excerpt, path: `/blogs/${post.slug}` }),
 *   });
 */
export const buildOpenGraph = (overrides: OpenGraphOverrides = {}): Pick<Metadata, "openGraph"> => {
  const url = overrides.path
    ? new URL(overrides.path, appConfig.site.url).toString()
    : appConfig.site.url;

  return {
    openGraph: {
      title: overrides.title ?? appConfig.site.title,
      description: overrides.description ?? appConfig.site.description,
      url,
      siteName: appConfig.site.name,
      type: overrides.type ?? "website",
      images: [{ url: overrides.imageUrl ?? appConfig.site.ogImageUrl }],
    },
  };
};
