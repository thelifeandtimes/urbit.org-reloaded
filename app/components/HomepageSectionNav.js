"use client";

import { useState, useEffect } from "react";

/**
 * HomepageSectionNav - Fixed left-column navigation for homepage sections
 *
 * Displays clickable section items that scroll to the corresponding section in the right column.
 * Uses scroll-spy to highlight the active section based on scroll position.
 *
 * @param {Array} sections - Array of section objects with {id, title, label}
 */
export function HomepageSectionNav({ sections = [] }) {
  const [activeSection, setActiveSection] = useState("");

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      const offset = 150; // Offset from top to determine "active" section
      let currentSection = "";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            currentSection = section.id;
            break;
          }
        }
      }

      // If no section is in the threshold, find the closest one above
      if (!currentSection) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i].id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top < offset) {
              currentSection = sections[i].id;
              break;
            }
          }
        }
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Throttle scroll events
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
    <nav className="flex flex-col gap-6">
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`text-left transition-colors ${
              isActive ? "text-white" : "text-gray-87 hover:text-white"
            }`}
          >
            <div className="text-2xl font-serif font-[600] mb-1">{section.title}</div>
            <div className="text-base">{section.label}</div>
          </button>
        );
      })}
    </nav>
  );
}
