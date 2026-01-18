import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

/**
 * Responsive Navbar con control de sesión.
 * - Muestra enlaces dependiendo del rol del usuario (admin/user).
 * - Incluye menú hamburguesa para móviles.
 * - Permite login, logout y navegación entre secciones.
 *
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 */
function Navbar() {
  /** Estado para abrir/cerrar el menú responsive */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /** Estado con la información del usuario logueado */
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Carga el usuario desde `sessionStorage`.
   * Se ejecuta al montar el componente o cuando cambia la ruta.
   * @function
   */
  const loadUser = () => {
    const storedUser = sessionStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  /** Ejecuta loadUser al cambiar de ruta */
  useEffect(() => {
    loadUser();
  }, [location]);

  /**
   * Listener para cambios en `sessionStorage` (multi-tab).
   * Se asegura de que la Navbar reaccione si el usuario cierra sesión en otra pestaña.
   */
  useEffect(() => {
    const handleStorageChange = () => loadUser();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  /**
   * Alterna la visibilidad del menú hamburguesa.
   * También controla el scroll del body.
   * @function
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  /**
   * Cierra el menú hamburguesa y reestablece el scroll.
   * @function
   */
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  /**
   * Maneja el logout del usuario.
   * Limpia `localStorage`, `sessionStorage`, resetea el estado y redirige al inicio.
   * @function
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
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

          <div
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={closeMenu}>INICIO</Link>
            </li>
            <li>
              <Link to="/podcast" onClick={closeMenu}>PODCAST</Link>
            </li>
            <li>
              <Link to="/portal" onClick={closeMenu}>PORTAL</Link>
            </li>
            <li>
              <Link to="/filosofia" onClick={closeMenu}>LIBROS DE FILOSOFÍA</Link>
            </li>
            <li>
              <Link to="/revista" onClick={closeMenu}>REVISTA</Link>
            </li>

            {user?.role === "admin" && (
              <>
                <li>
                  <Link to="/article" onClick={closeMenu}>GESTIÓN ARTÍCULOS</Link>
                </li>
                <li>
                  <Link to="/users" onClick={closeMenu}>GESTIÓN USUARIOS</Link>
                </li>
              </>
            )}

            {!user && (
              <>
                <li>
                  <Link to="/login" onClick={closeMenu}>LOGIN</Link>
                </li>
                <li>
                  <Link to="/register" onClick={closeMenu}>SUSCRIBIRSE</Link>
                </li>
              </>
            )}

            {user && (
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
