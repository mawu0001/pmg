import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Piccolo Media Group</p>
        <ul className="flex space-x-4 mt-4 md:mt-0 text-sm">
          <li><a href="/om-pmg" className="hover:text-red_color">Om PMG</a></li>
          <li><a href="/kontakt" className="hover:text-red_color">Kontakt</a></li>
          <li><a href="/redaktionelt" className="hover:text-red_color">Redaktionelt</a></li>
          <li><a href="/distribution" className="hover:text-red_color">Distribution</a></li>
           <li><a href="/home" className="hover:text-red_color">Previewer</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
