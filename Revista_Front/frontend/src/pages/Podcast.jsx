import React from "react";
import "../styles/podcast.css";

/**
 * Lista de podcasts disponibles
 * @type {Array<{id:number,titulo:string,descripcion:string,portada:string,enlace:string}>}
 */
const podcasts = [
  {
    id: 1,
    titulo: "La filosofía en la vida cotidiana",
    descripcion:
      "Reflexionamos sobre cómo las ideas filosóficas influyen en nuestras decisiones diarias.",
    portada:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    enlace: "https://open.spotify.com/episode/xyz123",
  },
  {
    id: 2,
    titulo: "El poder de las ideas",
    descripcion:
      "Un recorrido por los pensadores que transformaron la política y la cultura.",
    portada:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    enlace: "https://open.spotify.com/episode/abc456",
  },
  {
    id: 3,
    titulo: "Ética en tiempos de crisis",
    descripcion:
      "Debatimos los dilemas éticos más urgentes en el contexto de la crisis global.",
    portada:
      "https://images.unsplash.com/photo-1473187983305-f615310e7daa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    enlace: "https://open.spotify.com/episode/def789",
  },
];

/**
 * Componente Podcast - Muestra la lista de podcasts
 * @component
 * @returns {JSX.Element} JSX de la página Podcast
 */
function Podcast() {
  return (
    <div className="podcast-container">
      <h1>Podcasts Filosofía&Co</h1>
      <p>
        Escucha nuestros episodios y descubre nuevas perspectivas sobre los
        grandes temas de la filosofía y su impacto en la actualidad.
      </p>

      <div className="podcast-list">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card">
            <img
              src={podcast.portada}
              alt={`Portada de ${podcast.titulo}`}
              className="podcast-image"
            />
            <div className="podcast-info">
              <h2>{podcast.titulo}</h2>
              <p>{podcast.descripcion}</p>
              <a
                href={podcast.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="listen-btn"
              >
                Escuchar episodio
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Podcast;
