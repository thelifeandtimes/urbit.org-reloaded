"use client";

import { useLayoutSlots } from "../lib/layoutSlots";
import { HeaderNav } from "./HeaderNav";
import { FooterSection } from "./FooterSection";

/**
 * LayoutFrame - Client component that renders the frame with hero/sidebar slots
 *
 * Split from layout.js to allow server-side generateMetadata export
 */
export function LayoutFrame({ children, nav, homepage, footerData, mobileNav, announcements, runningUrbitSections }) {
  const { hero, sidebar } = useLayoutSlots();

  return (
    <>
      {/* Mobile View - No Frame */}
      <div className="md:hidden min-h-screen flex flex-col">
        <HeaderNav
          nav={nav}
          homepage={homepage}
          mobileNav={mobileNav}
          announcements={announcements}
          runningUrbitSections={runningUrbitSections}
        />

        {/* Optional Hero - Mobile */}
        {hero && <div className="w-full">{hero}</div>}

        <div className="flex-grow mt-[var(--header-height)] z-0">{children}</div>
        <FooterSection footerData={footerData} />
      </div>

      {/* Desktop View - With Frame */}
      <div className="hidden md:flex relative w-full min-h-screen">
        {/* Left Border */}
        <div className="fixed left-0 top-0 h-screen w-[16px] z-50 pointer-events-none bg-[#ededed]" />

        {/* Top Navigation Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 flex gap-0 pointer-events-auto">
          <div className="flex items-stretch flex-1">
            <div className="h-[32px] w-[32px] flex-shrink-0">
              <img src="/components/frame/corner-top-left.svg" alt="" className="w-full h-full block" />
            </div>
            <div className="h-[16px] bg-[#ededed] flex-1" />
          </div>
          <div className="h-[51px] w-[48px] flex-shrink-0">
            <img src="/components/frame/corner-a.svg" alt="" className="w-full h-full block" />
          </div>
          <div className="flex items-stretch">
            <div className="h-[48px] bg-[#ededed] flex items-center px-4">
              <HeaderNav nav={nav} homepage={homepage} inFrame={true} />
            </div>
            <div className="h-[55px] w-[23px] flex-shrink-0">
              <img src="/components/frame/corner-right.svg" alt="" className="w-full h-full block" />
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-0 pointer-events-auto items-end">
          <div className="flex flex-1 items-end">
            <div className="h-[32px] w-[32px] flex-shrink-0">
              <div className="rotate-[-90deg] w-[32px] h-[32px]">
                <img src="/components/frame/corner-bottom-left.svg" alt="" className="w-[32px] h-[32px] block" />
              </div>
            </div>
            <div className="h-[16px] bg-[#ededed] flex-1 items-end" />
          </div>
          <div className="h-[51px] w-[48px] flex-shrink-0">
            <div className="w-full h-full scale-y-[-1]">
              <img src="/components/frame/corner-a.svg" alt="" className="w-full h-full block" />
            </div>
          </div>
          <div className="flex items-end flex-shrink-0">
            <div className="h-[48px] bg-[#ededed] flex items-center px-4">
              <FooterSection footerData={footerData} />
            </div>
            <div className="h-[55px] w-[23px] flex-shrink-0">
              <div className="w-full h-full scale-y-[-1]">
                <img src="/components/frame/corner-right.svg" alt="" className="w-full h-full block" />
              </div>
            </div>
          </div>
        </div>

        {/* Content wrapper - ensures proper flow */}
        <div className="flex-1 flex flex-col">
          {/* Optional Hero Slot - Full viewport width, in document flow */}
          {hero && (
            <div className="w-full">
              {hero}
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 pl-[16px] pr-[16px]">
            {/* Main content - centered, with conditional right padding for sidebar safe zone */}
            <main className={`max-w-[1200px] mx-auto pb-[55px] pt-[55px] ${sidebar ? 'pr-[455px]' : ''}`}>
              {children}
            </main>
          </div>

          {/* Sidebar - fixed, always pinned to right side of frame */}
          {sidebar && (
            <aside className="fixed right-[32px] top-[55px] bottom-[55px] w-[400px] z-30">
              {sidebar}
            </aside>
          )}
        </div>

        {/* Right Border */}
        <div className="fixed right-0 top-0 h-screen w-[16px] z-50 pointer-events-none bg-[#ededed]" />
      </div>
    </>
  );
}
