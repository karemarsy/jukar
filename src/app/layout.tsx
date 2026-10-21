import type { Metadata, Viewport } from "next";
import { Caveat, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { organization, seo } from "@/content/site";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

// Editorial display serif (one weight, regular + italic — small files).
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

// Handwritten accents only (short notes, never instructions).
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-caveat",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: "/" } } : {}),
  title: seo.title,
  description: seo.description,
  applicationName: organization.name,
  openGraph: {
    type: "website",
    siteName: organization.name,
    title: seo.title,
    description: seo.description,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ed",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions (Grammarly, LanguageTool…) add attributes
    // to <html>/<body> before React hydrates. This only silences attribute mismatches on
    // these two elements, not in the rest of the page.
    <html lang="en" className={`${serif.variable} ${instrument.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
