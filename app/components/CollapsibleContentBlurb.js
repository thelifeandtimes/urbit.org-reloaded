"use client"
import { useState } from "react";

export const CollapsibleContentBlurb = ({ title, description, content, references }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-87 py-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left group"
        aria-expanded={isExpanded}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-large font-[600] mb-2 group-hover:text-gray-87 transition-colors">
              {title}
            </h3>
            <p className="text-base text-gray-87">{description}</p>
          </div>
          <div className="flex-shrink-0 mt-1">
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-6 animate-fadeIn">
          <article className="prose prose-invert max-w-none">
            {content}
          </article>

          {references && references.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-87">
              <h4 className="text-base font-[600] mb-3">References</h4>
              <ul className="space-y-2">
                {references.map((ref, idx) => (
                  <li key={idx}>
                    <a
                      href={ref.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-gray-87 hover:text-white underline decoration-[.01em] underline-offset-[.1em]"
                    >
                      {ref.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
