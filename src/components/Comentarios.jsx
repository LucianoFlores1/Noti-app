import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
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
    
    console.log(data);

    return (
        <div className="comments-section">
            <h1 className='comentarios'>Comentarios</h1>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>{comment.content}</p>
                        <div className="comment-footer">
                            <p>
                                {/* Author: {comment.author || 'Anónimo'} */}
                                <br />
                                Creado el: {new Date(comment.created_at).toLocaleString()}
                            </p>
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
