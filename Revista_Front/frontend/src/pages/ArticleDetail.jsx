/**
 * @file ArticleDetail.jsx
 * @description Página de detalle de un artículo, mostrando únicamente el artículo seleccionado.
 */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/articleDetail.css";
import CommentSection from "../components/CommentSection";
import { API_BASE_URL } from "../configuration";

/**
 * Componente ArticleDetail
 * Muestra un artículo completo según el ID pasado en la URL.
 *
 * @component
 * @returns {JSX.Element} JSX del detalle del artículo
 */
function ArticleDetail() {
  const { id } = useParams(); // ID del artículo de la URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Obtiene el artículo desde la API según su ID.
   * Maneja errores si no se encuentra.
   *
   * @async
   */
  useEffect(() => {
    /**
     * Obtiene el artículo desde la API según su ID.
     * Maneja errores si no se encuentra.
     */
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/articles/${id}`);
        if (!res.ok) throw new Error("Error al obtener el artículo");
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando artículo...</p>;
  if (!article) return <p style={{ textAlign: "center" }}>Artículo no encontrado</p>;

  return (
    <div className="article-detail-container">

      {article.url && <img src={article.url} alt={article.title} />}
      <h1>{article.title}</h1>
      <p className="meta">Publicado el {new Date(article.createdAt).toLocaleDateString()}</p>
      <div className="article-body">
        <p>{article.content}</p>
      </div>

      <CommentSection
        articleId={id}
        comments={article.comments || []}
        onCommentAdded={(updatedComments) => setArticle({ ...article, comments: updatedComments })}
      />

      <Link to="/" className="btn-back">← Volver al inicio</Link>
    </div>
  );
}

export default ArticleDetail;
