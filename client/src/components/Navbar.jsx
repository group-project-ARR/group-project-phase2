import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    const navToggle = document.getElementsByClassName("toggle");
    for (let i = 0; i < navToggle.length; i++) {
      navToggle.item(i).classList.toggle("hidden");
    }
  };

  return (
    <nav className={`flex flex-wrap items-center justify-between p-3 bg-white-200 shadow-md ${isScrolled ? "fixed top-0 w-full bg-white z-50" : ""}`}>
      <img src="./logo.png" className="mx-2" alt="ACME" width="150" />
      <div className="flex md:hidden">
        <button id="hamburger" onClick={toggleMenu}>
          <img className="toggle block" src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="40" height="40" />
          <img className="toggle hidden" src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="40" height="40" />
        </button>
      </div>
      <div className={`toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-teal-900 md:border-none`}>
        <a href="#" className="block md:inline-block text-teal-900 hover:text-teal-500 px-3 py-3 border-b-2 border-teal-900 md:border-none">
          Home
        </a>
        <a href="#" className="block md:inline-block text-teal-900 hover:text-teal-500 px-3 py-3 border-b-2 border-teal-900 md:border-none">
          Products
        </a>
        <a href="#" className="block md:inline-block text-teal-900 hover:text-teal-500 px-3 py-3 border-b-2 border-teal-900 md:border-none">
          Selling
        </a>
      </div>
      <a href="#" className={`toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right border border-teal-900 text-teal-900 hover:text-white hover:bg-teal-900 md:rounded`}>
        Log out
      </a>
    </nav>
  );
};

export default Navbar;
