import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { loopalpha } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"}`}
      >
        <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
          {/* Logo and text aligned to the left */}
          <div className="flex items-center">
            <a href='#hero' className="flex items-center">
              <img src={loopalpha} width={60} height={50} alt="LoopAlpha" />
              <p className="ml-2 text-xl font-semibold">LoopAlpha</p>
            </a>
          </div>

          {/* Navigation items aligned to the right */}
          <nav className={`${openNavigation ? "flex" : "hidden"} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:bg-transparent`}>
            <div className="relative z-2 flex flex-col items-center lg:flex-row">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={handleClick}
                  className={`block font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""} px-6 py-6 lg:text-xs lg:font-semibold ${item.url === pathname.hash ? "lg:text-n-1" : "lg:text-n-1/50"} lg:leading-5 xl:px-12`}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Hamburger menu button */}
          <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
