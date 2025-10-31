"use client";
import { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

export const OverviewSubmenu = ({ runningUrbitSections = [] }) => {
  const currentRoute = usePathname();
  const [expandedSection, setExpandedSection] = useState(null);

  const urbitExplainedLinks = [
    { label: "Introduction", href: "/overview" },
    { label: "Urbit OS", href: "/overview/urbit-os" },
    { label: "Urbit ID", href: "/overview/urbit-id" },
    { label: "History", href: "/overview/history" },
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="md:hidden fixed top-[4.5rem] left-0 right-0 bg-contrast-1 border-b-[1.5px] border-gray-3c z-40">
      {/* Primary tabs */}
      <div className="overflow-x-auto no-scrollbar border-b border-gray-3c/30">
        <div className="flex gap-6 px-4 py-3 min-w-max">
          <button
            onClick={() => toggleSection("explained")}
            className={classNames(
              "font-sans font-bold text-[17px] tracking-[-0.34px] whitespace-nowrap transition-colors",
              expandedSection === "explained" ? "text-gray-3c" : "text-[#cbcbca]"
            )}
          >
            Urbit Explained
          </button>
          <button
            onClick={() => toggleSection("running")}
            className={classNames(
              "font-sans font-bold text-[17px] tracking-[-0.34px] whitespace-nowrap transition-colors",
              expandedSection === "running" ? "text-gray-3c" : "text-[#cbcbca]"
            )}
          >
            Running Urbit
          </button>
        </div>
      </div>

      {/* Secondary links - Urbit Explained */}
      {expandedSection === "explained" && (
        <div className="px-4 py-3 flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
          {urbitExplainedLinks.map((link) => {
            const isActive = currentRoute === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={classNames(
                  "font-sans text-base py-1 transition-colors",
                  isActive ? "text-secondary font-bold" : "text-gray-87"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Secondary links - Running Urbit */}
      {expandedSection === "running" && (
        <div className="px-4 py-3 flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
          {runningUrbitSections.map((section) => (
            <Link
              key={section.id}
              href={`/overview/running-urbit#${section.id}`}
              className="font-sans text-base text-gray-87 py-1 transition-colors hover:text-secondary"
            >
              {section.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
