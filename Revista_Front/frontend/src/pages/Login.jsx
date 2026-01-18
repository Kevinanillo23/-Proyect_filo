import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

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
  const [resetMessage, setResetMessage] = useState("");

  /** @type {[string, Function]} */
  const [resetError, setResetError] = useState("");

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
    } catch (err) {
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
    } catch (err) {
      toast.error("Error al conectar con el servidor");
      setResetMessage("");
      setShowModal(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}

      <p>
        <button
          type="button"
          className="forgot-link"
          onClick={() => setShowModal(true)}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </p>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Restablecer contraseña</h3>
            <form onSubmit={handleResetSubmit}>
              <input
                type="email"
                placeholder="Introduce tu correo"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <button type="submit">Enviar enlace</button>
            </form>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {resetMessage && <p className="success-message">{resetMessage}</p>}
      {resetError && <p className="error-message">{resetError}</p>}
    </div>
  );
}

export default Login;
