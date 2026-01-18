import React from "react";
import "../styles/portal.css";

/**
 * Lista de colecciones temáticas
 * @type {Array<{id:number,titulo:string,descripcion:string,imagen:string,enlace:string}>}
 */
const colecciones = [
  {
    id: 1,
    titulo: "Ética y moral",
    descripcion:
      "Exploramos los dilemas éticos que han acompañado a la humanidad y su vigencia en el mundo actual.",
    imagen:
      "https://images.unsplash.com/photo-1522205408450-add114ad53fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    enlace: "https://filco.es/etica-y-moral/",
  },
  {
    id: 2,
    titulo: "Filosofía política",
    descripcion:
      "Los pensadores que han transformado nuestra visión del poder, la justicia y la sociedad.",
    imagen:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    enlace: "https://filco.es/filosofia-politica/",
  },
  {
    id: 3,
    titulo: "Metafísica y ontología",
    descripcion:
      "Una mirada profunda a las preguntas esenciales sobre el ser, la realidad y la existencia.",
    imagen:
      "https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    enlace: "https://filco.es/metafisica-y-ontologia/",
  },
  {
    id: 4,
    titulo: "Filosofía contemporánea",
    descripcion:
      "Corrientes y debates que marcan el rumbo del pensamiento filosófico actual.",
    imagen:
      "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    enlace: "https://filco.es/filosofia-contemporanea/",
  },
];

/**
 * Componente Portal - Página de colecciones y temas filosóficos
 * @component
 * @returns {JSX.Element} JSX de la página Portal
 */
function Portal() {
  return (
    <div className="portal-container">
      <h1>Colecciones y Temas</h1>
      <p>
        Explora nuestras colecciones temáticas y sumérgete en el pensamiento
        filosófico desde diferentes perspectivas.
      </p>

      <div className="colecciones-grid">
        {colecciones.map((col) => (
          <div key={col.id} className="coleccion-card">
            <img src={col.imagen} alt={col.titulo} />
            <div className="coleccion-info">
              <h2>{col.titulo}</h2>
              <p>{col.descripcion}</p>
              <a
                href={col.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="leer-btn"
              >
                Leer más
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portal
