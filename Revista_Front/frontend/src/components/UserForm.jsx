import React from "react";
import "../styles/UserForm.css";

/**
 * Formulario para crear o editar un usuario.
 *
 * @param {Object} props
 * @param {Object} props.newUser - Usuario en edición/creación
 * @param {Function} props.setNewUser - Setter del usuario
 * @param {Function} props.onSubmit - Función de envío del formulario
 * @param {boolean} props.editing - Si está editando
 * @returns {JSX.Element} Formulario de usuario
 */
function UserForm({ newUser, setNewUser, onSubmit, editing }) {
  return (
    <div className="user-form-container">
      <h2>{editing ? "Editar Usuario" : "Nuevo Usuario"}</h2>
      <form
        className="user-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.firstname || ""}
          onChange={(e) =>
            setNewUser({ ...newUser, firstname: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Apellido"
          value={newUser.lastname || ""}
          onChange={(e) =>
            setNewUser({ ...newUser, lastname: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Usuario"
          value={newUser.username || ""}
          onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Correo"
          value={newUser.email || ""}
          onChange={(e) =>
            setNewUser({ ...newUser, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={newUser.password || ""}
          onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })
          }
          required={!editing}
        />

        <select
          value={newUser.role || "user"}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
}

export default UserForm;
