"use client";

import { useState, useEffect } from "react";
import { useLayoutSlots } from "../lib/layoutSlots";

/**
 * BlogNav - Sidebar navigation for blog posts organized by year
 *
 * Displays clickable year sections that scroll to the corresponding year group.
 * Uses scroll-spy to highlight the active year based on scroll position.
 *
 * @param {Array} sections - Array of year objects with {id, title, count}
 */
export function BlogNav({ sections = [] }) {
  const [activeSection, setActiveSection] = useState("");
  const { setSidebarVisible } = useLayoutSlots();

  // Ensure sidebar is visible on blog index (no hero)
  useEffect(() => {
    setSidebarVisible(true);
  }, [setSidebarVisible]);

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll-spy to track active year
  useEffect(() => {
    const handleScroll = () => {
      const offset = 200; // Offset from top of viewport
      let currentSection = "";

      // Find active year based on scroll position
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
            {section.count && (
              <span className="ml-2 text-gray-87 font-normal">
                ({section.count})
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
