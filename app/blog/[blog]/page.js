import { getMarkdownContent, getYaml } from "../../lib/queries";
import { formatDate, formatAuthors } from "../../lib/utils";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { glob } from "glob";
import path from "path";

const BLOG_PATH = "app/content/blog";
const POSTS_DIR = path.join(process.cwd(), BLOG_PATH);


export async function generateMetadata({ params }, parent) {
  const postSlug = `/blog/${params.blog}.md`;
  const postData = await getMarkdownContent(postSlug, "toml");
  return {
    title: `${postData.frontMatter.title} • Blog`,
    description: `${postData.frontMatter.description}`,
    openGraph: {
      images: [
        {
          url: `${postData.frontMatter?.extra.image}`,
          width: 1200,
          height: 630,
        },
      ]
    },
  };
}
export async function generateStaticParams() {
  const postPaths = await glob(path.join(POSTS_DIR, "**/*.md"));
  const paths = postPaths?.map((postPath) => {
    const p = path.basename(postPath, ".md");
    return {
      blog: JSON.parse(JSON.stringify(p)),
      // Strip the .md extension
    };
  });

  return paths;
}

export default async function PostPage({ params }) {
  const postSlug = `/blog/${params.blog}.md`; // Append .md here to use in the file path
  const postData = await getMarkdownContent(postSlug, "toml");
  const { title, date, extra, taxonomies } = postData.frontMatter;


  return (
    <section className="flex mt-9 md:mt-[6rem] ">
      <div className="grid md:grid-cols-5 mb-32 container">
        <div className="col-start-1 col-span-5 leading-[120%] overflow-x-hidden max-w-[1080px] justify-end">
          <h1 className="text-6xl font-serif leading-[120%] mb-4">
            {postData.frontMatter.title}
          </h1>
          <h3 className="text-3xl font-serif leading-[120%] mb-4">
            {postData.frontMatter.description}
          </h3>
          <div className="flex flex-row justify-between mb-8">
            <h3 className="text-large mb-4">{postData.frontMatter.date}</h3>
            <div className="col-span-1 flex flex-col leading-[120%] mb-4 font-mono text-large tracking-[.01em] text-gray-f5">
              <div className="mb-[.1em]">{extra.author}</div>
              <div>{extra.ship}</div>
            </div>
          </div>
          {Markdoc.renderers.react(postData.content, React)}
        </div>
      </div>
      <div className="max-w-[500px]">
        <div className="text-2xl font-serif">Recommended Reading</div>
      </div>
    </section >
  );
}
