import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import "./Navbar.css";
import { IoMenu, IoHome } from "react-icons/io5";
import { LuTicket } from "react-icons/lu";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { TbHistory } from "react-icons/tb";

const Navbar = ({ getProp }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [role, setRole] = useState(null);
  const [openMenu, setOpenMenu] = useState(
    parseInt(localStorage.getItem("menu")) || 0
  );

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const navItems =
    role === "super_admin"
      ? ["home", "user", "ticket", "category"]
      : ["tickets", "history"];
  const navIcons = [
    <IoHome />,
    <FaRegUserCircle />,
    <LuTicket />,
    role === "user" ? <BiCategory /> : <TbHistory />,
  ];

  return (
    <nav className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-inner">
        <header className="sidebar-header">
          <button
            type="button"
            className="sidebar-burger"
            onClick={() => {
              setIsOpen(!isOpen);
              getProp(!isOpen);
            }}
          >
            {!isOpen ? <CiMenuKebab /> : <IoMenu />}
          </button>
          <h2 className="site-logo">Ticket System</h2>
          {/* <img src={logo} className="sidebar-logo" /> */}
        </header>

        <nav className="sidebar-menu">
          {navItems.map((item, index) => (
            <button
              onClick={() => {
                navigate(`/${item}`);
                setOpenMenu(index);
                localStorage.setItem("menu", index);
              }}
              key={item}
              type="button"
              className={`sidebar-button ${
                openMenu === index && isOpen ? "open" : ""
              }`}
            >
              <span
                className={`sidebar-icon ${
                  openMenu === index && !isOpen
                    ? "active"
                    : openMenu === index && isOpen
                    ? "open"
                    : ""
                }`}
              >
                {navIcons[index]}
              </span>
              <p>{item}</p>
            </button>
          ))}
        </nav>

        <nav className="logout-menu">
          <button
            onClick={() => {
              navigate(`/`);
              localStorage.clear();
            }}
            type="button"
            className={`logout-button ${isOpen ? "open" : ""}`}
          >
            <AiOutlineLogout />
            <p>Logout</p>
          </button>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
