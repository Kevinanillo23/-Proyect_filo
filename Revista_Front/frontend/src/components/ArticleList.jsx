/**
 * @file ArticleList.jsx
 * @description Componente que renderiza una lista de artículos usando ArticleItem.
 * @module Components/ArticleList
 */

import React from "react";
import ArticleItem from "./ArticleItem";
import "../styles/ArticleList.css";
/**
 * Lista de artículos.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Array<Object>} props.articles - Array de artículos.
 * @param {boolean} props.isAdmin - Indica si el usuario es admin.
 * @param {Function} props.onEdit - Función para editar un artículo.
 * @param {Function} props.onDelete - Función para eliminar un artículo.
 * @param {string} props.deletingId - ID del artículo que se está eliminando.
 * @returns {JSX.Element} JSX de la lista de artículos.
 */
function ArticleList({ articles, isAdmin, onEdit, onDelete, deletingId }) {
  return (
    <div className="article-list">
      {articles.map((article) => (
        <ArticleItem
          key={article._id}
          article={article}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingId === article._id}
        />
      ))}
    </div>
  );
}

export default ArticleList;
