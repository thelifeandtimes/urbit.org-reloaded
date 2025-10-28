"use client";

import { useState, useEffect } from "react";

/**
 * EcosystemNav - Sidebar navigation for ecosystem page sections
 *
 * Displays clickable section items that scroll to the corresponding section.
 * Uses scroll-spy to highlight the active section based on scroll position.
 *
 * @param {Array} sections - Array of section objects with {id, title}
 */
export function EcosystemNav({ sections = [] }) {
  const [activeSection, setActiveSection] = useState("");

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll-spy to track active section
  useEffect(() => {
    const handleScroll = () => {
      const offset = 200; // Offset from top of viewport
      let currentSection = "";

      // Find active section based on scroll position
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();

          // Check if section is near the top of the viewport
          if (rect.top <= offset && rect.bottom >= offset) {
            currentSection = section.id;
            break;
          }
        }
      }

      // Fallback: find the first visible section if none are at offset
      if (!currentSection) {
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            // Check if any part of the section is visible in viewport
            if (rect.top < viewportHeight && rect.bottom > 0) {
              currentSection = section.id;
              break;
            }
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
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
  }, [sections, activeSection]);

  return (
    <nav className="flex flex-col gap-4">
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`text-left text-large font-[600] transition-colors ${
              isActive ? "text-white" : "text-gray-87 hover:text-white"
            }`}
          >
            {section.title}
          </button>
        );
      })}
    </nav>
  );
}
