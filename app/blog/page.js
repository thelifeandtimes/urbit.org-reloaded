import React from "react";
import { getPostsTree, getToml, getMarkdownContent } from "../lib/queries";
import { SidebarPositionSlot, SidebarSlot } from "../lib/layoutSlots";
import { SidebarElement } from "../components/SidebarElement";
import { BlogNav } from "../components/BlogNav";
import Image from "next/image";
import Link from "next/link";

import { formatDate } from "../lib/utils";

export default async function BlogHome() {
  // Load blog config for sidebar position
  const blogConfig = await getMarkdownContent("blog/config.md");
  const sidebarPosition = blogConfig.frontMatter?.sidebar_position || 'right';

  const posts = await getPostsTree("blog/");

  const allPostFrontMatter = [];
  await Promise.all(
    posts.map(async (post) => {
      const frontmatter = await getToml(post.relativePath);
      allPostFrontMatter.push({
        data: frontmatter.data,
        relativePath: post.relativePath,
        slug: post.slug,
      });
    })
  );

  allPostFrontMatter.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  // Group posts by year
  const yearGroups = allPostFrontMatter.reduce((groups, post) => {
    const year = new Date(post.data.date).getFullYear().toString();
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(post);
    return groups;
  }, {});

  // Create navigation sections (sorted newest first)
  const yearSections = Object.keys(yearGroups)
    .sort((a, b) => b - a)
    .map(year => ({
      id: year,
      title: year,
      count: yearGroups[year].length
    }));

  return (
    <div>
      {/* Set sidebar position */}
      <SidebarPositionSlot position={sidebarPosition} />

      {/* Sidebar navigation */}
      <SidebarSlot>
        <SidebarElement title="Blog">
          <BlogNav sections={yearSections} />
        </SidebarElement>
      </SidebarSlot>

      <div className="mb-32 text-xlarge leading-[100%] max-w-[1200px] mx-auto">
        {Object.entries(yearGroups)
          .sort(([yearA], [yearB]) => yearB - yearA)
          .map(([year, posts]) => (
          <section key={year} id={year} className="mb-16">
            {/* Year header */}
            <h2 className="text-4xl font-serif mb-8 px-4">{year}</h2>

            {/* Posts for this year */}
            {posts.map((post) => {
          const { title, date, description, aliases, extra } = post.data;

          return (
            <Link
              href={"/blog/" + post.slug}
              key={post.slug}
              className="block md:grid group  grid-cols-6 gap-x-4 w-full my-8 "
            >
              <div className="col-span-4 group-hover:!text-gray-87 transition-all  flex flex-col leading-[120%]">
                <div className="px-4">
                  <div className="font-bold font-serif text-3xl">{title}</div>
                  <div className="font-sans mb-4 md:mb-0 text-2xl">{description}</div>
                  {extra && (extra.author || extra.ship) && (
                    <div className="col-span-1 hidden md:flex flex-col mb-4 transition-all font-mono !text-large tracking-[.01em] text-gray-f5">
                      {extra.author && <div className="mb-[.1em]">{extra.author}</div>}
                      {extra.ship && <div>{extra.ship}</div>}
                    </div>
                  )}
                </div>

                {/* <div className="font-mono flex md:hidden flex-col justify-between"> */}
                {/*   <div className="">{extra.author}</div> */}
                {/*   <div>{extra.ship}</div> */}
                {/* </div> */}
                {/* <div className="text-gray-87 mb-2">{formatDate(date)}</div> */}
                {extra?.image && (
                  <div className="xl:w-auto w-full relative mb-2 md:mb-0 ">
                    <img className="aspect-[21/9] object-cover w-full h-auto xl:w-auto xl:h-full" loading="lazy" src={extra.image} alt={title} />
                  </div>
                )}
                {extra?.tags && extra.tags.length > 0 && (
                  <div className="font-mono flex gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide snap-x snap-mandatory">
                    {extra.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-1 text-xs md:text-sm flex-shrink-0"
                      >{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
          </section>
        ))}
      </div>
    </div>
  );
}
