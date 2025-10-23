"use client";
import { useEffect, useRef, useState } from "react";

export const AnnouncementsSubmenu = ({ announcement }) => {
  const [shouldScroll, setShouldScroll] = useState(false);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if text width exceeds container width
    if (textRef.current && containerRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      setShouldScroll(textWidth > containerWidth);
    }
  }, [announcement]);

  if (!announcement || !announcement.active) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="md:hidden fixed top-[4.5rem] left-0 right-0 bg-[#F7D86B] border-b-[1.5px] border-gray-3c z-40 overflow-hidden"
    >
      <div className={shouldScroll ? "animate-marquee" : ""}>
        <p
          ref={textRef}
          className="font-sans font-bold text-[17px] tracking-[-0.34px] text-gray-3c px-4 py-3 whitespace-nowrap"
        >
          {announcement.text}
        </p>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }

        .animate-marquee p {
          display: inline-block;
          padding-right: 100%;
        }
      `}</style>
    </div>
  );
};
