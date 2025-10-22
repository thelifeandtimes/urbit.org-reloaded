"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

export const OverviewNav = ({ runningUrbitSections = [] }) => {
  const currentRoute = usePathname();

  return (
    <nav className="flex flex-col gap-8">
      {/* Urbit Explained Section */}
      <div>
        <h3 className="text-large font-[600] mb-4">Urbit Explained</h3>
        <ul className="flex flex-col gap-2 text-base">
          <Link
            className={currentRoute === "/overview" ? "text-white" : "text-gray-87"}
            href="/overview"
          >
            <span className="nav-button">Introduction</span>
          </Link>
          <Link
            className={
              currentRoute === "/overview/urbit-os" ? "text-white" : "text-gray-87"
            }
            href="/overview/urbit-os"
          >
            <span className="nav-button">Urbit OS</span>
          </Link>
          <Link
            className={
              currentRoute === "/overview/urbit-id" ? "text-white" : "text-gray-87"
            }
            href="/overview/urbit-id"
          >
            <span className="nav-button">Urbit ID</span>
          </Link>
          <Link
            className={
              currentRoute === "/overview/history" ? "text-white" : "text-gray-87"
            }
            href="/overview/history"
          >
            <span className="nav-button">History</span>
          </Link>
        </ul>
      </div>

      {/* Running Urbit Section */}
      <div>
        <h3 className="text-large font-[600] mb-4">Running Urbit</h3>
        <ul className="flex flex-col gap-2 text-base">
          {runningUrbitSections.map((section) => (
            <Link
              key={section.id}
              className="text-gray-87"
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
