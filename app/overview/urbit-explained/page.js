import React from "react";
import { getMarkdownContent, getSectionContent } from "../../lib/queries";
import { SidebarSlot, SidebarPositionSlot } from "../../lib/layoutSlots";
import { OverviewNav } from "../../components/OverviewNav";
import { SidebarElement } from "../../components/SidebarElement";
import Markdoc from "@markdoc/markdoc";

export default async function UrbitExplained() {
  const pageData = await getMarkdownContent("overview/urbit-explained.md");

  // Load Running Urbit sections for navigation
  const configData = await getMarkdownContent("overview/running-urbit/config.md");
  const configSections = configData.frontMatter.sections || [];

  const navSections = [];
  for (const configSection of configSections) {
    const sectionId = configSection["section-id"];
    try {
      const sectionData = await getSectionContent(`overview/running-urbit/sections/${sectionId}.md`);
      if (sectionData.frontMatter) {
        navSections.push({
          id: sectionId,
          title: sectionData.frontMatter.title
        });
      }
    } catch (error) {
      console.error(`Error loading section ${sectionId}:`, error);
    }
  }

  // Load overview config for sidebar position
  const overviewConfig = await getMarkdownContent("overview/config.md");
  const sidebarPosition = overviewConfig.frontMatter?.sidebar_position || 'right';

  return (
    <div>
      {/* Set sidebar position */}
      <SidebarPositionSlot position={sidebarPosition} />

      {/* Sidebar slot - renders in layout */}
      <SidebarSlot>
        <SidebarElement title="">
          <OverviewNav runningUrbitSections={navSections} />
        </SidebarElement>
      </SidebarSlot>

      {/* Main content */}
      <img src="/icons/digi-logo-1.svg" className="hidden md:block pb-4" />
      <section className="mt-9 md:mt-[6rem] container mb-32 md:mx-auto">
        <div className="max-w-[1080px]">
          <article>
            {Markdoc.renderers.react(pageData.content, React)}
          </article>
        </div>
      </section>

      {/* Inline script for anchor scrolling - runs client-side after hydration */}
      <script dangerouslySetInnerHTML={{__html: `
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
