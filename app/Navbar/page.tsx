"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 z-10 bg-black p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-yellow-300 text-3xl font-bold">Logo</div>

        {/* Mobile Hamburger Icon */}
        <button onClick={toggleMenu} className="lg:hidden text-white">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Menu Items */}
      <ul
        className={`text-white justify-center flex-col lg:flex lg:flex-row lg:gap-8 ${
          isMenuOpen ? "flex" : "hidden lg:flex"
        }`}
      >
        <li>
          <Link href="#" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-yellow-400 transition-colors">
            Books
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-yellow-400 transition-colors">
            Courses
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-yellow-400 transition-colors">
            Orders
          </Link>
        </li>
        <li>
          <Link href="#" className="hover:text-yellow-400 transition-colors">
            About us
          </Link>
        </li>
      </ul>
    </nav>
  );
}