/**
 * Heading component for Markdoc-rendered content
 *
 * Renders proper semantic HTML headings (h1-h6) based on level prop.
 * Maintains visual hierarchy for article/blog content while ensuring
 * accessibility and SEO compliance.
 *
 * @param {number} level - Heading level (1-6)
 * @param {ReactNode} children - Heading content
 */
export function Heading({ level, children }) {
  // Dynamically create the appropriate heading tag
  const HeadingTag = `h${level}`;

  // Map heading levels to Tailwind classes for article content
  // These styles match the existing visual hierarchy from globals.css
  const styles = {
    1: "text-4xlarge font-[400] mb-8 md:mb-16 lg:mb-20 leading-[100%] my-[2.5rem]",
    2: "text-xlarge font-[700] mb-[2.6rem]",
    3: "text-large font-[700] mb-[1.6rem]",
    4: "text-base font-[700] mb-4",
    5: "text-base font-[600] mb-3",
    6: "text-base font-[500] mb-2",
  };

  return (
    <HeadingTag className={styles[level] || styles[1]}>
      {children}
    </HeadingTag>
  );
}
