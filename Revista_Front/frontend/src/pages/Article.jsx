import React, { useState, useEffect } from "react";
import "../styles/article.css";
import toast from "react-hot-toast";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../utils/articleUtils";
import ArticleForm from "../components/ArticleForm";
import ArticleList from "../components/ArticleList";
import PageTransition from "../components/PageTransition";

/**
 * Componente Article - Página de gestión de artículos.
 * Permite a los admins crear, editar y eliminar artículos.
 * @component
 * @returns {JSX.Element} JSX de la página de artículos
 */
function Article() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newArticle, setNewArticle] = useState({ title: "", content: "", url: "" });
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isAdmin = user?.role === "admin";

  /**
   * Carga los artículos al montar el componente
   */
  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchArticles();
        // data ahora es { articles: [], totalPages: ... }
        setArticles(data.articles || []);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, [token]);

  /**
   * Maneja la creación o actualización de un artículo
   */
  const handleSubmit = async () => {
    if (!newArticle.title || !newArticle.content) {
      toast.error("Título y contenido son obligatorios");
      return;
    }
    try {
      if (editingId) {
        await updateArticle(editingId, newArticle);
        toast.success("Artículo actualizado correctamente");
      } else {
        await createArticle(newArticle);
        toast.success("Artículo creado con éxito");
      }
      setNewArticle({ title: "", content: "", url: "" });
      setEditingId(null);

      const data = await fetchArticles();
      setArticles(data.articles || []);
    } catch (err) {
      toast.error(err.message);
    }
  };

  /**
   * Inicia la edición de un artículo
   * @param {Object} article Artículo a editar
   */
  const handleEdit = (article) => {
    setEditingId(article._id);
    setNewArticle({
      title: article.title,
      content: article.content,
      url: article.url || ""
    });
  };

  /**
   * Maneja la eliminación de un artículo
   * @param {string} id ID del artículo
   */
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a._id !== id));
      toast.success("Artículo eliminado");
    } catch (err) {
      toast.error(err.message || "Error al eliminar");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Cargando artículos...</p>;

  return (
    <PageTransition>
      <div className="article-container">
        <h1>Artículos</h1>

        {isAdmin && (
          <ArticleForm
            newArticle={newArticle}
            setNewArticle={setNewArticle}
            onSubmit={handleSubmit}
            editing={!!editingId}
          />
        )}

        <ArticleList
          articles={articles}
          isAdmin={isAdmin}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      </div>
    </PageTransition>
  );
}

export default Article;
