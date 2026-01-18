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
    <div className="article-form">
      <input
        name="title"
        placeholder="Título"
        value={newArticle.title}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="Contenido"
        value={newArticle.content}
        onChange={handleChange}
      />
      <input
        name="url"
        placeholder="URL de la imagen (opcional)"
        value={newArticle.url || ""}
        onChange={handleChange}
      />
      <button onClick={onSubmit}>
        {editing ? "Actualizar Artículo" : "Crear Artículo"}
      </button>
    </div>
  );
}

export default ArticleForm;
