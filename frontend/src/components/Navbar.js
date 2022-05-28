import { useState } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [onMobile, setOnMobile] = useState(false);
  const navBarPagesArray = [
    { link: "/", name: "Strona główna" },
    { link: "/bills", name: "Rachunki" },
    { link: "/register", name: "Zarejestruj się" },
    { link: "/login", name: "Zaloguj się" },
  ];
  return (
    <>
      <div className="main">
        <div
          className="closing_side_bar"
          style={isNavExpanded ? { display: "block" } : { display: "none" }}
          onClick={() => setIsNavExpanded(false)}></div>
        <nav className="nav">
          <a href="#" className="brand">
            Budżet domowy
          </a>
          <ul className="nav_menu">
            {navBarPagesArray.map((item, index) => {
              return (
                <div className="nav_link" key={index}>
                  <li key={index}>
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                </div>
              );
            })}
          </ul>
          <div
            className="nav_toggler"
            onClick={() => {
              isNavExpanded ? setIsNavExpanded(false) : setIsNavExpanded(true);
            }}>
            {[...Array(3)].map((x, index) => (
              <div className={isNavExpanded ? "line line2" : "line"} key={index}></div>
            ))}
          </div>
        </nav>
        <div className="side_nav" style={isNavExpanded ? { width: "60%" } : { right: "-70%" }}>
          <div className="side_nav_list">
            <ul>
              {navBarPagesArray.map((item, index) => {
                return (
                  <div className="side_nav_link" onClick={() => setIsNavExpanded(false)} key={index}>
                    <li key={index}>
                      <Link to={item.link}>{item.name}</Link>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
