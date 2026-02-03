import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { articleService } from "../services/articleService";
import "../styles/HeroCarousel.css";

const philosophers = [
    {
        _id: "socrates",
        title: "Sócrates",
        content: "La vida no examinada no vale la pena ser vivida.",
        url: "/images/philosophers/socrates.png",
        bio: "Padre de la filosofía occidental, centrado en la ética y el método dialéctico."
    },
    {
        _id: "plato",
        title: "Platón",
        content: "El conocimiento es el alimento del alma.",
        url: "/images/philosophers/plato.png",
        bio: "Fundador de la Academia y autor de la Teoría de las Ideas."
    }
];

const HeroCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const data = await articleService.getAll({ limit: 4 });
                if (data.articles && data.articles.length > 0) {
                    setSlides(data.articles);
                } else {
                    setSlides(philosophers);
                }
            } catch (err) {
                console.error("Error fetching carousel slides:", err);
                setSlides(philosophers);
            } finally {
                setLoading(false);
            }
        };
        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides]);

    if (loading) return null;

    return (
        <section className="hero-carousel">
            {slides.map((slide, index) => (
                <div
                    key={slide._id}
                    className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
                    style={{ backgroundImage: `url(${slide.url || "/images/default-hero.jpg"})` }}
                >
                    <div className="slide-overlay">
                        <div className="slide-content">
                            <span className="slide-tag">Destacado</span>
                            <h2>{slide.title}</h2>
                            <p className="slide-quote">
                                {slide.content.length > 150
                                    ? `"${slide.content.slice(0, 150)}..."`
                                    : `"${slide.content}"`}
                            </p>
                            {slide.bio && <p className="slide-bio">{slide.bio}</p>}
                            <div className="slide-actions">
                                <Link to={`/article/${slide._id}`} className="btn-primary">
                                    Explorar Obra
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="carousel-indicators">
                {slides.map((_, index) => (
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

