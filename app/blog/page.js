import React from "react";
import { getPostsTree, getToml } from "../lib/queries";
import Image from "next/image";
import Link from "next/link";

import { formatDate } from "../lib/utils";

export default async function BlogHome() {
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

  return (
    <div className="mb-32  text-xlarge leading-[100%] max-w-[1200px] mx-auto">
      {/* <section className="md:grid grid-cols-6 gap-x-4 w-full"> */}
      {/*   <div className="col-span-1"></div> */}
      {/*   <div className="col-span-4 leading-[120%] font-[400]"> */}
      {/*     Stories from the broader Urbit community, the Urbit Foundation, and */}
      {/*     the many people contributing to Urbit. */}
      {/*   </div> */}
      {/* </section> */}
      <section className="">
        {allPostFrontMatter.map((post) => {
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
                  <div className="col-span-1 hidden md:flex flex-col mb-4 transition-all font-mono !text-large tracking-[.01em] text-gray-f5">
                    <div className="mb-[.1em] ">{extra.author}</div>
                    <div>{extra.ship}</div>
                  </div>
                </div>

                {/* <div className="font-mono flex md:hidden flex-col justify-between"> */}
                {/*   <div className="">{extra.author}</div> */}
                {/*   <div>{extra.ship}</div> */}
                {/* </div> */}
                {/* <div className="text-gray-87 mb-2">{formatDate(date)}</div> */}
                {extra.image && (
                  <div className="xl:w-auto w-full relative mb-2 md:mb-0 ">
                    <img className="aspect-[21/9] object-cover w-full h-auto xl:w-auto xl:h-full" loading="lazy" src={extra.image} alt={title} />
                  </div>
                )}
                {extra.tags && extra.tags.length > 0 && (
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
    </div>
  );
}
