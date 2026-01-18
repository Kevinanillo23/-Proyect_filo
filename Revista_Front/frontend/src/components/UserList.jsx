import React from "react";
import UserItem from "./UserItem";
import "../styles/UserList.css";

/**
 * Lista de usuarios
 *
 * @component
 * @param {Object} props
 * @param {Array} props.users - Array de usuarios
 * @param {boolean} props.isAdmin - Indica si el usuario actual es admin
 * @param {function} props.onEdit - Función para editar usuario
 * @param {function} props.onDelete - Función para eliminar usuario
 * @param {string|null} props.deletingId - ID del usuario que se está eliminando
 */
function UserList({ users, isAdmin, onEdit, onDelete, deletingId }) {
  if (!users.length) return <p>No hay usuarios.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Usuario</th>
          <th>Email</th>
          <th>Rol</th>
          {isAdmin && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
            deleting={deletingId === user.id}
          />
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
