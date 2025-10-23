import React from "react";
import { getMarkdownContent, getPostsTree } from "../../lib/queries";
import { SidebarElement } from "../../components/SidebarElement";
import { OverviewNav } from "../../components/OverviewNav";
import { CollapsibleContentBlurb } from "../../components/CollapsibleContentBlurb";
import Markdoc from "@markdoc/markdoc";
import { glob } from "glob";
import path from "path";

const CONTENT_PATH = "app/content/overview/running-urbit";

export default async function RunningUrbitPage() {
  // Load the config
  const configData = await getMarkdownContent("overview/running-urbit/config.md");
  const sections = configData.frontMatter.sections || [];

  // Create a serializable version for the nav (only id and title)
  const navSections = sections.map(({ id, title }) => ({ id, title }));

  // Load all content files in the running-urbit directory
  const contentFiles = await glob(
    path.join(process.cwd(), CONTENT_PATH, "*.md")
  );

  // Parse each content file and organize by parent-section
  const contentBySection = {};

  for (const filePath of contentFiles) {
    // Skip config.md
    if (filePath.includes("config.md") || filePath.includes("todos.md")) continue;

    const slug = path
      .relative(path.join(process.cwd(), "app/content"), filePath)
      .replace(/\.md$/, "");

    try {
      const fileData = await getMarkdownContent(slug + ".md", "toml");
      const parentSection = fileData.frontMatter["parent-section"];

      if (parentSection) {
        if (!contentBySection[parentSection]) {
          contentBySection[parentSection] = [];
        }
        // Render the Markdoc content to React on the server
        const renderedContent = Markdoc.renderers.react(fileData.content, React);

        // Serialize references to plain objects
        const references = (fileData.frontMatter.references || []).map(ref => ({
          title: ref.title,
          link: ref.link,
        }));

        contentBySection[parentSection].push({
          title: fileData.frontMatter.title,
          description: fileData.frontMatter.description,
          content: renderedContent,
          references,
        });
      }
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
    }
  }

  return (
    <div>
      {/* Main content - centered with sidebar safe zone */}
      <section className="mt-9 md:mt-[6rem] container mb-32 md:mx-auto md:pr-[455px] md:max-w-[1600px]">
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
                <p className="text-xlarge mb-8">{section.content}</p>

                {/* Render collapsible content blurbs for this section */}
                {contentBySection[section.id] && (
                  <div className="space-y-0">
                    {contentBySection[section.id].map((item, idx) => (
                      <CollapsibleContentBlurb
                        key={idx}
                        title={item.title}
                        description={item.description}
                        content={item.content}
                        references={item.references}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
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
