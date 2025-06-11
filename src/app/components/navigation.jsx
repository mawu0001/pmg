"use client";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between ">
        <Link href="/">
          <Image
            src="/images/PMG-logo.svg"
            alt="PMG logo, as svg"
            width={100}
            height={100}
            quality={100}
            priority
            className="cursor-pointer"
          />
        </Link>
        <ul className="flex space-x-6 text-xs  text-black relative cursor-pointer">
          {/* LOKALE LINKS */}
          <li>
            <Link
              href="/Tool"
              className="hover:text-red-500  flex items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-red-500 before:mr-2"
            >
              PREVIEWER
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
              href="/Contact"
              className="hover:text-red-500 flex items-center before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-red-500 before:mr-2"
            >
              KONTAKT
            </Link>
          </li>

          {/* EKSTERNE LINKS - Dropdown menu */}
          <li className="relative group cursor-pointer">
            <div className="flex items-center hover:text-red-500 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-red-500 before:mr-2">
              <h6>EKSTERNE LINKS</h6>
            </div>

            <ul className="absolute right-0 mt-2 w-32 bg-white z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <li>
                <a
                  href="https://piccolomedia.dk/piccolo-prisen-finalister/"
                  className="block px-3 py-2 hover:text-red-500 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-red-500 before:mr-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Piccolo-prisen
                </a>
              </li>
              <li>
                <a
                  href="https://piccolomedia.dk/#ompmg"
                  className="block px-3 py-2 hover:text-red-500 before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-red-500 before:mr-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Om PMG
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
