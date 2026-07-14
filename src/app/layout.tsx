import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inika, Kode_Mono, Oxanium } from "next/font/google";
import Script from "next/script";
import AppClientLayout from "@/components/layouts/AppClientLayout";
import { themeInitScript } from "@/packages/configs/theme.config";
import { AppMetaData } from "@/packages/metadata/app.metadata";

const fontSans = Oxanium({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Inika({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

const fontMono = Kode_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = AppMetaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} h-full antialiased`}
    >
      <head>
        {/* Runs before hydration so the correct .dark class is applied
            before first paint — prevents a flash of the wrong theme. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <AppClientLayout>{children}</AppClientLayout>
      </body>
    </html>
  );
}
