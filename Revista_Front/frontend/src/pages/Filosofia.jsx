import React from "react";
import "../styles/filosofia.css";

/**
 * Lista de libros de filosofía
 * @type {Array<{id:number,titulo:string,autor:string,portada:string,enlace:string}>}
 */
const libros = [
  {
    id: 1,
    titulo: "La República",
    autor: "Platón",
    portada:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
    enlace: "https://es.wikipedia.org/wiki/La_Rep%C3%BAblica_(Plat%C3%B3n)",
  },
  {
    id: 2,
    titulo: "Crítica de la razón pura",
    autor: "Immanuel Kant",
    portada:
      "https://imgs.search.brave.com/9RrcJ_UUAvmPIxyGY_5fqO3ym2BriT_VLXpuP_gR5c4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cGVuZ3VpbmxpYnJv/cy5jb20vbXgvMTYy/MjI4OS1sYXJnZV9k/ZWZhdWx0L2NyaXRp/Y2EtZGUtbGEtcmF6/b24tcHVyYS53ZWJw",
    enlace: "https://es.wikipedia.org/wiki/Cr%C3%ADtica_de_la_raz%C3%B3n_pura",
  },
  {
    id: 3,
    titulo: "Así habló Zaratustra",
    autor: "Friedrich Nietzsche",
    portada:
      "https://imgs.search.brave.com/FPuJOxiCqZFq_SzqxBpM1TlyG9-n-7UXWx6FFXOQdxY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzgyNjU3Mi1NTFU2/OTM4NjEwMzg2NF8w/NTIwMjMtVi53ZWJw",
    enlace: "https://es.wikipedia.org/wiki/As%C3%AD_habl%C3%B3_Zaratustra",
  },
  {
    id: 4,
    titulo: "El ser y la nada",
    autor: "Jean-Paul Sartre",
    portada:
      "https://imgs.search.brave.com/DG_TWXrbyqFupEmJuzq4UdYh6tQUsatBWXm0wWqxxjw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waWN0/dXJlcy5hYmVib29r/cy5jb20vaW52ZW50/b3J5L21kL21kMzIy/NzYxNDIwMTUuanBn",
    enlace: "https://es.wikipedia.org/wiki/El_ser_y_la_nada",
  },
];

/**
 * Componente Filosofia - Muestra libros de filosofía
 * @component
 * @returns {JSX.Element} JSX de la página Filosofía
 */
function Filosofia() {
  return (
    <div className="filosofia-container">
      <h1>Libros de Filosofía</h1>
      <p>
        Una selección de obras fundamentales para comprender la historia del
        pensamiento filosófico.
      </p>

      <div className="libros-grid">
        {libros.map((libro) => (
          <div key={libro.id} className="libro-card">
            <img src={libro.portada} alt={libro.titulo} />
            <div className="libro-info">
              <h2>{libro.titulo}</h2>
              <p className="autor">{libro.autor}</p>
              <a
                href={libro.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-leer"
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

export default Filosofia;
