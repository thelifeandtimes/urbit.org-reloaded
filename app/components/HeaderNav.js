"use client";
import Link from "next/link";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { OverviewNav } from "./OverviewNav";
import React from "react";
import { usePathname } from "next/navigation";

export const HeaderNav = ({ nav, homepage, inFrame = false }) => {
  const headerRef = useRef(null);

  const currentRoute = usePathname();

  return (
    <React.Fragment>
      <MobileNav nav={nav} currentRoute={currentRoute} />
      <section
        ref={headerRef}
        className={classNames(
          "font-mono hidden md:block h-auto items-center justify-center leading-120 md:pt-0 md:pb-0 pt-3 pb-3",
          inFrame ? "" : "container fixed z-10 bg-background"
        )}
      >
        {inFrame ? (
          <GlobalNav nav={nav} />
        ) : (
          <div className="h-auto md:flex md:flex-row md:items-center md:justify-between my-4 md:my-8">
            <div className="w-full leading-[1cap] flex justify-start h-full ">
              <div className="col-span-5 hidden md:flex w-full items-center justify-end">
                <GlobalNav nav={nav} />
              </div>
            </div>
          </div>
        )}
      </section>
    </React.Fragment>
  );
};

const MobileNav = ({ nav, currentRoute }) => {
  const [menuIsOpen, setMenuOpen] = useState(false);

  const routeMap = {
    "": "Configure",
    "get-on-the-network": "Configure",
    overview: "Overview",
    blog: "Blog",
    ecosystem: "Ecosystem",
  };
  const splitRoute = currentRoute.split("/");

  useEffect(() => { }, [menuIsOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuIsOpen);
  };

  return (
    <section className="font-mono fixed w-full top-0 left-0  h-auto z-10 items-center bg-primary justify-center leading-120 md:pt-0 md:pb-0">
      <div className="h-[4.5rem] flex md:hidden items-center font-[600] relative w-full ">
        <div
          href="/"
          className="cursor-pointer ml-8 h-full w-full grid grid-cols-12 justify-between select-none md:hover:text-gray-87 relative "
        >
          <Link
            href="/"
            className="flex col-span-4 items-center before:content-['~'] before:absolute before:left-[-.8em] before:bottom-[1em]"
          >
            Urbit
          </Link>
          <div
            onClick={toggleMenu}
            className="col-span-8 w-full hover:bg-gray-87 flex  pr-[.7em] items-center justify-end"
          >
            <span className="ml-8">{routeMap[splitRoute[1]]}</span>
            <span className="ml-2">{menuIsOpen ? "↑" : "↓"}</span>
          </div>
        </div>
      </div>
      {currentRoute.startsWith("/overview") && (
        <div className="container bg-primary mt-1 mb-4 md:hidden">
          <OverviewNav />
        </div>
      )}

      {currentRoute.startsWith("/configure") && (
        <div className="container bg-primary mt-1 mb-4 md:hidden">
          <ConfigureNav />
        </div>
      )}
      <ul
        className={classNames(
          "absolute flex flex-col top-0 font-[600]  mt-[4.5rem] left-0 bg-gray-f5 h-auto w-[100vw]",
          { hidden: !menuIsOpen }
        )}
      >
        {nav?.map((navItem, i) => {
          return (
            <Link
              className="text-gray-87 leading-[1cap] hover:bg-gray-87 hover:text-white first-of-type:mt-4 last-of-type:mb-4 py-4 container select-none"
              key={`${navItem} + ${i}`}
              href={navItem.url}
              onClick={toggleMenu}
              target={navItem.external ? "_blank" : ""}
            >
              <span className="nav-button leading-inherit flex items-center gap-2">
                {navItem.title}
                {navItem.icon && (
                  <img src={`/icons/${navItem.icon}`}
                    alt="Urbit configurator icon"
                    className='w-4 h-4'
                  />
                )}
                {navItem.url.startsWith("http") && (
                  <span className="ml-2">↗</span>
                )}
              </span>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};
const GlobalNav = ({ nav }) => {
  const currentRoute = usePathname();

  return (
    <React.Fragment>
      <ul className="flex mb-0 flex-row gap-x-4 pt-0 text-large font-[600]">
        {nav?.map((navItem, i) => {

          const isActive = currentRoute.startsWith(navItem.url);

          return (
            <Link
              className={classNames(
                "flex items-center gap-2 border border-2 py-1 px-3 text-lg rounded-md",
                navItem.variant == 'primary'
                  ? "bg-secondary text-primary rounded-lg"
                  : isActive
                    ? "bg-primary text-secondary rounded-lg border-secondary"
                    : "bg-primary text-secondary rounded-lg border-secondary opacity-50"
              )}
              key={`${navItem} + ${i}`}
              href={navItem.url}
              target={navItem.external ? "_blank" : ""}
            >
              <span className="">{navItem.title}</span>
              {navItem.icon && (
                <img src={`/icons/${navItem.icon}`}
                  alt="Urbit configurator icon"
                  className='w-4 h-4'
                />
              )}
              {navItem.external && (<span className="ml-[.2em]">↗</span>)}
            </Link>
          );
        })}
      </ul>
    </React.Fragment>
  );
};
