import React from "react";
import { getMarkdownContent } from "../lib/queries";
import Link from "next/link";
import { OverviewNav } from "../components/OverviewNav";
import { SidebarElement } from "../components/SidebarElement";
import Markdoc from "@markdoc/markdoc";

export default async function overview() {
  const pageData = await getMarkdownContent("overview/introduction.md");

  // Load Running Urbit sections for navigation
  const configData = await getMarkdownContent("overview/running-urbit/config.md");
  const sections = configData.frontMatter.sections || [];
  const navSections = sections.map(({ id, title }) => ({ id, title }));

  return (
    <div>
      {/* Main content - centered with sidebar safe zone */}
      <section className="mt-9 md:mt-[6rem] container mb-32 md:mx-auto md:pr-[455px] md:max-w-[1600px]">
        <div className="max-w-[1080px]">
          <article>
            {Markdoc.renderers.react(pageData.content, React)}
          </article>
          <div className="my-[5rem]">
            <Link className="next-button" href="/overview/urbit-os">
              Urbit OS →
            </Link>
          </div>
        </div>
      </section>

      {/* Fixed sidebar - only on desktop */}
      <div className="hidden md:block">
        <SidebarElement title="Overview">
          <OverviewNav runningUrbitSections={navSections} />
        </SidebarElement>
      </div>
    </div>
  );
}
