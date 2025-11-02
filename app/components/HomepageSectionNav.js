"use client";

import { useState, useEffect, useRef } from "react";
import { useLayoutSlots } from "../lib/layoutSlots";
import { ContentBlurb } from "./ContentBlurbs";

/**
 * HomepageSectionNav - Sidebar navigation for homepage sections
 *
 * Displays clickable section items that scroll to the corresponding section.
 * Uses scroll-spy to highlight the active section based on scroll position.
 * Controls sidebar visibility to hide it when hero is visible on screen.
 *
 * @param {Array} sections - Array of section objects with {id, title, label, description, subsections}
 * @param {Object} sidebarBlurb - Optional blurb to display at top of sidebar
 */
export function HomepageSectionNav({ sections = [], sidebarBlurb = null }) {
  const [activeSection, setActiveSection] = useState("");
  const [activeSubsection, setActiveSubsection] = useState("");
  const navRef = useRef(null);
  const { setSidebarVisible } = useLayoutSlots();

  // Helper to get the visible element when there are duplicate IDs (desktop vs mobile)
  const getVisibleElement = (id) => {
    const elements = document.querySelectorAll(`#${id}`);
    if (elements.length === 0) return null;
    // Find the element with non-zero height (the visible one)
    return Array.from(elements).find(el => el.getBoundingClientRect().height > 0) || null;
  };

  const handleSectionClick = (sectionId) => {
    const element = getVisibleElement(sectionId);
    if (!element) {
      console.warn(`No visible element found for section: ${sectionId}`);
      return;
    }

    // Responsive offset: 72px mobile, 80px desktop (matches scroll-mt)
    const isMobile = window.innerWidth < 768; // md breakpoint
    const offset = isMobile ? 72 : 80;

    const rect = element.getBoundingClientRect();
    const targetPosition = rect.top + window.pageYOffset - offset;

    console.log('Section scroll:', {
      sectionId,
      isMobile,
      offset,
      'rect.top': rect.top,
      'window.pageYOffset': window.pageYOffset,
      targetPosition
    });

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  };

  const handleSubsectionClick = (subsectionId) => {
    const element = getVisibleElement(subsectionId);
    if (!element) {
      console.warn(`No visible element found for subsection: ${subsectionId}`);
      return;
    }

    // Responsive offset: 72px mobile, 80px desktop (matches scroll-mt)
    const isMobile = window.innerWidth < 768; // md breakpoint
    const offset = isMobile ? 72 : 80;

    const rect = element.getBoundingClientRect();
    const targetPosition = rect.top + window.pageYOffset - offset;

    console.log('Subsection scroll:', {
      subsectionId,
      isMobile,
      offset,
      'rect.top': rect.top,
      'rect.height': rect.height,
      'window.pageYOffset': window.pageYOffset,
      targetPosition
    });

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  };

  // Scroll-spy to track active section and control sidebar visibility
  useEffect(() => {
    const handleScroll = () => {
      // Control sidebar visibility based on hero scroll position
      const heroHeight = window.innerHeight;
      const shouldShowSidebar = window.scrollY > heroHeight * 0.8; // Show when 80% past hero
      setSidebarVisible(shouldShowSidebar);

      // Find active section and subsection based on scroll position
      // Responsive offset: 72px mobile, 80px desktop (matches scroll-mt)
      const isMobile = window.innerWidth < 768; // md breakpoint
      const offset = isMobile ? 72 : 80;
      let currentSection = "";
      let currentSubsection = "";

      // First, check if any section wrapper is in upper viewport
      for (const section of sections) {
        const sectionElement = getVisibleElement(section.id);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();

          // Section is active if its top is above offset and bottom is below top of viewport
          if (rect.top <= offset && rect.bottom > 0) {
            currentSection = section.id;
          }
        }

        // Then check subsections within this section
        if (section.subsections) {
          for (const subsection of section.subsections) {
            const element = getVisibleElement(subsection.id);
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
              const element = getVisibleElement(subsection.id);
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
      {/* Sidebar Blurb - displays at top if provided */}
      {sidebarBlurb && (
        <div className="pb-8 border-b border-gray-87/30">
          <ContentBlurb
            title={sidebarBlurb.title}
            description={sidebarBlurb.description}
            content={sidebarBlurb.content}
            references={sidebarBlurb.references}
            image={sidebarBlurb.image}
            imageDark={sidebarBlurb.imageDark}
            ctaButton={sidebarBlurb.ctaButton}
          />
        </div>
      )}

      {sections.map((section) => {
        const isSectionActive = activeSection === section.id;

        return (
          <div key={section.id} className="flex flex-col gap-4">
            {/* Section Header */}
            <button
              onClick={() => handleSectionClick(section.id)}
              className="text-left transition-colors"
            >
              <div className={`text-sm font-mono mb-1 transition-colors ${
                isSectionActive
                  ? 'text-[#44420c] font-bold'
                  : 'text-[#b2b2b2]'
              }`}>
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
