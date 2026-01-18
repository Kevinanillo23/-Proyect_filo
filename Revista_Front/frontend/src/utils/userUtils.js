import { API_BASE_URL } from "../config";
const API_URL = `${API_BASE_URL}/api/users`;

/**
 * Obtener todos los usuarios (solo admin)
 * @async
 * @param {string} token - JWT de autenticación
 * @returns {Promise<Array<Object>>} Lista de usuarios
 */
export const fetchUsers = async (token) => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error cargando usuarios");
  return res.json();
};

/**
 * Crear un nuevo usuario
 * @async
 * @param {string} token - JWT de autenticación
 * @param {Object} user - Datos del usuario
 * @param {string} user.firstname
 * @param {string} user.lastname
 * @param {string} user.username
 * @param {string} user.email
 * @param {string} user.password
 * @param {string} user.role
 * @returns {Promise<Object>} Usuario creado
 */
export const createUser = async (token, user) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error creando usuario");
  return data.user;
};

/**
 * Actualizar un usuario existente
 * @async
 * @param {string} token - JWT
 * @param {number} id - ID del usuario
 * @param {Object} updates - Campos a actualizar
 * @returns {Promise<Object>} Usuario actualizado
 */
export const updateUser = async (token, id, updates) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error actualizando usuario");
  return data.user;
};

/**
 * Eliminar un usuario por ID
 * @async
 * @param {string} token - JWT
 * @param {number} id - ID del usuario
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export const deleteUser = async (token, id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error eliminando usuario");
  return data;
};
