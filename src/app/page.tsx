import { profile } from "@/content/profile";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Contact } from "@/components/sections/contact";

/**
 * Person schema so search engines and AI crawlers get structured facts rather
 * than guessing them out of the markup.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  jobTitle: "AI Engineer",
  description: profile.summary,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Panchkula",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.university,
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Scraping",
    "Data Engineering",
    "Python",
    "LLM Integration",
    "Power BI",
    "SQL",
  ],
  sameAs: profile.socials
    .filter((s) => s.icon !== "mail")
    .map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Services />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
