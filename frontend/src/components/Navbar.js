function Navbar(props) {
  return (
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
      <div className="nav_toggler">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
