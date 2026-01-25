/**
 * @file ArticleForm.jsx
 * @description Componente formulario para crear o actualizar artículos, incluyendo URL de imagen.
 * Solo visible para usuarios con rol admin.
 */

import React from "react";
import "../styles/ArticleForm.css";

/**
 * Formulario para crear o actualizar un artículo.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {{ title: string, content: string, url: string|null }} props.newArticle - Estado del artículo.
 * @param {Function} props.setNewArticle - Función para actualizar el estado del artículo.
 * @param {Function} props.onSubmit - Función que se ejecuta al enviar el formulario.
 * @param {boolean} props.editing - Indica si se está editando un artículo.
 * @returns {JSX.Element} JSX del formulario de artículo.
 */
function ArticleForm({ newArticle, setNewArticle, onSubmit, editing }) {
  /**
   * Maneja el cambio en los inputs del formulario.
   *
   * @function handleChange
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e - Evento del input/textarea.
   */
  const handleChange = (e) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  return (
    <div className="article-form-section">
      <h2 style={{ marginTop: 0, marginBottom: '25px' }}>{editing ? "Editar Artículo" : "Nuevo Artículo"}</h2>
      <div className="article-form">
        <div>
          <label>Título del Artículo</label>
          <input
            name="title"
            placeholder="Ej: El pensamiento de Heidegger"
            value={newArticle.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contenido / Cuerpo</label>
          <textarea
            name="content"
            placeholder="Escribe el contenido aquí..."
            value={newArticle.content}
            onChange={handleChange}
            style={{ minHeight: '150px' }}
          />
        </div>
        <div>
          <label>Categoría</label>
          <select
            name="category"
            value={newArticle.category || "General"}
            onChange={handleChange}
            className="search-input"
            style={{ width: '100%', background: 'rgba(15, 23, 42, 0.8)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px', borderRadius: '8px' }}
          >
            <option value="General">General</option>
            <option value="Ética">Ética</option>
            <option value="Metafísica">Metafísica</option>
            <option value="Existencialismo">Existencialismo</option>
            <option value="Estoicismo">Estoicismo</option>
            <option value="Socrática">Socrática</option>
            <option value="Política">Política</option>
          </select>
        </div>
        <div>
          <label>Imagen de Portada (URL)</label>
          <input
            name="url"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={newArticle.url || ""}
            onChange={handleChange}
          />
        </div>
        <button className="btn-primary" onClick={onSubmit} style={{ width: '100%' }}>
          {editing ? "Guardar Cambios" : "Publicar Artículo"}
        </button>
      </div>
    </div>
  );
}

export default ArticleForm;
