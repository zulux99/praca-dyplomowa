import { useState } from "react";
function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [onMobile, setOnMobile] = useState(false);
  const navBarPages = ["Strona główna", "Twoje wydatki", "Twoje przychody", "Twoje rachunki"];
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
            {navBarPages.map((item) => {
              return (
                <div className="nav_link">
                  <li>
                    <a href="#">{item}</a>
                  </li>
                </div>
              );
            })}
          </ul>
          <div
            className="nav_toggler"
            onClick={() => { isNavExpanded ? setIsNavExpanded(false)  : setIsNavExpanded(true)
            }}>
            {[...Array(3)].map((x) => (
              <div className={isNavExpanded ? "line line2" : "line"}></div>
            ))}
          </div>
        </nav>
        <SideNav isNavExpanded={isNavExpanded} setIsNavExpanded={setIsNavExpanded} navBarPages={navBarPages} />
      </div>
    </>
  );
}

export default Navbar;

function SideNav({ isNavExpanded, setIsNavExpanded, navBarPages }) {
  return (
    <div className="side_nav" style={isNavExpanded ? { width: "60%" } : { right: "-70%" }}>
      <div className="side_nav_list">
        <ul>
          {navBarPages.map((item) => {
            return (
              <div className="side_nav_link" onClick={() => setIsNavExpanded(false)}>
                <li>
                  <a href="#">{item}</a>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
