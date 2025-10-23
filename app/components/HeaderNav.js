"use client";
import Link from "next/link";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import { NewsletterSignup } from "./NewsletterSignup";

export const HeaderNav = ({ nav, homepage, inFrame = false, mobileNav }) => {
  const headerRef = useRef(null);

  const currentRoute = usePathname();

  return (
    <React.Fragment>
      <MobileNav nav={mobileNav || nav} currentRoute={currentRoute} />
      <section
        ref={headerRef}
        className={classNames(
          "font-sans hidden md:block h-auto items-center justify-center leading-120 md:pt-0 md:pb-0 pt-3 pb-3",
          inFrame ? "" : "container fixed z-10 background"
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
    "": "",
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
    <section className="md:hidden font-sans fixed flex w-full top-0 left-0  h-auto items-center bg-accent justify-center leading-120 border-b-[1.5px] border-gray-3c z-50">
      <div className="h-[4.5rem] flex items-center font-[600] relative w-full">
        <div
          href="/"
          onClick={toggleMenu}
          className="flex items-center cursor-pointer h-full w-full justify-between select-none relative"
        >
          <Link
            href="/"
            className="flex w-36 h-16 relative items-center pl-[.7em]"
          >
            <img
              src="/icons/urbit-neu.svg"
              alt="Urbit wordmark"
              className="pb-1.5"
            />
          </Link>
        </div>
        <div
          onClick={toggleMenu}
          className="col-span-8 w-full flex pr-[.7em] items-center justify-end"
        >
          <span className="pr-4">{routeMap[splitRoute[1]]}</span>
          <span className="">{menuIsOpen
            ?
            <img
              src="/icons/hamburger.svg"
              alt="hamburger menu open"
              className="w-7 h-6"
            />
            :
            <img
              src="/icons/hamburger.svg"
              alt="hamburger menu closed"
              className="w-7 h-6"
            />
          }</span>
        </div>
      </div>
      <ul
        className={classNames(
          "absolute flex flex-col justify-between top-0 font-[600]  mt-[4.5rem] left-0 bg-accent min-h-[60vh] w-[100vw] border-b-[1.5px] border-gray-3c",
          { hidden: !menuIsOpen }
        )}
      >
        {/* Internal Navigation */}
        <div className="px-4 py-4 flex flex-col gap-6">
          {nav?.filter(navItem => !navItem.external).map((navItem, i) => {
            const isActive = currentRoute.startsWith(navItem.url) && navItem.url !== '/';
            const isHome = currentRoute === '/' && navItem.url === '/';

            return (
              <Link
                className={classNames(
                  "text-3xl leading-[1cap] first-of-type:mt-4 last-of-type:mb-4 transition-colors",
                  (isActive || isHome) ? "text-secondary" : "text-gray-87"
                )}
                key={`${navItem} + ${i}`}
                href={navItem.url}
                onClick={toggleMenu}
              >
                <span className="nav-button leading-inherit flex items-center gap-2">
                  {navItem.title}
                  {navItem.icon && (
                    <img src={`/icons/${navItem.icon}`}
                      alt="Urbit configurator icon"
                      className='w-4 h-4'
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Newsletter + Resources Block */}
        <div className="px-4 py-4 flex flex-col gap-6">
          {/* Newsletter Signup */}
          <div>
            <NewsletterSignup />
          </div>

          {/* External Resources Section */}
          {nav?.filter(navItem => navItem.external).length > 0 && (
            <div className="flex flex-col gap-4 pt-4 border-t border-gray-3c">
              <h3 className="text-sm uppercase tracking-wider text-gray-87 opacity-60">Resources</h3>
              <div className="flex flex-col gap-4">
                {nav?.filter(navItem => navItem.external).map((navItem, i) => {
                  return (
                    <Link
                      className="text-xl leading-[1cap] text-gray-87 transition-colors hover:text-secondary"
                      key={`${navItem} + ${i}`}
                      href={navItem.url}
                      onClick={toggleMenu}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="nav-button leading-inherit flex items-center gap-2">
                        {navItem.title}
                        <span className="ml-1">↗</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
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
                "flex items-center gap-2 border py-[5px] px-[15px] text-base rounded-md",
                navItem.variant == 'primary'
                  ? "bg-secondary text-primary rounded-lg"
                  : isActive
                    ? "bg-primary text-secondary rounded-lg border-secondary"
                    : "bg-primary text-secondary rounded-lg border-secondary"
              )}
              key={`${navItem} + ${i}`}
              href={navItem.url}
              target={navItem.external ? "_blank" : ""}
            >
              <span className="">{navItem.title}</span>
              {navItem.icon && (
                <img src={`/icons/${navItem.icon}`}
                  alt={`${navItem.icon} icon`}
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
