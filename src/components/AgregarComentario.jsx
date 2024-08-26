import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AgregarComentario = ({ onCommentAdded }) => {
    const { id } = useParams(); // Obtener el ID del artículo desde la URL
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

    const state = useAuth("state");
    let token = state.token;
    console.log("state", state);
    console.log(token);

        try {
            const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/comments/`, {
                method: 'POST',
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({ content, article: id }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar el comentario');
            }

            const newComment = await response.json();
            onCommentAdded(newComment); // Notifica al componente padre que se ha añadido un nuevo comentario
            setContent(''); // Limpia el campo de texto
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-comment">
            <h2>Agregar un comentario</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escribe tu comentario aquí"
                    rows="4"
                    required
                ></textarea>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default AgregarComentario;
