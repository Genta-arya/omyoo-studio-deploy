import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-700  p-6 text-center absolute w-screen overflow-hidden m-auto text-white">
      OmYoo Company &copy; {new Date().getFullYear()} 
    </footer>
  );
}

export default Footer;
