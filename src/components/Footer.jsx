import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-slate-600 py-8 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Crypto Portfolio Averager. All rights reserved.</p>
        <p className="text-sm mt-1">
          Disclaimer: This tool is for informational purposes only.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
