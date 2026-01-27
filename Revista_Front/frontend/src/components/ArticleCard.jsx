import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ArticleCard = ({ article, index }) => {
    return (
        <div
            className="card fade-in-up glass"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {article.url && (
                <div className="card-image-wrapper">
                    <img src={article.url} alt={article.title} loading="lazy" />
                </div>
            )}

            <div className="card-content">
                <span className="role-badge user category-badge">
                    {article.category || "General"}
                </span>
                <h2>{article.title}</h2>
                <p>
                    {article.content.length > 150
                        ? `${article.content.slice(0, 150)}...`
                        : article.content}
                </p>
                <Link to={`/article/${article._id}`} className="read-more-link">
                    Leer más
                </Link>
            </div>
        </div>
    );
};

ArticleCard.propTypes = {
    article: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        url: PropTypes.string,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        category: PropTypes.string,
    }).isRequired,
    index: PropTypes.number,
};

ArticleCard.defaultProps = {
    index: 0,
};

export default ArticleCard;
