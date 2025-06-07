"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between cursor-pointer">
        <Link href="/">
          <Image
            src="/images/PMG-logo.svg"
            alt="PMG logo, as svg"
            width={100}
            height={100}
            quality={100}
            priority
          />
        </Link>
        <ul className="flex space-x-6 text-sm font-medium text-black">
          {/* lokale links */}
          <li>
            <Link
              href="/Tool"
              className="hover:text-red-500 flex items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-red-500 before:mr-2"
            >
              VÆRKTØJ
            </Link>
          </li>
          <li>
            <Link
              href="/Inspiration"
              className="hover:text-red-500 flex items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-red-500 before:mr-2"
            >
              INSPIRATION
            </Link>
          </li>
          <li>
            <Link
              href="Contact"
              className="hover:text-red-500 flex items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-red-500 before:mr-2"
            >
              KONTAKT
            </Link>
          </li>
          {/* pmg-website links (eksternt til wordpress site) */}
          <li>
            <Link
              href="https://piccolomedia.dk/piccolo-prisen-finalister/"
              className="hover:text-red-500 flex items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-red-500 before:mr-2"
            >
              PICCOLO-PRISEN
            </Link>
          </li>
          <li>
            <Link
              href="https://piccolomedia.dk/#ompmg"
              className="hover:text-red-500 flex items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-red-500 before:mr-2"
            >
              OM PMG
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
