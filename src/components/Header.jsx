import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <a href="/">MyWebsite</a>
        </div>

        <div>
          <a
            href="/login"
            className="bg-white text-blue-500 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Lo gout
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
