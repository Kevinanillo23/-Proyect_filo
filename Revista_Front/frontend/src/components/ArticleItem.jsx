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
    <div className="article-row">
      <img src={article.url || "https://via.placeholder.com/80"} alt={article.title} />

      <div className="article-row-info">
        <h3>{article.title}</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ID: {article._id.slice(-6)} • {new Date(article.createdAt).toLocaleDateString()}
        </p>
      </div>

      {isAdmin && (
        <div className="article-row-actions">
          <button
            className="btn-edit"
            onClick={() => onEdit(article)}
            disabled={isDeleting}
          >
            Editar
          </button>
          <button
            className="btn-delete"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? '...' : 'Eliminar'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleItem;
