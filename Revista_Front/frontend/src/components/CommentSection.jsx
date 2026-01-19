import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Comments.css";
import { fetchWithAuth } from "../utils/authHelper";
import { API_BASE_URL } from "../configuration";

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
            const res = await fetchWithAuth(`${API_BASE_URL}/api/articles/${articleId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: newComment }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Comentario publicado");
                setNewComment("");
                // Pasar la lista completa de comentarios actualizada
                onCommentAdded(data.comments);
            } else {
                toast.error(data.error || "Error al publicar");
            }
        } catch (err) {
            toast.error("Error de conexión");
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
