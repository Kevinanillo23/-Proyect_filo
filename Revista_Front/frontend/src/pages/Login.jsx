import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";
import PageTransition from "../components/PageTransition";

/**
 * Componente Login - Maneja autenticación y reseteo de contraseña.
 * @component
 * @returns {JSX.Element} Formulario de login y modal de reseteo de contraseña
 */
function Login() {
  /** @type {[{ username: string, password: string }, Function]} */
  const [form, setForm] = useState({ username: "", password: "" });

  /** @type {[string, Function]} */
  const [message, setMessage] = useState("");

  /** @type {[boolean, Function]} */
  const [showModal, setShowModal] = useState(false);

  /** @type {[string, Function]} */
  const [resetEmail, setResetEmail] = useState("");

  /** @type {[string, Function]} */
  const [_resetMessage, setResetMessage] = useState("");

  /** @type {[string, Function]} */
  const [_resetError, setResetError] = useState("");

  // Note: I need to check if resetError is used. If not, rename.
  // Based on previous file view:
  // line 30: const [resetError, setResetError] = useState("");
  // line 91: setResetError("Introduce un correo válido.");
  // line 109: setResetError("");
  // It is NOT used in JSX or logic, only set. So rename to _resetError.


  const navigate = useNavigate();

  /**
   * Maneja el cambio en los inputs.
   * @param {React.ChangeEvent<HTMLInputElement>} e Evento de cambio
   */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /** @constant {RegExp} */
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{5,}$/;

  /**
   * Maneja el submit del login
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e Evento submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(form.password)) {
      setMessage(
        "La contraseña debe tener al menos 5 caracteres, una mayúscula y un número."
      );
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        toast.success("¡Login exitoso! Bienvenido.");
        navigate("/");
      } else {
        toast.error(data.error || "Error al iniciar sesión");
      }
    } catch (_err) {
      setMessage("Error al conectar con el backend");
    }
  };

  /**
   * Maneja el submit para restablecer contraseña
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e Evento submit
   */
  const handleResetSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setResetError("Introduce un correo válido.");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/users/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: resetEmail }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Enlace enviado al correo");
        setResetError("");
      } else {
        toast.error(data.error || "Error al enviar el correo");
        setResetMessage("");
      }

      setShowModal(false);
      setResetEmail("");
    } catch (_err) {
      toast.error("Error al conectar con el servidor");
      setResetMessage("");
      setShowModal(false);
    }
  };

  return (
    <PageTransition>
      <div className="auth-page">
        <div className="auth-card">
          <h2>Ingresar</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <label>Usuario</label>
              <input
                name="username"
                placeholder="Nombre de usuario"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Contraseña</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              Acceder
            </button>
          </form>

          {message && <p className="error-message" style={{ marginTop: '15px' }}>{message}</p>}

          <div className="auth-footer">
            <p>
              <button
                type="button"
                className="forgot-link"
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}
                onClick={() => setShowModal(true)}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </p>
            <p style={{ marginTop: '10px' }}>
              ¿Sin cuenta? <a href="/register">Suscríbete ahora</a>
            </p>
          </div>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Restablecer</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Introduce tu email para recibir el enlace.</p>
                <form onSubmit={handleResetSubmit} className="auth-form">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>Enviar enlace</button>
                </form>
                <button
                  className="close-btn"
                  style={{ marginTop: '15px', padding: '8px', width: '100%', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Login;
