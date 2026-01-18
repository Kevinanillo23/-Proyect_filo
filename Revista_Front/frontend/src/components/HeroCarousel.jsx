import React, { useState, useEffect } from "react";
import "../styles/HeroCarousel.css";

const philosophers = [
    {
        name: "Sócrates",
        quote: "La vida no examinada no vale la pena ser vivida.",
        image: "/images/philosophers/socrates.png",
        bio: "Padre de la filosofía occidental, centrado en la ética y el método dialéctico."
    },
    {
        name: "Platón",
        quote: "El conocimiento es el alimento del alma.",
        image: "/images/philosophers/plato.png",
        bio: "Fundador de la Academia y autor de la Teoría de las Ideas."
    },
    {
        name: "Friedrich Nietzsche",
        quote: "Lo que no me mata, me hace más fuerte.",
        image: "/images/philosophers/nietzsche.png",
        bio: "Crítico de la cultura racionalista y proponente del superhombre."
    },
    {
        name: "Marco Aurelio",
        quote: "La felicidad de tu vida depende de la calidad de tus pensamientos.",
        image: "/images/philosophers/aurelius.png",
        bio: "Emperador romano y uno de los filósofos estoicos más importantes."
    }
];

const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % philosophers.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero-carousel">
            {philosophers.map((phil, index) => (
                <div
                    key={phil.name}
                    className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
                    style={{ backgroundImage: `url(${phil.image})` }}
                >
                    <div className="slide-overlay">
                        <div className="slide-content">
                            <span className="slide-tag">Destacado</span>
                            <h2>{phil.name}</h2>
                            <p className="slide-quote">"{phil.quote}"</p>
                            <p className="slide-bio">{phil.bio}</p>
                            <div className="slide-actions">
                                <button className="btn-primary">Explorar Obra</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="carousel-indicators">
                {philosophers.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroCarousel;
