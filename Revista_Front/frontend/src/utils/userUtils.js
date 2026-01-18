import { API_BASE_URL } from "../config";
import { fetchWithAuth } from "./authHelper";

const API_URL = `${API_BASE_URL}/api/users`;

/**
 * Obtener todos los usuarios (solo admin)
 * @async
 * @returns {Promise<Array<Object>>} Lista de usuarios
 */
export const fetchUsers = async () => {
  const res = await fetchWithAuth(API_URL);
  if (!res.ok) throw new Error("Error cargando usuarios");
  return res.json();
};

/**
 * Crear un nuevo usuario
 * @async
 * @param {Object} user - Datos del usuario
 * @returns {Promise<Object>} Usuario creado
 */
export const createUser = async (user) => {
  const res = await fetchWithAuth(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error creando usuario");
  return data.user;
};

/**
 * Actualizar un usuario existente
 * @async
 * @param {number} id - ID del usuario
 * @param {Object} updates - Campos a actualizar
 * @returns {Promise<Object>} Usuario actualizado
 */
export const updateUser = async (id, updates) => {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error actualizando usuario");
  return data.user;
};

/**
 * Eliminar un usuario por ID
 * @async
 * @param {number} id - ID del usuario
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export const deleteUser = async (id) => {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error eliminando usuario");
  return data;
};
