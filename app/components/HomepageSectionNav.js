"use client";

import { useState, useEffect, useRef } from "react";

/**
 * HomepageSectionNav - Fixed left-column navigation for homepage sections
 *
 * Displays clickable section items that scroll to the corresponding section in the right column.
 * Uses scroll-spy to highlight the active section based on scroll position.
 *
 * @param {Array} sections - Array of section objects with {id, title, label, description, subsections}
 */
export function HomepageSectionNav({ sections = [] }) {
  const [activeSection, setActiveSection] = useState("");
  const [activeSubsection, setActiveSubsection] = useState("");
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

  // Handle scroll passthrough when left column reaches scroll boundary
  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = navElement;
      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

      // If scrolling down and at bottom, or scrolling up and at top, allow event to propagate
      if ((e.deltaY > 0 && isAtBottom) || (e.deltaY < 0 && isAtTop)) {
        // Don't prevent default - let scroll propagate to right column
        return;
      }

      // Otherwise, handle scroll within this element (prevent propagation)
      e.stopPropagation();
    };

    navElement.addEventListener('wheel', handleWheel, { passive: false });
    return () => navElement.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const scrollContainer = document.getElementById('right-column-scroll');
    if (!scrollContainer) return;

    const handleScroll = () => {
      const offset = 50; // Smaller offset for container scrolling
      let currentSection = "";
      let currentSubsection = "";

      // Find active subsection based on scroll position within container
      for (const section of sections) {
        if (section.subsections) {
          for (const subsection of section.subsections) {
            const element = document.getElementById(subsection.id);
            if (element) {
              const rect = element.getBoundingClientRect();
              const containerRect = scrollContainer.getBoundingClientRect();
              const relativeTop = rect.top - containerRect.top;

              // Check if subsection is near the top of the visible container
              if (relativeTop >= -offset && relativeTop <= offset) {
                currentSection = section.id;
                currentSubsection = subsection.id;
                break;
              }
            }
          }
          if (currentSubsection) break;
        }
      }

      // Fallback: find the first visible subsection if none are at top
      if (!currentSubsection) {
        for (const section of sections) {
          if (section.subsections) {
            for (const subsection of section.subsections) {
              const element = document.getElementById(subsection.id);
              if (element) {
                const rect = element.getBoundingClientRect();
                const containerRect = scrollContainer.getBoundingClientRect();
                if (rect.top >= containerRect.top && rect.top <= containerRect.bottom) {
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

    scrollContainer.addEventListener("scroll", scrollListener);
    handleScroll(); // Initial check

    return () => scrollContainer.removeEventListener("scroll", scrollListener);
  }, [sections, activeSection, activeSubsection]);

  return (
    <nav ref={navRef} className="flex flex-col gap-8">
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
              <div className="flex flex-col gap-2 items-start">
                {section.subsections.map((subsection) => {
                  const isSubsectionActive = activeSubsection === subsection.id;

                  return (
                    <button
                      key={subsection.id}
                      onClick={() => handleSubsectionClick(subsection.id)}
                      className={`px-4 py-2 text-base font-semibold text-left rounded-[5px] transition-colors ${isSubsectionActive
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
