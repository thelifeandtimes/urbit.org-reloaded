import "./globals.css";
import { getMarkdownContent } from "./lib/queries";

import { HeaderNav } from "./components/HeaderNav";
import { FooterSection } from "./components/FooterSection";

export async function generateMetadata({ params }, parent) {
  const config = await getMarkdownContent("config.md");
  const metadata = config.frontMatter.site_metadata;

  return {
    title: `${config.frontMatter.title} — ${config.frontMatter.subtitle}`,
    description: `${config.frontMatter?.description}`,
    openGraph: {
      images: [
        {
          url: `${metadata.meta_image}`,
          alt: `${metadata.meta_image_alt}`,
          width: 1200,
          height: 630,
        },
      ]
    },
  };
}

export default async function RootLayout({ children }) {
  const config = await getMarkdownContent("config.md");
  return (
    <html lang="en">
      <body className="min-h-[100svh] flex flex-col w-full relative" id="observer-root">
        <div className="w-[100%] flex justify-center container bg-accent">
          <HeaderNav homepage={config.frontMatter?.homepage} nav={config.frontMatter?.nav} />
        </div>
        <div className="h-full flex flex-grow mt-[var(--header-height)] z-[1]">{children}</div>
        <div className="md:fixed md:bottom-0 md:left-0 md:right-0 z-20 md:bg-accent">
          <FooterSection footerData={config.frontMatter?.footer} />
        </div>
      </body>
    </html>
  );
  // return (
  //   <html lang="en">
  //     <body className="min-h-[100svh] bg-accent">
  //       {/* ↑ Outer background color (the "frame" color) */}
  //
  //       {/* Frame wrapper with margin */}
  //       <div className="min-h-[100svh] flex flex-col relative bg-background m-0 md:m-4 lg:m-8">
  //         {/* ↑ Inner background, with margin on desktop */}
  //
  //         {/* Header - Pinned to top */}
  //         <div className="w-full flex justify-center container sticky top-0 z-20 bg-background">
  //           <HeaderNav
  //             homepage={config.frontMatter?.homepage}
  //             nav={config.frontMatter?.nav}
  //           />
  //         </div>
  //
  //         {/* Main content */}
  //         <div className="flex-grow mt-[var(--header-height)] z-[1]">
  //           {children}
  //         </div>
  //
  //         {/* Footer - Pinned to bottom */}
  //         <div className="sticky bottom-0 z-20 bg-background">
  //           <FooterSection footerData={config.frontMatter?.footer} />
  //         </div>
  //       </div>
  //     </body>
  //   </html>
  // );
}

