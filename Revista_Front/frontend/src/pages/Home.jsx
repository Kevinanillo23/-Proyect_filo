import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/HomePage.css";
import { API_BASE_URL } from "../configuration";
import PageTransition from "../components/PageTransition";
import HeroCarousel from "../components/HeroCarousel";

/**
 * Componente Home - Página principal con lista de artículos recientes
 * @component
 * @returns {JSX.Element} JSX de la página Home
 */
function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const { search } = useLocation(); // Hook para leer query params

  /**
   * Obtiene artículos desde la API
   */
  const fetchArticles = async () => {
    try {
      const searchParams = new URLSearchParams(search);
      const query = searchParams.get("search");

      const res = await fetch(`${API_BASE_URL}/api/articles${query ? `?search=${query}` : '?limit=6'}`); // Si busca, busca todo. Si no, solo 6 recientes.
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Error al obtener artículos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [search]); // Re-ejecutar cuando cambie la URL (?search=...)

  if (loading) return <p>Cargando artículos...</p>;

  return (
    <PageTransition>
      <HeroCarousel />
      <div className="home-container" style={{ marginTop: '80px' }}>
        <h1>Actualidad Filosófica</h1>

        {articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No hay artículos disponibles.</p>
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
                  <Link to={`/article/${article._id}`}>Leer más</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default Home;
