import { API_BASE_URL } from "../configuration";
import { fetchWithAuth } from "./authHelper";

const API_URL = `${API_BASE_URL}/api/articles`;

/**
 * Fetches all articles from the API.
 * @async
 * @function fetchArticles
 * @throws {Error} If the request fails
 * @returns {Promise<Object>} List of articles and pagination
 */
export const fetchArticles = async () => {
  const res = await fetchWithAuth(API_URL);
  if (!res.ok) throw new Error("Error cargando artículos");
  return res.json();
};

/**
 * Creates a new article.
 * @async
 * @function createArticle
 * @param {Object} article - Article data
 * @throws {Error} If the request fails
 * @returns {Promise<Object>} Created article
 */
export const createArticle = async (article) => {
  const res = await fetchWithAuth(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error creando artículo");
  return data.article;
};

/**
 * Updates an existing article.
 * @async
 * @function updateArticle
 * @param {string} id - ID of the article to update
 * @param {Object} article - Updated article data
 * @throws {Error} If the request fails
 * @returns {Promise<Object>} Updated article
 */
export const updateArticle = async (id, article) => {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error actualizando artículo");
  return data.article;
};

/**
 * Deletes an article by ID.
 * @async
 * @function deleteArticle
 * @param {string} id - ID of the article to delete
 * @throws {Error} If the request fails
 * @returns {Promise<Object>} Response message
 */
export const deleteArticle = async (id) => {
  const res = await fetchWithAuth(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error eliminando artículo");
  return data;
};
