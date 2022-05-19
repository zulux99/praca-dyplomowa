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
        <nav className="nav" style={isNavExpanded ? { filter: "blur(0.1rem)" } : { filter: "blur(0)" }}>
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
            onClick={() => {
              setIsNavExpanded(true);
            }}>
            {[...Array(3)].map((x) => (
              <div className="line"></div>
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
    <div className="side_nav" style={isNavExpanded ? { width: "60%" } : { width: "0" }}>
      <div
        className="side_nav_close"
        onClick={() => {
          setIsNavExpanded(false);
        }}>
        <a>
          <h1>&times;</h1>
        </a>
      </div>
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
