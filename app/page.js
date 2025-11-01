import React from "react";
import { getMarkdownContent, getSectionContent } from "./lib/queries";
import { HeroSlot, SidebarSlot, SidebarPositionSlot } from "./lib/layoutSlots";
import { HeroSection } from "./components/HeroSection";
import { HomepageSectionNav } from "./components/HomepageSectionNav";
import { HomepageBlurb } from "./components/HomepageBlurb";
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

  // Load all blurbs (both section-level and subsection-level)
  const blurbsBySlug = {};

  const loadBlurb = async (blurbSlug) => {
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
            description: ref.description || "",
          })),
          ctaButton: blurbData.frontMatter["call-to-action"] || null,
        };
      } catch (error) {
        console.error(`Error loading blurb ${blurbSlug}:`, error);
      }
    }
  };

  // Load all blurbs for all sections
  for (const configSection of configSections) {
    const sectionId = configSection["section-id"];
    const sectionBlurbSlug = configSection["section-blurb"];
    const subsectionBlurbSlugs = configSection["subsection-blurbs"] || [];

    // Load section-level blurb
    if (sectionBlurbSlug) {
      await loadBlurb(sectionBlurbSlug);
    }

    // Load all subsection-level blurbs
    for (const blurbSlug of subsectionBlurbSlugs) {
      await loadBlurb(blurbSlug);
    }

    // Build section object
    const sectionBlurb = blurbsBySlug[sectionBlurbSlug];
    sections.push({
      id: sectionId,
      sectionBlurb: sectionBlurb,
      subsectionBlurbSlugs: subsectionBlurbSlugs,
    });
  }

  // Serialize sections for client components (nav needs id and subsection labels)
  const navSections = sections.map(({ id, sectionBlurb, subsectionBlurbSlugs }) => ({
    id,
    title: sectionBlurb?.title || "",
    label: sectionBlurb?.title || "",
    description: sectionBlurb?.description || "",
    subsections: subsectionBlurbSlugs.map(slug => {
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
        {sections.map((section) => {
          const sectionBlurb = section.sectionBlurb;
          if (!sectionBlurb) return null;

          return (
            <section key={section.id} id={section.id} className="mb-16">
              <div className="border-t border-[#3f3f3f] pt-6 mb-8">
                <h2 className="text-[48px] font-serif italic text-[#44420c] leading-[45px]">
                  {sectionBlurb.title}
                </h2>
              </div>

              {/* Render section-level blurb */}
              <HomepageBlurb
                id={sectionBlurb.id}
                title={sectionBlurb.title}
                description={sectionBlurb.description}
                content={sectionBlurb.content}
                image={sectionBlurb.image}
                imageDark={sectionBlurb.imageDark}
                references={sectionBlurb.references}
                ctaButton={sectionBlurb.ctaButton}
              />

              {/* Render subsection-level blurbs */}
              <div className="space-y-16 mt-16">
                {section.subsectionBlurbSlugs.map((blurbSlug) => {
                  const blurb = blurbsBySlug[blurbSlug];
                  if (!blurb) return null;

                  return (
                    <HomepageBlurb
                      key={blurb.id}
                      id={blurb.id}
                      title={blurb.title}
                      description={blurb.description}
                      content={blurb.content}
                      image={blurb.image}
                      imageDark={blurb.imageDark}
                      references={blurb.references}
                      ctaButton={blurb.ctaButton}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
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
