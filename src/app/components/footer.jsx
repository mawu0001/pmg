import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-6">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Piccolo Media Group</p>
        <ul className="flex space-x-4 mt-4 md:mt-0 text-sm">
          <li><Link href="https://piccolomedia.dk/#ompmg" className="hover:text-red-500">Om PMG</Link></li>
          <li><Link href="https://piccolomedia.dk/#team" className="hover:text-red-500">Kontakt</Link></li>
          <li><Link href="https://piccolomedia.dk/#_redaktionelt" className="hover:text-red-500">Redaktionelt</Link></li>
          <li><Link href="https://piccolomedia.dk/#distribution" className="hover:text-red-500">Distribution</Link></li>
           <li><Link href="/home" className="hover:text-red-500">Previewer</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
