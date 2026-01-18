import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";

/**
 * Componente ResetPassword - Permite restablecer la contraseña con token
 * @component
 * @returns {JSX.Element} Formulario de nueva contraseña
 */
function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  /** @constant {RegExp} */
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{5,}$/;

  /**
   * Maneja submit del reset de contraseña
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e Evento submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(password)) {
      setMessage(
        "La contraseña debe tener al menos 5 caracteres, una mayúscula y un número."
      );
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/users/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (err) {
      setMessage("Error conectando con el backend");
    }
  };

  return (
    <div>
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Restablecer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
