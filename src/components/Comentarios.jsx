import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import AgregarComentario from './AgregarComentario';
import EliminarComentario from './EliminarComentario';
import './Comentarios.css';

const Comentarios = () => {
    const { id } = useParams(); // Obtener el ID del artículo desde la URL
    const [comments, setComments] = useState([]);

    const { data, isLoading, isError } = useFetch(`https://sandbox.academiadevelopers.com/infosphere/comments/?article=${id}`, {
        headers: {
            'accept': 'application/json',
            'X-CSRFToken': 'Ih8y5vTuecu6We9MbCHbjn7hA7JEjsnifqoTWon9h5b9WAdKbyKg9zuId52mlxhW',
        },
    });

    const handleDeleteSuccess = () => {
        window.location.href = window.location.href;
      };

    useEffect(() => {
        if (data && data.results) {
            setComments(data.results);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: No se pudo cargar los comentarios</div>;
    }


    return (
        <div className="comments-section">
            <h1 className='comentarios'>Comentarios</h1>

            <AgregarComentario></AgregarComentario>

            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p><strong>{comment.content}</strong></p>
                        <div className="comment-footer">
                            <p>
                                Creado el: {new Date(comment.created_at).toLocaleString()}
                            </p>
                            <EliminarComentario id={comment.id} onDeleteSuccess={handleDeleteSuccess} />


                        </div>
                    </div>
                ))
            ) : (
                <p>No hay comentarios.</p>
            )}
        </div>
    );
};

export default Comentarios;