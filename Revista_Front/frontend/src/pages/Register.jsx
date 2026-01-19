import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../configuration";
import PageTransition from "../components/PageTransition";

/**
 * Componente Register - Maneja el registro de usuarios
 * @component
 * @returns {JSX.Element} Formulario de registro
 */
function Register() {
  /** @type {[{ firstname: string, lastname: string, email: string, username: string, password: string }, Function]} */
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  /** @type {[string, Function]} */
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  /**
   * Maneja cambios en inputs
   * @param {React.ChangeEvent<HTMLInputElement>} e Evento de cambio
   */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /**
   * Valida un email
   * @param {string} email Email a validar
   * @returns {boolean} True si es válido
   */
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /**
   * Valida la contraseña (min 5 caracteres, 1 mayúscula, 1 número)
   * @param {string} password Contraseña a validar
   * @returns {boolean} True si es válida
   */
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d).{5,}$/.test(password);

  /**
   * Maneja submit del formulario de registro
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e Evento submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      return setMessage("Introduce un email válido.");
    }

    if (!validatePassword(form.password)) {
      return setMessage(
        "La contraseña debe tener mínimo 5 caracteres, una mayúscula y un número."
      );
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("¡Registro exitoso! Iniciando sesión...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.error || "Error en el registro");
      }
    } catch (_err) {
      setMessage("Error al conectar con el backend");
    }
  };

  return (
    <PageTransition>
      <div className="auth-page">
        <div className="auth-card">
          <h2>Suscribirse</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label>Nombre</label>
                <input
                  name="firstname"
                  placeholder="Ej: Juan"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Apellidos</label>
                <input
                  name="lastname"
                  placeholder="Ej: Pérez"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label>Email Profesional</label>
              <input
                name="email"
                placeholder="tu@email.com"
                type="email"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Nombre de Usuario</label>
              <input
                name="username"
                placeholder="usuario123"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Contraseña Segura</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              Crear Cuenta
            </button>
          </form>

          {message && (
            <p className={message === "Registro exitoso" ? "success-message" : "error-message"} style={{ marginTop: '20px' }}>
              {message}
            </p>
          )}

          <div className="auth-footer">
            <p>¿Ya tienes cuenta? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Inicia Sesión</a></p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Register;
