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


    return (
        <div className="comments-section">
            <h1 className='comentarios'>Comentarios</h1>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p><strong>{comment.content}</strong></p>
                        <div className="comment-footer">
                            <p>
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


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';
// import './Comentarios.css';

// const Comentarios = () => {
//     const { id } = useParams(); // Obtener el ID del artículo desde la URL
//     const [comments, setComments] = useState([]);
//     const [authors, setAuthors] = useState({});

//     const { data, isLoading, isError } = useFetch(`https://sandbox.academiadevelopers.com/infosphere/comments/?article=${id}`, {
//         headers: {
//             'accept': 'application/json',
//             'X-CSRFToken': 'Ih8y5vTuecu6We9MbCHbjn7hA7JEjsnifqoTWon9h5b9WAdKbyKg9zuId52mlxhW',
//         },
//     });

//     // Función para obtener los detalles del autor
//     const fetchAuthorDetails = async (id) => {
//         const response = await fetch(`https://sandbox.academiadevelopers.com/users/profiles/${id}/`, {
//             headers: {
//                 'accept': 'application/json',
//                 'X-CSRFToken': 'kwX597cqhKUv3caED1ZqJxb3zHuZSQsSRFdq00G5kDBy3yeCDX2vzJyucFNHUVmw',
//             },
//         });
//         return response.json();
//     };

//     useEffect(() => {
//         if (data && data.results) {
//             setComments(data.results);

//             // Obtener los IDs únicos de los autores
//             const authorIds = [...new Set(data.results.map(comment => comment.author))];

//             // Obtener los detalles de cada autor
//             Promise.all(authorIds.map(id => fetchAuthorDetails(id)))
//                 .then(authorDetails => {
//                     const authorsMap = authorDetails.reduce((acc, author) => {
//                         acc[author.id] = author; // Suponiendo que el JSON de la respuesta contiene el campo id
//                         return acc;
//                     }, {});
//                     setAuthors(authorsMap);
//                 });
//         }
//     }, [data]);

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (isError) {
//         return <div>Error: No se pudo cargar los comentarios</div>;
//     }

//     return (
//         <div className="comments-section">
//             <h1 className='comentarios'>Comentarios</h1>
//             {comments.length > 0 ? (
//                 comments.map((comment) => (
//                     <div key={comment.id} className="comment">
//                         <p>{comment.content}</p>
//                         <div className="comment-footer">
//                             <p>
//                                 {/* Autor: {authors[comment.author]?.name || 'Desconocido'} Mostrar el nombre del autor */}
//                                 <br />
//                                 Creado el: {new Date(comment.created_at).toLocaleString()}
//                             </p>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p>No hay comentarios.</p>
//             )}
//         </div>
//     );
// };

// export default Comentarios;
