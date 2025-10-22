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

  // Serialize sections for client components (nav only needs id, title, label)
  const navSections = sections.map(({ id, title, label }) => ({ id, title, label }));

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full viewport height */}
      <HomepageHero hero={hero} />

      {/* Desktop Two-Column Layout */}
      <div className="hidden md:block">
        <div className="container mx-auto max-w-[1600px]">
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Fixed Section Navigation */}
            <div className="col-span-4">
              <div className="sticky top-24 pt-8">
                <HomepageSectionNav sections={navSections} />
              </div>
            </div>

            {/* Right Column - Scrolling Content */}
            <div className="col-span-8 pb-32">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-24 scroll-mt-24">
                  <div className="mb-8">
                    <h2 className="text-3xl font-serif font-[600] mb-2">{section.title}</h2>
                    <p className="text-large text-gray-87">{section.description}</p>
                  </div>

                  <div className="space-y-12">
                    {section.subsections.map((subsection) => (
                      <HomepageSubsection
                        key={subsection.id}
                        id={subsection.id}
                        title={subsection.title}
                        description={subsection.description}
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
