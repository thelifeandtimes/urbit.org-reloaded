import React from "react";
import { getMarkdownContent } from "./lib/queries";
import { HeroSlot, SidebarSlot, SidebarPositionSlot } from "./lib/layoutSlots";
import { HeroSection } from "./components/HeroSection";
import { HomepageSectionNav } from "./components/HomepageSectionNav";
import { HomepageSubsection } from "./components/HomepageSubsection";
import { HomepageAccordion } from "./components/HomepageAccordion";

export default async function HomePage() {
  // Load homepage configuration
  const configData = await getMarkdownContent("homepage/config.md");
  const hero = configData.frontMatter.hero || {};
  const sections = configData.frontMatter.sections || [];
  const sidebarPosition = configData.frontMatter?.sidebar_position || 'left';

  // Serialize sections for client components (nav needs id, title, label, description, and subsection labels)
  const navSections = sections.map(({ id, title, label, description, subsections }) => ({
    id,
    title,
    label,
    description,
    subsections: subsections.map(({ id, label }) => ({ id, label }))
  }));

  return (
    <div>
      {/* Hero Section - Full viewport width via layout slot */}
      <HeroSlot>
        <HeroSection hero={hero} />
      </HeroSlot>

      {/* Set sidebar position */}
      <SidebarPositionSlot position={sidebarPosition} />

      {/* Desktop Sidebar Navigation - renders in FrameLayout */}
      <SidebarSlot>
        <HomepageSectionNav sections={navSections} />
      </SidebarSlot>

      {/* Desktop Main Content */}
      <div className="hidden md:block">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="mb-16">
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

      {/* Mobile Accordion Layout */}
      <div className="block md:hidden">
        <div className="container mx-auto pb-16">
          <HomepageAccordion sections={sections} />
        </div>
      </div>
    </div>
  );
}
