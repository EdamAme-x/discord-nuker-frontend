import { Metadata } from "next";

const siteName = "Discord Nuker Tool | 荒らし共栄圏 CTKPAARR";
const description = "Discord 荒らしツール / Created by @amex2189 / Sponser: 荒らし共栄圏";
const url = "https://nuke.ctkpaarr.org/";

export const SEO_DEFAULT: Metadata = {
  metadataBase: new URL(url),
  title: `${siteName}`,
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
    images: "/icon.gif",
  },
  icons: "/icon.gif"
};