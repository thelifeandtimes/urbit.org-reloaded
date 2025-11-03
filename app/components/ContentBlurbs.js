"use client";
import { useState } from "react";
import Link from "next/link";

export const CollapsibleContentBlurb = ({ title, description, content, references, image, imageDark }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          {/* Render images if provided */}
          {(image || imageDark) && (
            <div className="mb-4">
              {/* Light mode image */}
              {image && (
                <img
                  src={image}
                  alt={title}
                  className="w-12 h-12 md:w-16 md:h-16 dark:hidden"
                />
              )}
              {/* Dark mode image - falls back to light image if imageDark not specified */}
              {(imageDark || image) && (
                <img
                  src={imageDark || image}
                  alt={title}
                  className="w-12 h-12 md:w-16 md:h-16 hidden dark:block"
                />
              )}
            </div>
          )}
          <h3 className="text-4xl text-accent-1 font-[600] font-serif group-hover:text-gray-87 transition-colors">
            {title}
          </h3>
          <ul className="flex items-center gap-x-2 py-2">
            {references.map((ref, idx) => (
              <li key={idx}>
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small text-contrast-2 hover:text-primary font-mono"
                >
                  {ref.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="text-base text-gray-87 line-clamp-5">{content}</div>
        </div>
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left font-mono text-small group"
        aria-expanded={isExpanded}
      >
        {isExpanded
          ?
          (<div>Read less</div>)
          :
          (<div>Read more</div>)
        }
      </button>

      {isExpanded && (
        <div className="mt-6 animate-fadeIn">
          <article className="prose prose-invert max-w-none">
            {content}
          </article>

          {references && references.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-87">
              <h4 className="text-base font-[600] mb-3">References</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const PreviewContentBlurb = ({ id, title, description, content, references, image, imageDark }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div id={id} className="mb-16 scroll-mt-[72px] md:scroll-mt-[80px] snap-start">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          {/* Render images if provided */}
          {(image || imageDark) && (
            <div className="mb-[-60px] mr-[-36px] overflow-visible">
              {/* Light mode image */}
              {image && (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full dark:hidden"
                />
              )}
              {/* Dark mode image - falls back to light image if imageDark not specified */}
              {(imageDark || image) && (
                <img
                  src={imageDark || image}
                  alt={title}
                  className="w-full h-full hidden dark:block"
                />
              )}
            </div>
          )}
          <h3 className="text-4xl text-accent-1 font-[600] leading-10 font-serif group-hover:text-gray-87 transition-colors">
            {title}
          </h3>
          <ul className="flex items-center gap-x-2 py-2">
            {references.map((ref, idx) => (
              <li key={idx}>
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small text-contrast-2 hover:text-primary font-mono"
                >
                  {ref.title}
                </a>
              </li>
            ))}
          </ul>
          <div className={`text-base text-primary transition-transform duration-300 ${isExpanded ? '' : 'line-clamp-5'}`}>{content}</div>
        </div>
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left font-mono text-small group"
        aria-expanded={isExpanded}
      >
        {isExpanded
          ?
          (<div className="flex items-center gap-x-2">
            <div className="text-primary">
              Read less
            </div>
            <img
              src="/icons/toggle-karat.svg"
              alt=""
              className={`
                w-[9px] h-[7px] invert transition-transform duration-300
                ${isExpanded ? 'rotate-180' : 'rotate-0'}
              `}
            />
          </div>)
          :
          (<div className="flex items-center gap-x-2">
            <div className="text-contrast-2 hover:text-primary">
              Read more
            </div>
            <img
              src="/icons/toggle-karat.svg"
              alt=""
              className={`
                w-[9px] h-[7px] invert transition-transform duration-300
                ${isExpanded ? 'rotate-180' : 'rotate-0'}
              `}
            />
          </div>)
        }
      </button>
    </div>
  );
};

export const ContentBlurb = ({ title, description, content, references, image, imageDark, ctaButton }) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  // Check if there are any details to show
  const hasDetails = description || (references && references.some(ref => ref.description));

  return (
    <div className="">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          {/* Render images if provided */}
          {(image || imageDark) && (
            <div className="mb-4">
              {/* Light mode image */}
              {image && (
                <img
                  src={image}
                  alt={title}
                  className="w-12 h-12 md:w-16 md:h-16 dark:hidden"
                />
              )}
              {/* Dark mode image - falls back to light image if imageDark not specified */}
              {(imageDark || image) && (
                <img
                  src={imageDark || image}
                  alt={title}
                  className="w-12 h-12 md:w-16 md:h-16 hidden dark:block"
                />
              )}
            </div>
          )}
          <div className="flex items-center justify-between gap-4 mb-2">
            <h3 className="text-4xl text-accent-1 font-[600] font-serif group-hover:text-gray-87 transition-colors">
              {title}
            </h3>
            {/* Info button - only show if there are details */}
            {hasDetails && (
              <button
                onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                className="flex-shrink-0 p-2 hover:opacity-70 transition-opacity"
                aria-label="Toggle details"
              >
                <img
                  src="/icons/info.svg"
                  alt="Info"
                  className="w-6 h-6"
                />
              </button>
            )}
          </div>
          <ul className="flex items-center gap-x-2 py-2">
            {references && references.map((ref, idx) => (
              <li key={idx}>
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small text-contrast-2 hover:text-primary font-mono"
                >
                  {ref.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Expandable Details Section */}
      {hasDetails && isDetailsExpanded && (
        <div className="mb-6 p-4 bg-gray-87/10 rounded border border-gray-87/30 animate-fadeIn">
          {description && (
            <div className="mb-4">
              <h4 className="text-base font-[600] mb-2 text-accent-1">About</h4>
              <p className="text-base text-gray-87">{description}</p>
            </div>
          )}
          {references && references.some(ref => ref.description) && (
            <div>
              <h4 className="text-base font-[600] mb-2 text-accent-1">Reference Details</h4>
              <ul className="space-y-2">
                {references.map((ref, idx) => {
                  if (!ref.description) return null;
                  return (
                    <li key={idx}>
                      <a
                        href={ref.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-small text-contrast-2 hover:text-primary font-mono font-[600]"
                      >
                        {ref.title}
                      </a>
                      <p className="text-xs text-gray-87 mt-1">{ref.description}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Full content without line-clamp */}
      <article className="prose prose-invert max-w-none mt-6">
        {content}
      </article>

      {/* CTA Button if provided - requires link, label, and description */}
      {ctaButton && ctaButton.link && ctaButton.label && ctaButton.description && (
        <div className="mt-8">
          <a
            href={ctaButton.link}
            target={ctaButton.link.startsWith('http') ? '_blank' : undefined}
            rel={ctaButton.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-contrast-3 font-mono text-small font-[600] rounded transition-colors"
          >
            {ctaButton.label}
          </a>
          {ctaButton.description && (
            <p className="text-sm text-gray-87 mt-2">{ctaButton.description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export const MicroBlurb = ({
  title,
  description,
  content,
  references = [],
  image,
  imageDark,
  ctaButton,
  showFullContent = false  // Toggle between preview and full content
}) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  // Check if there are any details to show
  const hasDetails = description || (references && references.some(ref => ref.description));

  return (
    <div className="">
      {/* Images - smaller size for narrow layout */}
      {(image || imageDark) && (
        <div className="mb-3">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-8 h-8 md:w-10 md:h-10 dark:hidden"
            />
          )}
          {(imageDark || image) && (
            <img
              src={imageDark || image}
              alt={title}
              className="w-8 h-8 md:w-10 md:h-10 hidden dark:block"
            />
          )}
        </div>
      )}

      {/* Title with Info Button */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="text-2xl md:text-3xl text-accent-1 font-[600] font-serif transition-colors">
          {title}
        </h3>
        {hasDetails && (
          <button
            onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
            className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity"
            aria-label="Toggle details"
          >
            <img src="/icons/info.svg" alt="Info" className="w-5 h-5" />
          </button>
        )}
      </div>


      {/* Expandable Details Section */}
      {hasDetails && isDetailsExpanded && (
        <div className="mb-4 p-3 bg-gray-87/10 rounded border border-gray-87/30 animate-fadeIn">
          {references && references.some(ref => ref.description) && (
            <div>
              <h4 className="text-sm font-[600] mb-1 text-accent-1">Reference Details</h4>
              <ul className="space-y-1">
                {references.map((ref, idx) => {
                  if (!ref.description) return null;
                  return (
                    <li key={idx}>
                      <a
                        href={ref.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-contrast-2 hover:text-primary font-mono font-[600]"
                      >
                        {ref.title}
                      </a>
                      <p className="text-xs text-gray-87 mt-0.5">{ref.description}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Content - either full or line-clamped */}
      <div className={`text-sm text-primary mt-3 ${showFullContent ? '' : 'line-clamp-4'}`}>
        {showFullContent ? (
          <article className="prose prose-sm prose-invert max-w-none">
            {content}
          </article>
        ) : (
          content
        )}
      </div>

      {/* CTA Button - smaller for narrow layout */}
      {ctaButton && ctaButton.link && ctaButton.label && (
        <div className="flex mt-4 justify-end">
          {ctaButton.description && (
            <p className="text-2xl font-sans text-primary mt-2">{ctaButton.description}
              <a
                href={ctaButton.link}
                target={ctaButton.link.startsWith('http') ? '_blank' : undefined}
                rel={ctaButton.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="whitespace-nowrap items-center mx-2 px-4 py-2 bg-accent-1 hover:text-contrast-2 text-secondary font-sans text-lg font-[600] rounded-xl transition-colors"
              >
                {ctaButton.label}
              </a></p>
          )}
        </div>
      )}
    </div>
  );
};

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
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className="text-xl font-mono text-contrast-3 leading-[45px]">
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
              className="w-4 h-4"
            />
          </button>
        )}
      </div>

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
