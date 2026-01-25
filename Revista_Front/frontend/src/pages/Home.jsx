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
      const category = searchParams.get("category");

      let url = `${API_BASE_URL}/api/articles`;
      const params = new URLSearchParams();

      if (query) params.append("search", query);
      if (category) params.append("category", category);
      if (!query && !category) params.append("limit", "6");

      const res = await fetch(`${url}?${params.toString()}`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Error al obtener artículos:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["General", "Ética", "Metafísica", "Existencialismo", "Estoicismo", "Socrática", "Política"];

  useEffect(() => {
    fetchArticles();
  }, [search]); // Re-ejecutar cuando cambie la URL (?search=...)

  if (loading) return <p style={{ textAlign: 'center', marginTop: '100px' }}>Cargando artículos...</p>;

  return (
    <PageTransition>
      <HeroCarousel />
      <div className="home-container" style={{ marginTop: '80px' }}>
        <h1>
          {new URLSearchParams(search).get("search")
            ? `Resultados para: "${new URLSearchParams(search).get("search")}"`
            : "Actualidad Filosófica"}
        </h1>

        <div className="category-filters" style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
          <Link to="/" className={`role-badge ${!new URLSearchParams(search).get("category") ? 'admin' : 'user'}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>
            Todos
          </Link>
          {categories.map(cat => (
            <Link
              key={cat}
              to={`/?category=${cat}`}
              className={`role-badge ${new URLSearchParams(search).get("category") === cat ? 'admin' : 'user'}`}
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              {cat}
            </Link>
          ))}
        </div>

        {articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No hay artículos disponibles.</p>
        ) : (
          <div className="news-grid">
            {articles.map((article, index) => (
              <div
                key={article._id}
                className="card fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {article.url && <img src={article.url} alt={article.title} />}

                <div className="card-content">
                  <span className="role-badge user" style={{ fontSize: '0.65rem', marginBottom: '10px', display: 'inline-block' }}>
                    {article.category || "General"}
                  </span>
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
