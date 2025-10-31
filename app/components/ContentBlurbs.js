"use client"
import { useState } from "react";

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
          (<div>read less</div>)
          :
          (<div>read more</div>)
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

export const PreviewContentBlurb = ({ title, description, content, references, image, imageDark }) => {
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
          (<div>read less</div>)
          :
          (<div>read more</div>)
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
