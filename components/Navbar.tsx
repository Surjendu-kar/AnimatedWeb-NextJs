"use client";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const pathVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      delay: 0.5,
      duration: 2,
      ease: "easeInOut" as const,
    },
  },
};

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const isOurWorksPage = pathname === "/our-works";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > 50 && currentScrollY > lastScrollY.current) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu on nav item click or window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    "Services",
    "Our works",
    "about us",
    "insights",
    "contact us",
  ];

  // Helper function to check if current path matches nav item
  const isActiveRoute = (item: string) => {
    const itemPath = `/${item.replace(" ", "-").toLowerCase()}`;
    return pathname === itemPath || (pathname === "/" && item === "home");
  };

  // Handle navigation click with prevention for same page
  const handleNavClick = (e: React.MouseEvent, item: string) => {
    if (isActiveRoute(item)) {
      e.preventDefault();
      return false;
    }
  };

  return (
    <div
      className={`fixed z-[999] w-full px-5 lg:px-14 py-6 flex items-center justify-between transition-all duration-300 ${
        isScrolled ? "bg-zinc-900/50 backdrop-blur-md" : ""
      } ${isNavbarVisible ? "top-0" : "-top-full"}`}
    >
      <Link href={"/"} className="logo">
        <svg
          width="70"
          height="30"
          viewBox="0 0 75 30"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke={isOurWorksPage ? "black" : "white"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* N */}
          <motion.path
            d="M5 25V5 L15 25V5"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
          {/* E */}
          <motion.path
            d="M28 5H20V25H28 M20 15H25"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
          {/* X */}
          <motion.path
            d="M33 5L43 25 M43 5L33 25"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
          {/* A */}
          <motion.path
            d="M48 25L53 5L58 25 M50.5 18H55.5"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>
      </Link>

      {/* Hamburger menu for small screens */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 relative z-[1001]"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span
          className={`block h-0.5 w-6 ${
            isOurWorksPage ? "bg-black" : "bg-white"
          } transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 ${
            isOurWorksPage ? "bg-black" : "bg-white"
          } my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
        ></span>
        <span
          className={`block h-0.5 w-6 ${
            isOurWorksPage ? "bg-black" : "bg-white"
          } transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      {/* Nav links for large screens */}
      <div
        className={`links gap-10 items-center hidden sm:flex ${
          isOurWorksPage ? "text-black" : "text-white"
        }`}
      >
        {navItems.map((item, index) => {
          const isActive = isActiveRoute(item);

          return (
            <motion.a
              key={index}
              href={`/${item.replace(" ", "-").toLowerCase()}`}
              className={`relative text-[1.1vw] font-neue font-normal capitalize ${
                index === navItems.length - 1 && "ml-32"
              } ${isActive ? "cursor-default" : "cursor-pointer"}`}
              whileHover={isActive ? "rest" : "hover"}
              initial="rest"
              onClick={(e) => handleNavClick(e, item)}
            >
              <div className="overflow-hidden relative">
                <motion.span
                  className="inline-block"
                  variants={{ rest: { y: 0 }, hover: { y: "-100%" } }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                >
                  {item}
                </motion.span>
                <motion.span
                  className="absolute left-0 top-0"
                  variants={{ rest: { y: "100%" }, hover: { y: 0 } }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                >
                  {item}
                </motion.span>
              </div>
              <motion.div
                className={`absolute bottom-[-5px] left-0 h-[0.5px] ${
                  isOurWorksPage ? "bg-black" : "bg-white"
                } w-full`}
                style={{ originX: 0 }}
                variants={{
                  rest: { scaleX: isActive ? 1 : 0 },
                  hover: { scaleX: 1 },
                }}
                transition={{ ease: "easeInOut", duration: 0.4 }}
              />
            </motion.a>
          );
        })}
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100vw" }}
            animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : "-100vw" }}
            exit={{ opacity: 0, y: "100vw", transition: { delay: 0.4 } }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className={`fixed inset-0 ${
              isOurWorksPage ? "bg-white/90" : "bg-zinc-900/90"
            } backdrop-blur-md z-[1000] flex flex-col items-center justify-center transition-all duration-300 sm:hidden ${
              menuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <nav
              className={`flex flex-col gap-8 text-2xl font-neue ${
                isOurWorksPage ? "text-black" : "text-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item, index) => {
                const isActive = isActiveRoute(item);

                return (
                  <a
                    key={index}
                    href={`/${item.replace(" ", "-").toLowerCase()}`}
                    className={`text-7xl font-grotesk uppercase leading-[11vw] relative ${
                      isActive
                        ? isOurWorksPage
                          ? "text-black cursor-default"
                          : "text-white cursor-default"
                        : isOurWorksPage
                        ? "text-gray-600 cursor-pointer"
                        : "text-gray-300 cursor-pointer"
                    }`}
                    onClick={(e) => {
                      if (isActive) {
                        e.preventDefault();
                        return;
                      }
                      setMenuOpen(false);
                    }}
                  >
                    {item}
                    {isActive && (
                      <div
                        className={`absolute bottom-[-5px] left-0 h-[0.5px] ${
                          isOurWorksPage ? "bg-black" : "bg-white"
                        } w-full`}
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
