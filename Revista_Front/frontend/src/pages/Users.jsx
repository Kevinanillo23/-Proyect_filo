import React, { useEffect, useState } from "react";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../utils/userUtils";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import toast from "react-hot-toast";

/**
 * Página de gestión de usuarios.
 * Solo accesible para administradores.
 *
 * @component
 * @returns {JSX.Element} Componente Users
 */
function Users() {
  /** @type {[Array<Object>, Function]} Lista de usuarios y setter */
  const [users, setUsers] = useState([]);

  /** @type {[Object, Function]} Usuario que se está creando o editando */
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  /** @type {[number|null, Function]} ID del usuario en edición */
  const [editingId, setEditingId] = useState(null);

  /** @type {[number|null, Function]} ID del usuario en eliminación */
  const [deletingId, setDeletingId] = useState(null);

  /** @type {[boolean, Function]} Estado de carga */
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isAdmin = user?.role === "admin";

  /** Cargar usuarios desde el backend */
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(token);
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [token]);

  /**
   * Crear o actualizar usuario
   * @async
   */
  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateUser(token, editingId, newUser);
        toast.success("Usuario actualizado correctamente");
      } else {
        await createUser(token, newUser);
        toast.success("Usuario creado con éxito");
      }

      setNewUser({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        role: "user",
      });
      setEditingId(null);

      const data = await fetchUsers(token);
      setUsers(data);
    } catch (err) {
      toast.error(err.message || "Error al procesar el usuario");
    }
  };

  /**
   * Editar usuario
   * @param {Object} user - Usuario a editar
   */
  const handleEdit = (user) => {
    setEditingId(user.id);
    setNewUser({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      username: user.username || "",
      email: user.email || "",
      password: "",
      role: user.role || "user",
    });
  };

  /**
   * Eliminar usuario
   * @async
   * @param {number} id - ID del usuario a eliminar
   */
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteUser(token, id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("Usuario eliminado");
    } catch (err) {
      toast.error(err.message || "Error al eliminar");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div className="users-container">
      <h1>Gestión de Usuarios</h1>

      {isAdmin && (
        <UserForm
          newUser={newUser}
          setNewUser={setNewUser}
          onSubmit={handleSubmit}
          editing={!!editingId}
        />
      )}

      <UserList
        users={users}
        isAdmin={isAdmin}
        onEdit={handleEdit}
        onDelete={handleDelete}
        deletingId={deletingId}
      />
    </div>
  );
}

export default Users;
