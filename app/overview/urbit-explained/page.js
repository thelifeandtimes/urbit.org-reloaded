import React from "react";
import { getMarkdownContent } from "../../lib/queries";
import { SidebarSlot, SidebarPositionSlot } from "../../lib/layoutSlots";
import { OverviewNav } from "../../components/OverviewNav";
import { SidebarElement } from "../../components/SidebarElement";
import Markdoc from "@markdoc/markdoc";

export default async function UrbitExplained() {
  const pageData = await getMarkdownContent("overview/urbit-explained.md");

  // Load Running Urbit sections for navigation
  const configData = await getMarkdownContent("overview/running-urbit/config.md");
  const sections = configData.frontMatter.sections || [];
  const navSections = sections.map(({ id, title }) => ({ id, title }));

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
    </div>
  );
}
