import Link from "next/link";

/**
 * HomepageSubsection - Displays a single subsection with title, description, and action links
 *
 * @param {string} id - Subsection ID for anchor linking
 * @param {string} title - Subsection title
 * @param {string} description - Subsection description text
 * @param {Array} links - Array of {ref, label} link objects
 */
export function HomepageSubsection({ id, title, description, links = [] }) {
  return (
    <div id={id} className="mb-12 scroll-mt-24">
      <h3 className="text-2xl font-serif font-[600] mb-4">{title}</h3>
      <p className="text-large text-gray-87 mb-6">{description}</p>

      {links.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4">
          {links.map((link, idx) => {
            const isExternal = link.ref.startsWith("http");

            return (
              <Link
                key={idx}
                href={link.ref}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-[600]
                  bg-primary text-secondary border-2 border-secondary rounded-lg
                  hover:bg-secondary hover:text-primary transition-colors"
                {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
