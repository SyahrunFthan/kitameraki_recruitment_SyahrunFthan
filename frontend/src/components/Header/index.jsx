import React from "react";

const Header = ({ text }) => {
  return (
    <div>
      <h2 className="text-black font-bold text-2xl">{text}</h2>
    </div>
  );
};

export default Header;
