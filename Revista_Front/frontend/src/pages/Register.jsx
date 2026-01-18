import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import { API_BASE_URL } from "../config";

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
        if (data.token) {
          localStorage.setItem("token", data.token);
          sessionStorage.setItem("user", JSON.stringify(data.user));
        }

        setMessage("Registro exitoso");
        navigate("/");
      } else {
        setMessage(data.error || "Error en el registro");
      }
    } catch (err) {
      setMessage("Error al conectar con el backend");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="firstname"
          placeholder="Firstname"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="lastname"
          placeholder="Lastname"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
        />
        <br />
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
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
