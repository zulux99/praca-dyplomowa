import { useState } from "react";
function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navItems = new Map();
  function openSideNav() {
    console.log("otwieram nav");
  }
  function closeSideNav() {
    console.log("zamykam nav");
  }
  return (
    <div>
      <nav
        className="nav"
        style={isNavExpanded
          ? { filter: "blur(0.1rem)" }
          : { filter: "blur(0)" }}
      >
        <a href="#" className="brand">
          Budżet domowy
        </a>
        <ul className="nav_menu">
          <li className="nav_item">
            <a href="#" className="nav_link">
              Strona główna
            </a>
          </li>
          <li className="nav_item">
            <a href="#" className="nav_link">
              Twoje wydatki
            </a>
          </li>
          <li className="nav_item">
            <a href="#" className="nav_link">
              Twoje przychody
            </a>
          </li>
          <li>
            <a href="#" className="nav_link">
              Twoje rachunki
            </a>
          </li>
        </ul>
        <div
          className="nav_toggler"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>
      <div
        className="side_nav"
        style={isNavExpanded ? { width: "60%" } : { width: "0" }}
      >
        <a
          className="closeSideNavButton"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          <h1>&times;</h1>
        </a>
        <ul className="side_nav_list">
          <li className="side_nav_item">
            <a href="#" className="side_nav_link">
              Strona główna
            </a>
          </li>
          <li className="side_nav_item">
            <a href="#" className="side_nav_link">
              Twoje wydatki
            </a>
          </li>
          <li className="side_nav_item">
            <a href="#" className="side_nav_link">
              Twoje przychody
            </a>
          </li>
          <li>
            <a href="#" className="side_nav_link">
              Twoje rachunki
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
