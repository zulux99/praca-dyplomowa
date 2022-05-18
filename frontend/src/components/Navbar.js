function Navbar() {
  function openSideNav() {
    console.log("otwieram nav");
    
  }
  function closeSideNav() {
    console.log("zamykam nav");
  }
  return (
    <div>
      <nav className="nav">
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
        <div className="nav_toggler" onClick={() => openSideNav()}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>
      <div className="side_nav">
        <a className="closeSideNavButton" onClick={() => closeSideNav()}>
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
