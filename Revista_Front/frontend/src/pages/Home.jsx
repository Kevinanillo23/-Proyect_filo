import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/HomePage.css";
import PageTransition from "../components/PageTransition";
import HeroCarousel from "../components/HeroCarousel";
import ArticleCard from "../components/ArticleCard";
import { useArticles } from "../hooks/useArticles";

const CATEGORIES = ["General", "Ética", "Metafísica", "Existencialismo", "Estoicismo", "Socrática", "Política"];

function Home() {
  const { search } = useLocation();

  // Create stable params object to prevent infinite loops in hook
  const params = useMemo(() => {
    const searchParams = new URLSearchParams(search);
    return {
      search: searchParams.get("search"),
      category: searchParams.get("category")
    };
  }, [search]);

  // Use the Controller Hook
  const { articles, loading, error } = useArticles(params);

  // View Logic
  const renderContent = () => {
    if (loading) {
      return (
        <div className="home-loading">
          <div className="spinner"></div>
          <p>Cargando pensamiento...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-state">
          <p>Error: {error}</p>
        </div>
      );
    }

    if (articles.length === 0) {
      return (
        <div className="empty-state">
          <p>No hay artículos disponibles en este momento.</p>
        </div>
      );
    }

    return (
      <div className="news-grid">
        {articles.map((article, index) => (
          <ArticleCard key={article._id} article={article} index={index} />
        ))}
      </div>
    );
  };

  const searchQuery = params.search;
  const selectedCategory = params.category;

  return (
    <PageTransition>
      <HeroCarousel />
      <div className="home-container">
        <header className="home-header">
          <h1>
            {searchQuery
              ? `Resultados para: "${searchQuery}"`
              : "Actualidad Filosófica"}
          </h1>
        </header>

        <nav className="category-filters">
          <Link
            to="/"
            className={`role-badge ${!selectedCategory ? 'active' : ''}`}
          >
            Todos
          </Link>
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              to={`/?category=${cat}`}
              className={`role-badge ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </Link>
          ))}
        </nav>

        {renderContent()}
      </div>
    </PageTransition>
  );
}

export default Home;
