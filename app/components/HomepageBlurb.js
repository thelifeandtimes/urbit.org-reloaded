import Link from "next/link";

/**
 * HomepageBlurb - Displays a full content blurb on the homepage
 * Renders title, description, full content, references, and optional CTA button
 *
 * @param {string} id - Blurb ID for anchor linking
 * @param {string} title - Blurb title
 * @param {string} description - Optional blurb description
 * @param {React.ReactNode} content - Rendered Markdoc content
 * @param {string} image - Optional light mode image path
 * @param {string} imageDark - Optional dark mode image path
 * @param {Array} references - Array of {title, link, description} reference objects
 * @param {Object} ctaButton - Optional call-to-action button {label, link, description}
 */
export function HomepageBlurb({
  id,
  title,
  description,
  content,
  image,
  imageDark,
  references = [],
  ctaButton
}) {
  return (
    <div id={id} className="mb-16 scroll-mt-0 snap-start">
      {/* Header Images */}
      {(image || imageDark) && (
        <div className="mb-6">
          {/* Light mode image */}
          {image && (
            <img
              src={image}
              alt={title}
              className="w-16 h-16 dark:hidden"
            />
          )}
          {/* Dark mode image - falls back to light image if imageDark not specified */}
          {(imageDark || image) && (
            <img
              src={imageDark || image}
              alt={title}
              className="w-16 h-16 hidden dark:block"
            />
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="text-[48px] font-serif italic text-[#44420c] leading-[45px] mb-4">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-[24px] text-[#3f3f3f] leading-[27.495px] mb-6">
          {description}
        </p>
      )}

      {/* References - displayed at top for homepage */}
      {references.length > 0 && (
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
          {references.map((ref, idx) => (
            <li key={idx}>
              <a
                href={ref.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#3f3f3f] hover:text-[#44420c] font-mono underline transition-colors"
              >
                {ref.title}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Full content */}
      <article className="prose prose-lg max-w-none mb-8 text-[#3f3f3f]">
        {content}
      </article>

      {/* CTA Button */}
      {ctaButton && ctaButton.label && ctaButton.link && (
        <div className="mt-8">
          <Link
            href={ctaButton.link}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold
              bg-[#44420c] text-white border border-[#3f3f3f] rounded-[5px]
              hover:bg-[#3f3f3f] transition-colors"
            {...(ctaButton.link.startsWith('http') && {
              target: "_blank",
              rel: "noopener noreferrer"
            })}
          >
            {ctaButton.label}
          </Link>
          {ctaButton.description && (
            <p className="text-sm text-[#3f3f3f] mt-2">{ctaButton.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
