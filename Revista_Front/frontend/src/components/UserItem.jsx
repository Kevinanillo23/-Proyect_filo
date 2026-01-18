import React from "react";

/**
 * Fila individual de usuario en la tabla
 *
 * @component
 * @param {Object} props
 * @param {Object} props.user - Datos del usuario
 * @param {string} props.user.id - ID del usuario
 * @param {string} props.user.firstname - Nombre
 * @param {string} props.user.lastname - Apellido
 * @param {string} props.user.username - Usuario
 * @param {string} props.user.email - Email
 * @param {string} props.user.role - Rol del usuario
 * @param {boolean} props.isAdmin - Indica si el usuario actual es admin
 * @param {function} props.onEdit - Función para editar usuario
 * @param {function} props.onDelete - Función para eliminar usuario
 * @param {boolean} props.deleting - Indica si se está eliminando este usuario
 */
function UserItem({ user, isAdmin, onEdit, onDelete, deleting }) {
  return (
    <tr>
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      {isAdmin && (
        <td>
          <button className="edit" onClick={() => onEdit(user)}>Editar</button>
          <button
            className="delete"
            onClick={() => {
              if (window.confirm(`¿Estás seguro de que deseas eliminar a ${user.username}?`)) {
                onDelete(user.id);
              }
            }}
            disabled={deleting}
          >
            {deleting ? "Eliminando..." : "Eliminar"}
          </button>
        </td>
      )}
    </tr>
  );
}

export default UserItem;
