import type { Metadata } from "next";
import { appConfig } from "@/packages/configs/app.configs";

type TwitterOverrides = {
  title?: string;
  description?: string;
  imageUrl?: string;
  card?: "summary" | "summary_large_image";
};

/**
 * twitter.ts
 * --------------------------------------------------------------
 * Per-page Twitter/X card metadata, mirroring openGraph.ts's shape so a
 * page can set both together:
 *
 *   export const generateMetadata = (): Metadata => ({
 *     ...buildOpenGraph({ title, description, path }),
 *     ...buildTwitterCard({ title, description }),
 *   });
 */
export const buildTwitterCard = (overrides: TwitterOverrides = {}): Pick<Metadata, "twitter"> => ({
  twitter: {
    card: overrides.card ?? "summary_large_image",
    title: overrides.title ?? appConfig.site.title,
    description: overrides.description ?? appConfig.site.description,
    images: [overrides.imageUrl ?? appConfig.site.ogImageUrl],
  },
});
