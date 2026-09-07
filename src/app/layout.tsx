import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { profile } from "@/content/profile";
import { ThemeScript } from "@/components/theme-script";
import "./globals.css";

/**
 * Three faces, two voices. Archivo is a highway-gothic grotesk with a real
 * `wdth` axis — the display type is set expanded, which is where the panel
 * character comes from. IBM Plex Sans and Mono share a skeleton and were drawn
 * for technical documentation, so a mono readout sits optically level with the
 * sans paragraph beside it.
 *
 * The variable cuts are one file each; only Mono ships as static weights, and
 * only the two actually used.
 */
const display = Archivo({
  variable: "--font-display-var",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const sans = IBM_Plex_Sans({
  variable: "--font-body-var",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const title = `${profile.name} — AI Engineer & Data Science`;
const description =
  "AI Engineer and final-year Computer Science student at NMIMS Chandigarh. Web-scraping infrastructure, LLM-backed data pipelines, on-device inference, machine learning projects and Power BI dashboards.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Dhruv Sharma",
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Engineer",
    "Web Scraping",
    "LLM Integration",
    "Python",
    "Power BI",
    "NMIMS Chandigarh",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: profile.siteUrl,
    siteName: profile.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#14110e" },
    { media: "(prefers-color-scheme: light)", color: "#f7f2e9" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh">
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
