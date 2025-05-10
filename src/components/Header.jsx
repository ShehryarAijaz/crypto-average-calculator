import React from 'react';

const Header = () => {
  return (
    <header className="bg-slate-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Crypto Portfolio Averager
        </h1>
        <nav className="space-x-4">
          {/* Add navigation links here if needed in the future */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
