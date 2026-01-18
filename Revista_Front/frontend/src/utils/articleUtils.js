import { API_BASE_URL } from "../config";
const API_URL = `${API_BASE_URL}/api/articles`;

/**
 * Fetches all articles from the API.
 * @async
 * @function fetchArticles
 * @param {string} token - JWT authentication token
 * @throws {Error} If the request fails
 * @returns {Promise<Object[]>} List of articles
 */
export const fetchArticles = async (token) => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error cargando artículos");
  return res.json();
};

/**
 * Creates a new article.
 * @async
 * @function createArticle
 * @param {string} token - JWT authentication token
 * @param {Object} article - Article data
 * @param {string} article.title - Title of the article
 * @param {string} article.content - Content of the article
 * @throws {Error} If the request fails
 * @returns {Promise<Object>} Created article
 */
export const createArticle = async (token, article) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
 * @param {string} token - JWT authentication token
 * @param {string} id - ID of the article to update
 * @param {Object} article - Updated article data
 * @param {string} [article.title] - Updated title
 * @param {string} [article.content] - Updated content
 * @throws {Error} If the request fails
 * @returns {Promise<Object>} Updated article
 */
export const updateArticle = async (token, id, article) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
 * @param {string} token - JWT authentication token
 * @param {string} id - ID of the article to delete
 * @throws {Error} If the request fails
 * @returns {Promise<Object>} Response message
 */
export const deleteArticle = async (token, id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error eliminando artículo");
  return data;
};
