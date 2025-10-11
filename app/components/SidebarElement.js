/**
 * SidebarElement - Reusable sidebar container component
 *
 * Provides a fixed sidebar that scrolls independently from main content.
 * Title is pinned to the top, content scrolls within the frame.
 * Hidden on mobile (<md breakpoint) with flexible content via children prop.
 *
 * Future use cases:
 * - Blog: Recommended reading
 * - Ecosystem: Announcements/product releases
 * - Overview: Breadcrumbs/anchor links
 * - Documentation: Table of contents
 *
 * @param {string} title - Title to display at top of sidebar (pinned)
 * @param {ReactNode} children - Content to display in the sidebar (scrollable)
 * @param {string} className - Optional additional CSS classes
 *
 * TODO: Implement mobile display mechanism for sidebar content
 * Options: collapsible drawer, bottom placement, floating button, or per-component strategy
 */
export function SidebarElement({ title, children, className = "" }) {
  return (
    <aside
      className={`w-full ${className}`}
    >
      <div className="fixed right-[32px] top-[55px] bottom-[55px] w-[400px] flex flex-col bg-background z-30">
        {/* Pinned title */}
        {title && (
          <div className="px-6 py-6 shrink-0 border-b border-gray-d9">
            <h2 className="text-2xl font-serif">{title}</h2>
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </div>
      </div>
    </aside>
  );
}
