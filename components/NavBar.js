import { useState } from "react";
import { FcMenu, FcHome } from "react-icons/fc";
import { GiPayMoney } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";

import Link from "next/link";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <nav className="flex flex-grow items-center justify-between py-4 px-2 bg-white ">
        <div className="text-3xl text-blue-400 font-bold tracking-wider whitespace-nowrap mr-3">
          <Link href="/">Miles Estates</Link>
        </div>

        <menu className="items-center space-x-5 hidden md:inline-flex whitespace-nowrap">
          <Link href="/" passHref>
            <li className="flex items-center space-x-1 border px-2 py-1 bg-indigo-50 rounded-lg cursor-pointer ">
              <FcHome className="text-xl" />
              <span className="text-lg font-semibold tracking-wide">Home</span>
            </li>
          </Link>
          <Link href="/search" passHref>
            <li className="flex items-center space-x-1 border px-2 py-1 bg-indigo-50 rounded-lg cursor-pointer">
              <BsSearch className="text-xl text-blue-400" />
              <span className="text-lg font-semibold tracking-wide">
                Search
              </span>
            </li>
          </Link>
          <Link href="/search?purpose=for-sale" passHref>
            <li className="flex items-center space-x-1 border px-2 py-1 bg-indigo-50 rounded-lg cursor-pointer">
              <GiPayMoney className="text-xl text-blue-400" />
              <span className="text-lg font-semibold tracking-wide">
                Buy Property
              </span>
            </li>
          </Link>
          <Link href="/search?purpose=for-rent" passHref>
            <li className="flex items-center space-x-1 border px-2 py-1 bg-indigo-50 rounded-lg cursor-pointer mr-2">
              <FiKey className="text-xl text-blue-400" />
              <span className="text-lg font-semibold tracking-wide">
                Rent Property
              </span>
            </li>
          </Link>
        </menu>
        <div className=" px-2 py-1 cursor-pointer md:hidden">
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            {!isOpen && <FcMenu className="text-2xl" />}
          </button>
        </div>
        {isOpen && (
          <div className=" bg-[#FAF9F6] opacity-95  md:hidden rounded-sm absolute w-4/5 overflow-y-auto shadow-md animate-slide-in -ml-2 top-0 h-screen">
            <menu className=" space-y-3">
              <Link href="/" passHref>
                <li
                  className="flex items-center space-x-1 px-2 py-1  cursor-pointer "
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <FcHome className="text-xl" />
                  <span className="text-lg font-semibold tracking-wide">
                    Home
                  </span>
                </li>
              </Link>
              <Link href="/search" passHref>
                <li
                  className="flex items-center space-x-1 px-2 py-1  cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <BsSearch className="text-xl" />
                  <span className="text-lg font-semibold tracking-wide">
                    Search
                  </span>
                </li>
              </Link>
              <Link href="/search?purpose=for-sale" passHref>
                <li
                  className="flex items-center space-x-1 px-2 py-1  cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <GiPayMoney className="text-xl" />
                  <span className="text-lg font-semibold tracking-wide">
                    Buy Property
                  </span>
                </li>
              </Link>
              <Link href="/search?purpose=for-rent" passHref>
                <li
                  className="flex items-center space-x-1 px-2 py-1  cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <FiKey className="text-xl" />
                  <span className="text-lg font-semibold tracking-wide">
                    Rent Property
                  </span>
                </li>
              </Link>
            </menu>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="absolute top-0 right-0 px-2 py-1"
            >
              {isOpen && <RiCloseFill className="w-8 h-8 text-gray-600" />}
            </button>
          </div>
        )}
      </nav>

      <div className="border-b-2 px-2 border-gray-100" />
    </div>
  );
}

export default NavBar;
