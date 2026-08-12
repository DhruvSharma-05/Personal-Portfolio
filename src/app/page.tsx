import { profile } from "@/content/profile";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Design } from "@/components/sections/design";
import { Skills } from "@/components/sections/skills";
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
  jobTitle: "Web Analyst",
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
    "Data Analytics",
    "Power BI",
    "Python",
    "Machine Learning",
    "SQL",
    "UI/UX Design",
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
        <Design />
        <Skills />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
