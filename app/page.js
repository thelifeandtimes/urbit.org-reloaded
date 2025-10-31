import React from "react";
import { getMarkdownContent, getSectionContent } from "./lib/queries";
import { HeroSlot, SidebarSlot, SidebarPositionSlot } from "./lib/layoutSlots";
import { HeroSection } from "./components/HeroSection";
import { HomepageSectionNav } from "./components/HomepageSectionNav";
import { HomepageSubsection } from "./components/HomepageSubsection";
import { HomepageAccordion } from "./components/HomepageAccordion";
import Markdoc from "@markdoc/markdoc";

export default async function HomePage() {
  // Load homepage configuration
  const configData = await getMarkdownContent("homepage/config.md");
  const hero = configData.frontMatter.hero || {};
  const configSections = configData.frontMatter.sections || [];
  const sidebarPosition = configData.frontMatter?.sidebar_position || 'left';

  // Build sections array with full data
  const sections = [];

  for (const configSection of configSections) {
    const sectionId = configSection["section-id"];
    try {
      const sectionData = await getSectionContent(`homepage/sections/${sectionId}.md`);
      if (sectionData.frontMatter) {
        const introRendered = sectionData.introContent
          ? Markdoc.renderers.react(sectionData.introContent, React)
          : null;
        const outroRendered = sectionData.outroContent
          ? Markdoc.renderers.react(sectionData.outroContent, React)
          : null;

        sections.push({
          id: sectionId,
          title: sectionData.frontMatter.title,
          label: sectionData.frontMatter.label,
          description: sectionData.frontMatter.description,
          introContent: introRendered,
          outroContent: outroRendered,
          blurbSlugs: configSection?.blurbs || [],
        });
      }
    } catch (error) {
      console.error(`Error loading section ${sectionId}:`, error);
    }
  }

  // Load all blurbs
  const blurbsBySlug = {};

  for (const section of sections) {
    for (const blurbSlug of section.blurbSlugs) {
      if (!blurbsBySlug[blurbSlug]) {
        try {
          const blurbData = await getMarkdownContent(`blurbs/${blurbSlug}.md`, "toml");
          const renderedContent = Markdoc.renderers.react(blurbData.content, React);

          blurbsBySlug[blurbSlug] = {
            id: blurbSlug,
            title: blurbData.frontMatter.title,
            description: blurbData.frontMatter.description,
            content: renderedContent,
            image: blurbData.frontMatter.image || "",
            imageDark: blurbData.frontMatter.imageDark || "",
            references: (blurbData.frontMatter.references || []).map(ref => ({
              title: ref.title,
              link: ref.link,
            })),
            ctaButton: blurbData.frontMatter["cta-button"] || null,
          };
        } catch (error) {
          console.error(`Error loading blurb ${blurbSlug}:`, error);
        }
      }
    }
  }

  // Serialize sections for client components (nav needs id, title, label, description, and subsection labels)
  const navSections = sections.map(({ id, title, label, description, blurbSlugs }) => ({
    id,
    title,
    label,
    description,
    subsections: blurbSlugs.map(slug => {
      const blurb = blurbsBySlug[slug];
      return blurb ? { id: slug, label: blurb.title } : null;
    }).filter(Boolean)
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

            {/* Render intro if exists */}
            {section.introContent && (
              <article className="prose prose-invert max-w-none mb-8">
                {section.introContent}
              </article>
            )}

            <div className="space-y-16">
              {section.blurbSlugs.map((blurbSlug) => {
                const blurb = blurbsBySlug[blurbSlug];
                if (!blurb) return null;

                return (
                  <HomepageSubsection
                    key={blurb.id}
                    id={blurb.id}
                    title={blurb.title}
                    description={blurb.description}
                    image={blurb.image}
                    links={blurb.references}
                  />
                );
              })}
            </div>

            {/* Render outro if exists */}
            {section.outroContent && (
              <article className="prose prose-invert max-w-none mt-8">
                {section.outroContent}
              </article>
            )}
          </section>
        ))}
      </div>

      {/* Mobile Accordion Layout */}
      <div className="block md:hidden">
        <div className="container mx-auto pb-16">
          <HomepageAccordion sections={sections} blurbsBySlug={blurbsBySlug} />
        </div>
      </div>
    </div>
  );
}
