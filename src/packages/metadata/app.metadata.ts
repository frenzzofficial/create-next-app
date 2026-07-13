import type { Metadata } from "next";
import { appConfig } from "../configs/app.configs";

export const AppMetaData: Metadata = {
  title: appConfig.site.title,
  description: appConfig.site.description,
  metadataBase: new URL(appConfig.site.url),
  applicationName: appConfig.site.name,
  keywords: appConfig.keywords,
  openGraph: {
    title: appConfig.site.title,
    description: appConfig.site.description,
    url: appConfig.site.url,
    siteName: appConfig.site.name,
    images: [{ url: appConfig.site.ogImageUrl }],
  },
  icons: {
    icon: appConfig.site.logoUrl,
  },
};
