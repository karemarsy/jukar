import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Instrument_Sans } from "next/font/google";
import { hero, organization } from "@/content/site";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-caveat",
  display: "swap",
});

const siteUrl = getSiteUrl();
const title = `${organization.name} — ${hero.headline.before} ${hero.headline.emphasis.replace(/\.$/, "")}`;
const description = `${organization.descriptor} Jukar helps children from families facing hardship, and children who have lost their parents, go to school — with practical help and a lot of love.`;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: "/" } } : {}),
  title,
  description,
  applicationName: organization.name,
  openGraph: {
    type: "website",
    siteName: organization.name,
    title,
    description,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f0e4",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions (Grammarly, LanguageTool…) add attributes
    // to <html>/<body> before React hydrates. This only silences attribute mismatches on
    // these two elements, not in the rest of the page.
    <html lang="en" className={`${fraunces.variable} ${instrument.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
