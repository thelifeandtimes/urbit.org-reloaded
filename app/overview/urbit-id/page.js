import React from "react";
import { getMarkdownContent } from "../../lib/queries";
import Link from "next/link";
import Markdoc from "@markdoc/markdoc";
import { SidebarSlot } from "../../lib/layoutSlots";
import { OverviewNav } from "../../components/OverviewNav";
import { SidebarElement } from "../../components/SidebarElement";

export default async function overview() {
  const pageData = await getMarkdownContent("overview/urbit-id.md");

  // Load Running Urbit sections for navigation
  const configData = await getMarkdownContent("overview/running-urbit/config.md");
  const sections = configData.frontMatter.sections || [];
  const navSections = sections.map(({ id, title }) => ({ id, title }));

  return (
    <div>
      {/* Sidebar slot - renders in layout */}
      <SidebarSlot>
        <SidebarElement title="Overview">
          <OverviewNav runningUrbitSections={navSections} />
        </SidebarElement>
      </SidebarSlot>

      {/* Main content - no longer needs sidebar safe zone */}
      <section className="mt-9 md:mt-[6rem] container mb-32 md:mx-auto">
        <div className="max-w-[1080px]">
          <article>
            {Markdoc.renderers.react(pageData.content, React)}
          </article>
          <div className="my-[5rem]">
            <Link className="next-button" href="/overview/history">
              History →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
