'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between cursor-pointer">
        <Link href="https://piccolomedia.dk/">
          <Image
            src="/images/PMG-logo.svg"
            alt="PMG logo, as svg"
            width={100}
            height={100}
            quality={100}
            priority
          />
        </Link>
        <ul className="flex space-x-6 text-sm font-medium text-gray-700">
          <li><Link href="https://piccolomedia.dk/#ompmg" className="hover:text-redColor">OM PMG</Link></li>
          <li className="relative group">
            <Link href="https://piccolomedia.dk/annoncoer/" className="hover:text-redColor">ANNONCØR</Link>
            <ul className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <li><Link href="https://piccolomedia.dk/udogse/" className="block px-4 py-2 hover:bg-gray-100">UD&SE</Link></li>
              <li><Link href="https://piccolomedia.dk/samvirke/" className="block px-4 py-2 hover:bg-gray-100">SAMVIRKE</Link></li>
              <li><Link href="/" className="block px-4 py-2 hover:bg-gray-100">ANNONCE PREVIEWER</Link></li>
              <li><Link href="#inspiration" className="block px-4 py-2 hover:bg-gray-100">ANNONCE INSPIRATION</Link></li>
            </ul>
          </li>
          <li><Link href="/annoncor" className="hover:text-redColor">MEDIEHUSET</Link></li>
          <li className="relative group">
            <Link href="https://piccolomedia.dk/piccolo-prisen/" className="hover:text-redColor">PICCOLO PRISEN</Link>
            <ul className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <li><Link href="https://piccolomedia.dk/piccolo-prisen-finalister/" className="block px-4 py-2 hover:bg-gray-100">FINALISTER</Link></li>
            </ul>
          </li>
          <li><Link href="https://piccolomedia.dk/#_redaktionelt" className="hover:text-redColor">REDAKTIONELT</Link></li>
          <li><Link href="https://piccolomedia.dk/#distribution" className="hover:text-redColor">DISTRIBUTION</Link></li>
          <li><Link href="https://piccolomedia.dk/#team" className="hover:text-redColor">KONTAKT</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
