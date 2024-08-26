import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import './AgregarComentario.css'; // Importa el archivo CSS

const AgregarComentario = ({ onCommentAdded }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const state = useAuth("state");
    let token = state.token;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/comments/`, {
                method: 'POST',
                headers: {
                    'accept' : 'application/json' ,
                    'Authorization' : `Token ${token}`,
                    'X-CSRFToken': 'kwX597cqhKUv3caED1ZqJxb3zHuZSQsSRFdq00G5kDBy3yeCDX2vzJyucFNHUVmw',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ content, article: id }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el comentario');
            }

            const newComment = await response.json();
            //onCommentAdded(newComment); // Notifica al componente padre que se ha añadido un nuevo comentario
            setContent(''); // Limpia el campo de texto
            navigate(0);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-comment-container">
            <h2 className="comment-title">Agregar un comentario</h2>
            <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escribe tu comentario aquí..."
                    rows="4"
                    required
                    className="comment-textarea"
                ></textarea>
                <button type="submit" className="comment-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            {error && <p className="comment-error">{error}</p>}
        </div>
    );
};

export default AgregarComentario;
