/**
 * @file ArticleItem.jsx
 * @description Componente que muestra un artículo individual con acciones de edición y eliminación.
 * Solo admins pueden ver botones de editar/eliminar.
 * @module Components/ArticleItem
 */

import React from 'react';

/**
 * Representa un artículo individual.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.article - Datos del artículo.
 * @param {boolean} props.isAdmin - Indica si el usuario es admin.
 * @param {Function} props.onEdit - Función para editar el artículo.
 * @param {Function} props.onDelete - Función para eliminar el artículo.
 * @param {boolean} props.isDeleting - Indica si el artículo se está eliminando.
 * @returns {JSX.Element} JSX del artículo.
 */
const ArticleItem = ({ article, isAdmin, onEdit, onDelete, isDeleting }) => {
  /**
   * Maneja el evento de eliminar artículo con confirmación.
   * @function handleDelete
   */
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      onDelete(article._id);
    }
  };

  return (
    <article className="article-item">
      {article.url && (
        <div className="article-image-preview">
          <img src={article.url} alt={article.title} />
        </div>
      )}
      <div className="article-content">
        <h3>{article.title}</h3>
        <p className="article-meta">
          Publicado el {new Date(article.createdAt).toLocaleDateString()}
        </p>
        <div className="article-body">
          {article.content}
        </div>
      </div>

      {isAdmin && (
        <div className="article-actions">
          <button
            className="edit-btn"
            onClick={() => onEdit(article)}
            disabled={isDeleting}
          >
            Editar
          </button>
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      )}
    </article>
  );
};

export default ArticleItem;
