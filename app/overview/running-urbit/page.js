import React from "react";
import { getMarkdownContent, getSectionContent } from "../../lib/queries";
import { SidebarSlot } from "../../lib/layoutSlots";
import { SidebarElement } from "../../components/SidebarElement";
import { OverviewNav } from "../../components/OverviewNav";
import { CollapsibleContentBlurb } from "../../components/ContentBlurbs";
import Markdoc from "@markdoc/markdoc";

export default async function RunningUrbitPage() {
  // Load the config
  const configData = await getMarkdownContent("overview/running-urbit/config.md");
  const configSections = configData.frontMatter.sections || [];

  // Build sections array by iterating through config order
  const sections = [];

  for (const configSection of configSections) {
    const sectionId = configSection["section-id"];

    try {
      // Load the section file for this section-id
      const sectionData = await getSectionContent(`overview/running-urbit/sections/${sectionId}.md`);

      if (sectionData.frontMatter) {
        // Render intro and outro content
        const introRendered = sectionData.introContent
          ? Markdoc.renderers.react(sectionData.introContent, React)
          : null;
        const outroRendered = sectionData.outroContent
          ? Markdoc.renderers.react(sectionData.outroContent, React)
          : null;

        sections.push({
          id: sectionId,
          title: sectionData.frontMatter.title,
          description: sectionData.frontMatter.description,
          introLabel: sectionData.frontMatter["intro-label"] || "",
          outroLabel: sectionData.frontMatter["outro-label"] || "",
          introContent: introRendered,
          outroContent: outroRendered,
          blurbSlugs: configSection?.blurbs || [],
        });
      }
    } catch (error) {
      console.error(`Error loading section ${sectionId}:`, error);
    }
  }

  // Create a serializable version for the nav (only id and title)
  const navSections = sections.map(({ id, title }) => ({ id, title }));

  // Load all blurbs
  const blurbsBySlug = {};

  for (const section of sections) {
    for (const blurbSlug of section.blurbSlugs) {
      if (!blurbsBySlug[blurbSlug]) {
        try {
          const blurbData = await getMarkdownContent(`blurbs/${blurbSlug}.md`, "toml");

          // Render the Markdoc content to React on the server
          const renderedContent = Markdoc.renderers.react(blurbData.content, React);

          // Serialize references to plain objects
          const references = (blurbData.frontMatter.references || []).map(ref => ({
            title: ref.title,
            link: ref.link,
          }));

          blurbsBySlug[blurbSlug] = {
            title: blurbData.frontMatter.title,
            description: blurbData.frontMatter.description,
            content: renderedContent,
            references,
            image: blurbData.frontMatter.image || "",
            imageDark: blurbData.frontMatter.imageDark || "",
          };
        } catch (error) {
          console.error(`Error loading blurb ${blurbSlug}:`, error);
        }
      }
    }
  }

  return (
    <div>
      {/* Sidebar slot - renders in layout */}
      <SidebarSlot>
        <SidebarElement title="">
          <OverviewNav runningUrbitSections={navSections} />
        </SidebarElement>
      </SidebarSlot>

      {/* Main content - no longer needs sidebar safe zone */}
      <section className="mt-9 md:mt-[6rem] container mb-32 md:mx-auto">
        <div className="max-w-[1080px]">
          <h1 className="text-6xl font-serif font-tall leading-[120%] mb-4">
            {configData.frontMatter.title}
          </h1>
          <h3 className="text-3xl font-sans leading-[120%] mb-12">
            {configData.frontMatter.description}
          </h3>

          {/* Render sections */}
          <div>
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-serif font-[600] mb-4">{section.title}</h2>
                <p className="font-sans text-large text-gray-87 mb-6">{section.description}</p>

                {/* Render intro content as separate article */}
                {section.introContent && (
                  <article className="prose prose-invert max-w-none mb-8">
                    {section.introLabel && (
                      <h3 className="text-xl font-[600] mb-4">{section.introLabel}</h3>
                    )}
                    {section.introContent}
                  </article>
                )}

                {/* Render collapsible content blurbs for this section */}
                {section.blurbSlugs.length > 0 && (
                  <div className="space-y-0">
                    {section.blurbSlugs.map((blurbSlug, idx) => {
                      const blurb = blurbsBySlug[blurbSlug];
                      if (!blurb) return null;
                      return (
                        <CollapsibleContentBlurb
                          key={idx}
                          title={blurb.title}
                          description={blurb.description}
                          content={blurb.content}
                          references={blurb.references}
                          image={blurb.image}
                          imageDark={blurb.imageDark}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Render outro content as separate article */}
                {section.outroContent && (
                  <article className="prose prose-invert max-w-none mt-8">
                    {section.outroLabel && (
                      <h3 className="text-xl font-[600] mb-4">{section.outroLabel}</h3>
                    )}
                    {section.outroContent}
                  </article>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline script for anchor scrolling - runs client-side after hydration */}
      <script dangerouslySetInnerHTML={{
        __html: `
        (function() {
          function scrollToAnchor(hash) {
            if (!hash) return;
            const id = hash.startsWith('#') ? hash.slice(1) : hash;
            const element = document.getElementById(id);
            if (element) {
              const top = element.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }

          // Handle initial load with hash
          if (window.location.hash) {
            setTimeout(() => scrollToAnchor(window.location.hash), 100);
          }

          // Handle hash changes (clicking anchor links)
          window.addEventListener('hashchange', () => {
            scrollToAnchor(window.location.hash);
          });

          // Handle popstate (browser back/forward)
          window.addEventListener('popstate', () => {
            setTimeout(() => scrollToAnchor(window.location.hash), 50);
          });
        })();
      `}} />
    </div>
  );
}
