import React from "react";
import { getMarkdownContent } from "./lib/queries";
import { HomepageHero } from "./components/HomepageHero";
import { HomepageSectionNav } from "./components/HomepageSectionNav";
import { HomepageSubsection } from "./components/HomepageSubsection";
import { HomepageAccordion } from "./components/HomepageAccordion";

export default async function HomePage() {
  // Load homepage configuration
  const configData = await getMarkdownContent("homepage/config.md");
  const hero = configData.frontMatter.hero || {};
  const sections = configData.frontMatter.sections || [];

  // Serialize sections for client components (nav needs id, title, label, description, and subsection labels)
  const navSections = sections.map(({ id, title, label, description, subsections }) => ({
    id,
    title,
    label,
    description,
    subsections: subsections.map(({ id, label }) => ({ id, label }))
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full viewport height */}
      <HomepageHero hero={hero} />

      {/* Desktop Two-Column Layout */}
      <div className="hidden md:block">
        <div className="container mx-auto max-w-[1600px] px-4">
          <div className="flex gap-8 relative">
            {/* Left Column - Fixed Section Navigation */}
            <aside className="w-[50%] sticky top-0 self-start pt-8 h-[calc(100vh-110px)] overflow-y-auto">
              <HomepageSectionNav sections={navSections} />
            </aside>

            {/* Right Column - Scrolling Content with Snap */}
            <div
              id="right-column-scroll"
              className="w-[50%] pb-32 pt-8 h-[calc(100vh-110px)] overflow-y-auto snap-y snap-mandatory"
            >
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-16 scroll-mt-0">
                  <div className="border-t border-[#3f3f3f] pt-6 mb-8">
                    <h2 className="text-[48px] font-serif italic text-[#44420c] leading-[45px]">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-16">
                    {section.subsections.map((subsection) => (
                      <HomepageSubsection
                        key={subsection.id}
                        id={subsection.id}
                        title={subsection.title}
                        description={subsection.description}
                        image={subsection.image}
                        links={subsection.links}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Accordion Layout */}
      <div className="block md:hidden">
        <div className="container mx-auto pb-16">
          <HomepageAccordion sections={sections} />
        </div>
      </div>
    </div>
  );
}
