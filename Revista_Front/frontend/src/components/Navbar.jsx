import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const loadUser = () => {
    const storedUser = sessionStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    loadUser();
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => loadUser();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo" onClick={closeMenu}>
            FILCO
          </Link>

          <div className="search-container">
            <button
              className={`search-toggle-mobile ${isSearchOpen ? "active" : ""}`}
              onClick={() => {
                setIsMenuOpen(false);
                setIsSearchOpen(!isSearchOpen);
              }}
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>

            <form className={`search-form ${isSearchOpen ? "active" : ""}`} onSubmit={(e) => {
              e.preventDefault();
              const query = e.target.search.value;
              if (query.trim()) {
                navigate(`/?search=${query}`);
                setIsSearchOpen(false);
              }
            }}>
              <input
                type="text"
                name="search"
                placeholder="Buscar artículos..."
                className="search-input"
                autoComplete="off"
              />
              <button type="submit" className="search-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </form>
          </div>

          <div
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li><Link to="/" onClick={closeMenu}>INICIO</Link></li>
            <li><Link to="/podcast" onClick={closeMenu}>PODCAST</Link></li>
            <li><Link to="/portal" onClick={closeMenu}>PORTAL</Link></li>
            <li><Link to="/filosofia" onClick={closeMenu}>LIBROS</Link></li>
            <li><Link to="/revista" onClick={closeMenu}>REVISTA</Link></li>

            {user?.role === "admin" && (
              <>
                <li><Link to="/article" onClick={closeMenu}>GESTIÓN ARTÍCULOS</Link></li>
                <li><Link to="/users" onClick={closeMenu}>GESTIÓN USUARIOS</Link></li>
              </>
            )}

            {!user ? (
              <>
                <li><Link to="/login" onClick={closeMenu}>LOGIN</Link></li>
                <li><Link to="/register" onClick={closeMenu}>SUSCRIBIRSE</Link></li>
              </>
            ) : (
              <li>
                <button className="btn-logout" onClick={handleLogout}>
                  LOGOUT
                </button>
              </li>
            )}
          </ul>

          {user && <div className="navbar-user">Hola, {user.username}</div>}
        </div>
      </nav>

      <div
        className={`overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      />
    </>
  );
}

export default Navbar;
