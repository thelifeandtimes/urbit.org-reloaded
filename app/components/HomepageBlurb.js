"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * HomepageBlurb - Displays a full content blurb on the homepage
 * Renders title, description, full content, references, and optional CTA button
 * Includes collapsible info section for additional details
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
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  // Check if there are any details to show
  const hasDetails = description || (references && references.some(ref => ref.description));
  return (
    <div id={id} className="mb-16 scroll-mt-[72px] md:scroll-mt-[80px] snap-start">
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

      {/* Title with Info Button */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-[48px] font-serif italic text-[#44420c] leading-[45px]">
          {title}
        </h3>
        {/* Info button - only show if there are details */}
        {hasDetails && (
          <button
            onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
            className="flex-shrink-0 p-2 hover:opacity-70 transition-opacity mt-2"
            aria-label="Toggle details"
          >
            <img
              src="/icons/info.svg"
              alt="Info"
              className="w-7 h-7"
            />
          </button>
        )}
      </div>

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

      {/* Expandable Details Section */}
      {hasDetails && isDetailsExpanded && (
        <div className="mb-6 p-4 bg-[#f5f5f5] dark:bg-gray-87/10 rounded border border-[#3f3f3f]/30 animate-fadeIn">
          {description && (
            <div className="mb-4">
              <h4 className="text-base font-[600] mb-2 text-[#44420c]">About</h4>
              <p className="text-base text-[#3f3f3f]">{description}</p>
            </div>
          )}
          {references && references.some(ref => ref.description) && (
            <div>
              <h4 className="text-base font-[600] mb-2 text-[#44420c]">Reference Details</h4>
              <ul className="space-y-2">
                {references.map((ref, idx) => {
                  if (!ref.description) return null;
                  return (
                    <li key={idx}>
                      <a
                        href={ref.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#3f3f3f] hover:text-[#44420c] font-mono font-[600] underline"
                      >
                        {ref.title}
                      </a>
                      <p className="text-xs text-[#3f3f3f]/70 mt-1">{ref.description}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
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
