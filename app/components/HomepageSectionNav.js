"use client";

import { useState, useEffect, useRef } from "react";

/**
 * HomepageSectionNav - Sidebar navigation for homepage sections
 *
 * Displays clickable section items that scroll to the corresponding section.
 * Uses scroll-spy to highlight the active section based on scroll position.
 * Becomes sticky after hero section scrolls off viewport.
 *
 * @param {Array} sections - Array of section objects with {id, title, label, description, subsections}
 */
export function HomepageSectionNav({ sections = [] }) {
  const [activeSection, setActiveSection] = useState("");
  const [activeSubsection, setActiveSubsection] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef(null);

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubsectionClick = (subsectionId) => {
    const element = document.getElementById(subsectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle sticky-after-hero behavior and scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      // Check if we should be sticky (hero has scrolled off screen)
      // Assuming hero is approximately 100vh, check if we've scrolled past that
      const heroHeight = window.innerHeight;
      const shouldBeSticky = window.scrollY > heroHeight;
      setIsSticky(shouldBeSticky);

      // Scroll-spy: find active subsection based on scroll position
      const offset = 200; // Offset from top of viewport
      let currentSection = "";
      let currentSubsection = "";

      // Find active subsection based on scroll position
      for (const section of sections) {
        if (section.subsections) {
          for (const subsection of section.subsections) {
            const element = document.getElementById(subsection.id);
            if (element) {
              const rect = element.getBoundingClientRect();

              // Check if subsection is near the top of the viewport
              if (rect.top <= offset && rect.bottom >= offset) {
                currentSection = section.id;
                currentSubsection = subsection.id;
                break;
              }
            }
          }
          if (currentSubsection) break;
        }
      }

      // Fallback: find the first visible subsection if none are at offset
      if (!currentSubsection) {
        for (const section of sections) {
          if (section.subsections) {
            for (const subsection of section.subsections) {
              const element = document.getElementById(subsection.id);
              if (element) {
                const rect = element.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                // Check if any part of the subsection is visible in viewport
                if (rect.top < viewportHeight && rect.bottom > 0) {
                  currentSection = section.id;
                  currentSubsection = subsection.id;
                  break;
                }
              }
            }
            if (currentSubsection) break;
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
      if (currentSubsection !== activeSubsection) {
        setActiveSubsection(currentSubsection);
      }
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", scrollListener);
  }, [sections, activeSection, activeSubsection]);

  return (
    <nav ref={navRef} className="flex flex-col gap-8 h-full overflow-y-auto">
      {sections.map((section) => {
        const isSectionActive = activeSection === section.id;

        return (
          <div key={section.id} className="flex flex-col gap-4">
            {/* Section Header */}
            <button
              onClick={() => handleSectionClick(section.id)}
              className="text-left transition-colors"
            >
              <div className="text-sm font-mono text-[#b2b2b2] mb-1">
                {section.label}
              </div>
            </button>

            {/* Subsection Buttons - always visible */}
            {section.subsections && section.subsections.length > 0 && (
              <div className="flex flex-col gap-2 items-start w-full">
                {section.subsections.map((subsection) => {
                  const isSubsectionActive = activeSubsection === subsection.id;

                  return (
                    <button
                      key={subsection.id}
                      onClick={() => handleSubsectionClick(subsection.id)}
                      className={`px-4 py-2 text-base font-semibold text-left rounded-[5px] transition-colors w-full ${isSubsectionActive
                        ? "bg-[#44420c] text-primary border border-[#44420c]"
                        : "bg-primary text-[#3f3f3f] border border-[#3f3f3f] hover:bg-[#44420c] hover:text-primary"
                        }`}
                    >
                      {subsection.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
