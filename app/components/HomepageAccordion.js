"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * HomepageAccordion - Mobile accordion view for homepage sections
 *
 * Displays sections as collapsible accordions, each containing their blurbs.
 * Only one section can be expanded at a time.
 *
 * @param {Array} sections - Array of section objects with blurbSlugs
 * @param {Object} blurbsBySlug - Object mapping blurb slugs to blurb data
 */
export function HomepageAccordion({ sections = [], blurbsBySlug = {} }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => {
        const isExpanded = expandedSection === section.id;

        return (
          <div key={section.id} className="border-b border-gray-87">
            {/* Section Header - Clickable */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full text-left py-4 flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <h2 className="text-xl font-serif font-[600] mb-1">{section.title}</h2>
                <p className="text-sm text-gray-87">{section.label}</p>
              </div>
              <div className="flex-shrink-0 mt-1">
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Expanded Content - Blurbs */}
            {isExpanded && (
              <div className="pb-6 animate-fadeIn">
                <p className="text-base text-gray-87 mb-6">{section.description}</p>

                <div className="flex flex-col gap-8">
                  {section.blurbSlugs.map((blurbSlug) => {
                    const blurb = blurbsBySlug[blurbSlug];
                    if (!blurb) return null;

                    return (
                      <div key={blurb.id}>
                        <h3 className="text-large font-[600] mb-2">{blurb.title}</h3>
                        <p className="text-base text-gray-87 mb-4">
                          {blurb.description}
                        </p>

                        {blurb.references && blurb.references.length > 0 && (
                          <div className="flex flex-col gap-3">
                            {blurb.references.map((link, idx) => {
                              const isExternal = link.link.startsWith("http");

                              return (
                                <Link
                                  key={idx}
                                  href={link.link}
                                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-[600]
                                    bg-primary text-secondary border-2 border-secondary rounded-lg
                                    hover:bg-secondary hover:text-primary transition-colors"
                                  {...(isExternal && {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  })}
                                >
                                  {link.title}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
