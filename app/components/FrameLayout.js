"use client";
import { HeaderNav } from "./HeaderNav";
import { FooterSection } from "./FooterSection";

export const FrameLayout = ({ children, nav, homepage, footerData, mobileNav }) => {
  return (
    <>
      {/* Mobile View - No Frame */}
      <div className="md:hidden min-h-screen flex flex-col">
        <HeaderNav nav={nav} homepage={homepage} mobileNav={mobileNav} />
        <div className="flex-grow mt-[var(--header-height)] z-0">{children}</div>
        <FooterSection footerData={footerData} />
      </div>

      {/* Desktop View - With Frame */}
      <div className="hidden md:flex relative w-full min-h-screen">
        {/* Left Border - Background fill only */}
        <div className="fixed left-0 top-0 h-screen w-[16px] z-50 pointer-events-none bg-[#ededed]">
        </div>

        {/* Top Navigation Bar - Fixed with stepped cutout */}
        <div className="fixed top-0 left-0 right-0 z-40 flex gap-0 pointer-events-auto">
          {/* Left segment with corner */}
          <div className="flex items-stretch flex-1">
            {/* Top left corner - 32px total */}
            <div className="h-[32px] w-[32px] flex-shrink-0">
              <img
                src="/components/frame/corner-top-left.svg"
                alt=""
                className="w-full h-full block"
              />
            </div>
            <div className="h-[16px] bg-[#ededed] flex-1"></div>
          </div>
          {/* Transition between left and right segments */}
          <div className="h-[51px] w-[48px] flex-shrink-0">
            <img
              src="/components/frame/corner-a.svg"
              alt=""
              className="w-full h-full block"
            />
          </div>
          {/* Right segment with corner - 48px height to match straight edge of corner */}
          <div className="flex items-stretch">
            <div className="h-[48px] bg-[#ededed] flex items-center px-4">
              <HeaderNav nav={nav} homepage={homepage} inFrame={true} />
            </div>
            {/* Top right corner - 55px total (48px straight + 7px curve) */}
            <div className="h-[55px] w-[23px] flex-shrink-0">
              <img
                src="/components/frame/corner-right.svg"
                alt=""
                className="w-full h-full block"
              />
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar - Fixed with stepped cutout */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-0 pointer-events-auto items-end">
          {/* Left segment with corner */}
          <div className="flex flex-1 items-end">
            {/* Bottom left corner - 32px total */}
            <div className="h-[32px] w-[32px] flex-shrink-0">
              <div className="rotate-[-90deg] w-[32px] h-[32px]">
                <img
                  src="/components/frame/corner-bottom-left.svg"
                  alt=""
                  className="w-[32px] h-[32px] block"
                />
              </div>
            </div>
            <div className="h-[16px] bg-[#ededed] flex-1 items-end"></div>
          </div>
          {/* Transition between left and right segments - flipped vertically for bottom */}
          <div className="h-[51px] w-[48px] flex-shrink-0">
            <div className="w-full h-full scale-y-[-1]">
              <img
                src="/components/frame/corner-a.svg"
                alt=""
                className="w-full h-full block"
              />
            </div>
          </div>
          {/* Right segment with corner - aligned to bottom */}
          <div className="flex items-end flex-shrink-0">
            <div className="h-[48px] bg-[#ededed] flex items-center px-4">
              <FooterSection footerData={footerData} />
            </div>
            {/* Bottom right corner - 55px total (48px straight + 7px curve), extends below footer */}
            <div className="h-[55px] w-[23px] flex-shrink-0">
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

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen pl-[16px] pr-[16px]">
          {/* Spacer for fixed nav - matches tallest part of nav bar (55px corner) */}

          {/* Content */}
          <div className="flex-1 overflow-auto pb-[55px]">
            {children}
          </div>
        </div>

        {/* Right Border - Background fill only */}
        <div className="fixed right-0 top-0 h-screen w-[16px] z-50 pointer-events-none bg-[#ededed]">
        </div>
      </div>
    </>
  );
};
