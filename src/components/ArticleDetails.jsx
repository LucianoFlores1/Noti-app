import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './ArticleDetails.css'
import Comentarios from './Comentarios';
import AgregarComentario from './AgregarComentario';
// import EliminarArticulo from './EliminarArticulo';

const ArticleDetail = () => {
    const { id } = useParams(); // Obtener el ID del artículo desde la URL
    const [article, setArticle] = useState(null);
    const [authorName, setAuthorName] = useState(''); // Almacenamos el nombre del autor. PRUEBA

    const { data: articleData, isLoading, isError } = useFetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`, {
        headers: {
            'accept': 'application/json',
            'X-CSRFToken': 'HvuEjtfDJSNLRDq4fLdLk9zmNZGCtWIGb1W3b6q2iABexBDvLyv4rINRtQBPzg3q',
        },
    });

    const handleDeleteSuccess = () => {
        window.location.href = window.location.href;
      };

    useEffect(() => {
        if (articleData) {
            setArticle(articleData);
        }
    }, [articleData]);

    const handleCommentAdded = () => {

    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !article) {
        return <div>Error: No se pudo cargar el artículo</div>;
    }

    return (
        <div className="article">
            <h1 className='titulo'>{article.title}</h1>
            <div className='imagen'>
                {article.image && <img src={article.image} alt={article.title} className='img'/>}
            </div>
            <div className='copete'>
                <h4>{article.abstract}</h4>
            </div>
            <div className='contenido'>
                <p>{article.content}</p>
            </div>
            <div className="article-footer">
                {/* <p><strong>Author:</strong> {authorName || article.author}</p>
                <br /> */}
                <p><strong>Visitas: </strong> {article.view_count}</p>
            </div>

            <Comentarios articleData={id}/>

                {/* <EliminarArticulo id={article.id} onDeleteSuccess={handleDeleteSuccess} /> */}
        </div>
    );
};

export default ArticleDetail;
