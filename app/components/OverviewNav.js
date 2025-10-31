"use client"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useLayoutSlots } from "../lib/layoutSlots";

export const OverviewNav = ({ runningUrbitSections = [] }) => {
  const currentRoute = usePathname();
  const { setSidebarVisible } = useLayoutSlots();

  // Ensure sidebar is visible on pages without hero
  useEffect(() => {
    setSidebarVisible(true);
  }, [setSidebarVisible]);

  return (
    <nav className="flex flex-col gap-8">
      {/* Urbit Explained Section */}
      <div>
        <h3 className="text-2xl font-sans font-[400] mb-4">Urbit Explained</h3>
        <ul className="flex flex-col gap-2 text-2xl font-sans">
          <Link
            className={currentRoute === "/overview" ? "text-primary transition-colors" : "text-contrast-2 hover:text-contrast-3 transition-colors"}
            href="/overview"
          >
            <span className="nav-button">Introduction</span>
          </Link>
          <Link
            className={
              currentRoute === "/overview/urbit-os" ? "text-primary transition-colors" : "text-contrast-2 hover:text-contrast-3 transition-colors"
            }
            href="/overview/urbit-os"
          >
            <span className="nav-button">Urbit OS</span>
          </Link>
          <Link
            className={
              currentRoute === "/overview/urbit-id" ? "text-primary transition-colors" : "text-contrast-2 hover:text-contrast-3 transition-colors"
            }
            href="/overview/urbit-id"
          >
            <span className="nav-button">Urbit ID</span>
          </Link>
          <Link
            className={
              currentRoute === "/overview/history" ? "text-primary transition-colors" : "text-contrast-2 hover:text-contrast-3 transition-colors"
            }
            href="/overview/history"
          >
            <span className="nav-button">History</span>
          </Link>
        </ul>
      </div>

      {/* Running Urbit Section */}
      <div>
        <h3 className="text-2xl font-sans font-[400] mb-4">Running Urbit</h3>
        <ul className="flex flex-col gap-2 text-2xl font-sans">
          {runningUrbitSections.map((section) => (
            <Link
              key={section.id}
              className="text-contrast-2 hover:text-contrast-3 transition-colors"
              href={`/overview/running-urbit#${section.id}`}
            >
              <span className="nav-button">{section.title}</span>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};
