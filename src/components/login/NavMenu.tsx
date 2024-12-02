import { useEffect, useState } from "react";
import Link from "next/link";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest("#dropdown")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <div className=" h-[42px] flex items-center justify-end space-x-[49px]">
      <div id="dropdown" className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full 
         text-sm font-medium text-gray-700 hover:bg-gray-50"
          type="button"
        >
          Language
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                English
              </button>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                العربية
              </button>
            </div>
          </div>
        )}
      </div>
      <Link href="/login" className="text-[#4461F2]">
        Sign in
      </Link>
      <Link
        href="/register"
        className="text-[#4461F2] px-[19px] py-[8px] border-[1px] text-sm font-normal leading-6 rounded-[15px]"
      >
        Register
      </Link>
    </div>
  );
};

export default NavMenu;
