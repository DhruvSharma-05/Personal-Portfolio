import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { ThemeScript } from "@/components/theme-script";
import "./globals.css";

// Only the weights actually referenced in the markup — each one is a separate
// download, so unused weights are pure waste.
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

const sans = Inter({
  variable: "--font-sans-var",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const title = `${profile.name} — Web Analyst & Data Science`;
const description =
  "Web Analyst and Computer Science student at NMIMS Chandigarh. Power BI dashboards, Python automation, machine learning projects and UI/UX design case studies.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Dhruv Sharma",
    "Web Analyst",
    "Data Analyst",
    "Power BI",
    "Python",
    "Machine Learning",
    "UI/UX Designer",
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
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbf8" },
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
