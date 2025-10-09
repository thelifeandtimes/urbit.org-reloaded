"use client";
import { HeaderNav } from "./HeaderNav";
import { FooterSection } from "./FooterSection";

export const FrameLayout = ({ children, nav, homepage, footerData }) => {
  return (
    <>
      {/* Mobile View - No Frame */}
      <div className="md:hidden min-h-screen flex flex-col">
        <HeaderNav nav={nav} homepage={homepage} />
        <div className="flex-grow mt-[var(--header-height)]">{children}</div>
        <FooterSection footerData={footerData} />
      </div>

      {/* Desktop View - With Frame */}
      <div className="hidden md:flex relative w-full min-h-screen">
        {/* Left Border */}
        <div className="fixed left-0 top-0 h-screen w-[32px] z-50 pointer-events-none">
          {/* Background fill to the left of the vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-[16px] bg-[#ededed]"></div>

          {/* Top left corner */}
          <div className="w-[32px] h-[32px] absolute top-0 left-0">
            <img
              src="/components/frame/corner-top-left.svg"
              alt=""
              className="w-full h-full block"
            />
          </div>
          {/* Vertical line - positioned to align with curve end */}
          <div className="absolute left-[16px] top-[32px] bottom-[32px] w-[2px] opacity-0">
            <img
              src="/components/frame/line-vertical.svg"
              alt=""
              className="w-full h-full block"
            />
          </div>
          {/* Bottom left corner */}
          <div className="w-[32px] h-[32px] absolute bottom-0 left-0">
            <div className="rotate-[-90deg] w-[32px] h-[32px]">
              <img
                src="/components/frame/corner-bottom-left.svg"
                alt=""
                className="w-[32px] h-[32px] block"
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen pl-[32px] pr-[23px]">
          {/* Top Navigation Bar */}
          <div className="h-[51px] shrink-0 flex items-center bg-[#ededed] pointer-events-auto">
            <HeaderNav nav={nav} homepage={homepage} />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>

          {/* Bottom Footer Bar */}
          <div className="h-[55px] shrink-0 flex items-center bg-[#ededed] pointer-events-auto">
            <FooterSection footerData={footerData} />
          </div>
        </div>

        {/* Right Border */}
        <div className="fixed right-0 top-0 h-screen w-[23px] z-50 pointer-events-none">
          {/* Background fill to the right of the vertical line */}
          <div className="absolute right-0 top-0 bottom-0 w-[16px] bg-[#ededed]"></div>

          {/* Top right corner */}
          <div className="h-[55px] w-[23px] absolute top-0 right-0">
            <img
              src="/components/frame/corner-right.svg"
              alt=""
              className="w-full h-full block"
            />
          </div>
          {/* Vertical line - positioned to align with curve end */}
          <div className="absolute right-[7px] top-[55px] bottom-[55px] w-[2px] opacity-0">
            <img
              src="/components/frame/right-line-v.svg"
              alt=""
              className="w-full h-full block"
            />
          </div>
          {/* Bottom right corner */}
          <div className="h-[55px] w-[23px] absolute bottom-0 right-0">
            <div className="w-full h-full scale-y-[-1]">
              <img
                src="/components/frame/corner-right.svg"
                alt=""
                className="w-full h-full block"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
