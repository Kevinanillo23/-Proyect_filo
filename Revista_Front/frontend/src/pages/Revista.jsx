import React from 'react';
import '../styles/revista.css';

/**
 * Lista de ediciones de la revista
 * @type {Array<{numero:number,fecha:string,portada:string,enlaceDigital:string,descripcion:string}>}
 */
const ediciones = [
  {
    numero: 14,
    fecha: 'Agosto 2025',
    portada: 'https://filco.es/uploads/2025/08/Cubierta-Revista-FILOSOFIACO-Numero-14-1483x2048.jpg',
    enlaceDigital: 'https://filco.es/revista-filosofiaco-no-14/',
    descripcion: 'Diálogo entre filósofos contemporáneos sobre poder e identidad.',
  },
  {
    numero: 13,
    fecha: 'Mayo 2025',
    portada: 'https://filco.es/uploads/2025/05/Cubierta-Revista-FILOSOFIACO-Numero-13.jpg',
    enlaceDigital: 'https://filco.es/revista-filosofiaco-no-13/',
    descripcion: 'Exploración filosófica de la incertidumbre en el mundo actual.',
  },
  {
    numero: 12,
    fecha: 'Febrero 2025',
    portada: 'https://imgs.search.brave.com/zPDiWC2yTpkUto7wWrOgjh2ntQDJj4DpweqUYjqMzO4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTE5S21haDlXdEwu/anBn',
    enlaceDigital: 'https://filco.es/revista-filosofiaco-no-12/',
    descripcion: 'Reflexiones sobre la crisis ecosocial y el papel de la filosofía.',
  },
];

/**
 * Componente Revista - Muestra ediciones de la revista FILOSOFÍA&CO
 * @component
 * @returns {JSX.Element} JSX de la página Revista
 */
function Revista() {
  return (
    <div className="revista-container">
      <h1>Revista FILOSOFÍA&CO</h1>
      <p>Explora nuestras ediciones más recientes y profundiza en el pensamiento filosófico contemporáneo.</p>

      <div className="ediciones">
        {ediciones.map((edicion) => (
          <div key={edicion.numero} className="edicion-card">
            <img src={edicion.portada} alt={`Portada del número ${edicion.numero}`} />
            <h2>Número {edicion.numero} - {edicion.fecha}</h2>
            <p>{edicion.descripcion}</p>
            <a href={edicion.enlaceDigital} target="_blank" rel="noopener noreferrer">
              Leer edición digital
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Revista;
