import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useSession, signOut } from "next-auth/react"; // Import signOut
import Cookies from "js-cookie";
import { DNA } from 'react-loader-spinner';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Refs for the mobile menu and profile dropdown
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  const lastName = Cookies.get("lastName");
  const firstName = Cookies.get("firstName")

  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileOpen(!profileOpen);
  };

  // Handle click outside the menu and dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the mobile menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Close mobile menu when clicked outside
      }
      // Check if the click is outside the profile dropdown
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false); // Close profile dropdown when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (status === "loading") {
    return <div className="flex justify-center items-center">
      <DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  />
  </div>;
  }

  return (
    <div>
      <nav className="w-10/12 mx-auto py-4 top-0 z-10 text-white">
        <div className="mx-auto">
          <div className="flex mx-auto justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#4BA586]">
                <Image src="/bhp.png" width={25} height={25} alt="logo" />
              </div>
              <h1 className="text-[22px] font-bold">BetaHouse</h1>
            </div>

            {/* Links - Hidden on mobile */}
            <div className="hidden lg:flex space-x-8 text-white">
              <a href="#" className="hover:border-b-[1px] hover:border-white py-1 transition-all ease-in-out duration-400">
                Home
              </a>
              <a href="#" className="hover:border-b-[1px] hover:border-white py-1 transition-all ease-in-out duration-400">
                Properties
              </a>
              <a href="#" className="hover:border-b-[1px] hover:border-white py-1 transition-all ease-in-out duration-400">
                About Us
              </a>
              <a href="#" className="hover:border-b-[1px] hover:border-white py-1 transition-all ease-in-out duration-400">
                Blog
              </a>
              <a href="#" className="hover:border-b-[1px] hover:border-white py-1 transition-all ease-in-out duration-400">
                Contact Us
              </a>

              {/* Conditionally render the login link based on session status */}
              {!session && (
                <a href="/login" className="hover:border-b-[1px] hover:border-white py-1 transition-all ease-in-out duration-400">
                  Log In/Sign Up
                </a>
              )}
            </div>

            {/* Profile Dropdown */}
            {session && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-white"
                >
                  <div className="flex items-center md:gap-2 text-xs text-white">
                    <FaUserCircle className="h-6 w-6 hidden md:block" />
                    {session.user.name}
{/*                     
                     <h1>{firstName}</h1>
                    <p>{lastName}</p> */}
                    <IoIosArrowDown className="hidden md:block" />
                  </div>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-500 rounded-md shadow-lg py-2 z-10">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-white hover:text-gray-500 hover:bg-gray-100"
                    >
                      My Account
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-white hover:text-gray-500 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <button
                      onClick={() => signOut()} // Add signOut handler here
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:text-gray-500 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger Menu - Mobile only */}
            <div className="lg:hidden" ref={menuRef}>
              <button
                onClick={toggleMenu}
                className="text-white"
              >
                {isOpen ? <IoClose className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200" ref={menuRef}>
            <div className="px-2 py-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
              >
                Home
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
              >
                Properties
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
              >
                Blog
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
              >
                Contact Us
              </a>
              {!session && (
                <a
                  href="/login"
                  className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                >
                  Log In/Sign Up
                </a>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
