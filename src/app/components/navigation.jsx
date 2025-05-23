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
          {/* lokale links */}
        <li><Link href="#inspiration" className="hover:text-redColor">INSPIRATION</Link></li> 
          <li><Link href="#kontakt" className="hover:text-redColor">KONTAKT</Link></li>
          {/* pmg-website links (eksternt til wordpress site) */}
          <li><Link href="https://piccolomedia.dk/piccolo-prisen-finalister/" className="hover:text-redColor">PICCOLO-PRISEN</Link></li>
          <li><Link href="https://piccolomedia.dk/#ompmg" className="hover:text-redColor">OM PMG</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
