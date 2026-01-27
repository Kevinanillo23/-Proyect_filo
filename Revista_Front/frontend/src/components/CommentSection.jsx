import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Comments.css";
import { articleService } from "../services/articleService";

/**
 * Sección de comentarios para un artículo
 * @param {Object} props
 * @param {string} props.articleId - ID del artículo
 * @param {Array} props.comments - Lista inicial de comentarios
 * @param {Function} props.onCommentAdded - Callback para actualizar el estado padre
 */
const CommentSection = ({ articleId, comments = [], onCommentAdded }) => {
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);

    // Obtener usuario de sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user"));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setLoading(true);
        try {
            const data = await articleService.addComment(articleId, newComment);
            toast.success("Comentario publicado");
            setNewComment("");
            // Pass the updated list of comments
            onCommentAdded(data.comments);
        } catch (err) {
            toast.error(err.message || "Error al publicar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="comments-section">
            <h3>Comentarios ({comments.length})</h3>

            {user ? (
                <form className="comment-form" onSubmit={handleSubmit}>
                    <textarea
                        className="comment-textarea"
                        placeholder="Comparte tu opinión..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={loading}
                    />
                    <button type="submit" className="btn-comment" disabled={loading || !newComment.trim()}>
                        {loading ? "Publicando..." : "Comentar"}
                    </button>
                </form>
            ) : (
                <div className="login-prompt">
                    <p>Para comentar, debes <Link to="/login">iniciar sesión</Link> o <Link to="/register">registrarte</Link>.</p>
                </div>
            )}

            <div className="comments-list">
                {comments.slice().reverse().map((comment, index) => (
                    <div key={index} className="comment-card">
                        <div className="comment-header">
                            <span className="comment-author">@{comment.username}</span>
                            <span className="comment-date">
                                {new Date(comment.date).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                    </div>
                ))}
                {comments.length === 0 && <p style={{ color: "var(--text-muted)", textAlign: "center" }}>Sé el primero en comentar.</p>}
            </div>
        </div>
    );
};

export default CommentSection;
