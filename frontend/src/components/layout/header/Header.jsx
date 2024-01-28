import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import "./Header.css"
const Header = () => {
 const user = localStorage.getItem("role");

  return (
    <div>
      <header className="header_h">
        <div className="profile" >
          <span className="profileIcon" >
            <FaRegUserCircle />
          </span>
          <span className="profileName">{user}</span>
        </div>
      </header>
    </div>
  );
};

export default Header;
