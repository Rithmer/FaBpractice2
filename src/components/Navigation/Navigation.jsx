import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Navigation.css";

function Navigation({ isLoggedIn, username, onLogout }) {
  const location = useLocation();
  const navMenuRef = useRef(null);
  const indicatorRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const updateIndicator = () => {
      if (!navMenuRef.current || !indicatorRef.current) return;

      const activeLink = navMenuRef.current.querySelector("a.active");
      if (!activeLink) {
        setIndicatorStyle({ opacity: 0 });
        return;
      }

      const menuRect = navMenuRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      setIndicatorStyle({
        left: `${linkRect.left - menuRect.left}px`,
        top: `${linkRect.top - menuRect.top}px`,
        width: `${linkRect.width}px`,
        opacity: 1,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    const timeoutId = setTimeout(updateIndicator, 100);

    return () => {
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/" onClick={closeMobileMenu}>
          <h2>🚀 Трекер технологий</h2>
        </Link>
      </div>
      <button
        className="hamburger"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span className={isMobileMenuOpen ? "open" : ""}></span>
        <span className={isMobileMenuOpen ? "open" : ""}></span>
        <span className={isMobileMenuOpen ? "open" : ""}></span>
      </button>
      <ul
        className={`nav-menu ${isMobileMenuOpen ? "mobile-open" : ""}`}
        ref={navMenuRef}
      >
        <div
          className="nav-indicator"
          ref={indicatorRef}
          style={indicatorStyle}
        />
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
            onClick={closeMobileMenu}
          >
            Главная
          </Link>
        </li>
        <li>
          <Link
            to="/technologies"
            className={location.pathname === "/technologies" ? "active" : ""}
            onClick={closeMobileMenu}
          >
            Все технологии
          </Link>
        </li>
        <li>
          <Link
            to="/add-technology"
            className={location.pathname === "/add-technology" ? "active" : ""}
            onClick={closeMobileMenu}
          >
            Добавить технологию
          </Link>
        </li>
        <li>
          <Link
            to="/search"
            className={location.pathname === "/search" ? "active" : ""}
            onClick={closeMobileMenu}
          >
            Поиск технологий
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={closeMobileMenu}
          >
            Панель управления
          </Link>
        </li>
        <li>
          <Link
            to="/import-export"
            className={location.pathname === "/import-export" ? "active" : ""}
            onClick={closeMobileMenu}
          >
            Импорт/Экспорт
          </Link>
        </li>
        <li>
          <Link
            to="/product-search"
            className={location.pathname === "/product-search" ? "active" : ""}
            onClick={closeMobileMenu}
          >
            Поиск продуктов
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <>
              <span style={{ marginRight: "8px" }}>Привет, {username}!</span>
              <button
                onClick={() => {
                  onLogout();
                  closeMobileMenu();
                }}
                className="logout-btn"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={location.pathname === "/login" ? "active" : ""}
              onClick={closeMobileMenu}
            >
              Войти
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
