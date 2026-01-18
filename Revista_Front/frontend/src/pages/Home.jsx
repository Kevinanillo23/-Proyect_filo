import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import { API_BASE_URL } from "../config";

/**
 * Componente Home - Página principal con lista de artículos recientes
 * @component
 * @returns {JSX.Element} JSX de la página Home
 */
function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Obtiene artículos desde la API
   */
  const fetchArticles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/articles?limit=6`);
      const data = await res.json();
      // Ahora data es un objeto { articles, totalPages, ... }
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Error al obtener artículos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) return <p>Cargando artículos...</p>;

  return (
    <div className="home-container">
      <h1>Actualidad Filosófica</h1>

      {articles.length === 0 ? (
        <p>No hay artículos disponibles.</p>
      ) : (
        <div className="news-grid">
          {articles.map((article) => (
            <div key={article._id} className="card">
              {article.url && <img src={article.url} alt={article.title} />}

              <div className="card-content">
                <h2>{article.title}</h2>
                <p>
                  {article.content.length > 150
                    ? article.content.slice(0, 150) + "..."
                    : article.content}
                </p>
                {localStorage.getItem("token") && (
                  <Link to={`/article/${article._id}`}>Leer más</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
