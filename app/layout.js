import "./globals.css";
import { getMarkdownContent } from "./lib/queries";

import { FrameLayout } from "./components/FrameLayout";

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

  // Fetch running urbit sections for OverviewSubmenu
  const runningUrbitConfig = await getMarkdownContent("overview/running-urbit/config.md");
  const runningUrbitSections = runningUrbitConfig.frontMatter.sections?.map(({ id, title }) => ({ id, title })) || [];

  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/SLTFSkylingVF.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Awesome Serif VAR-VF.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/SpaceMono-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-[100svh] w-full relative" id="observer-root">
        <FrameLayout
          nav={config.frontMatter?.nav}
          homepage={config.frontMatter?.homepage}
          footerData={config.frontMatter?.footer}
          mobileNav={config.frontMatter?.mobileNav}
          announcements={config.frontMatter?.announcements}
          runningUrbitSections={runningUrbitSections}
        >
          {children}
        </FrameLayout>
      </body>
    </html>
  );
}

