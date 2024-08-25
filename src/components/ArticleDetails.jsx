import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import DOMPurify from 'dompurify';
import './ArticleDetails.css'

const ArticleDetail = () => {
    const { id } = useParams(); // Obtener el ID del artículo desde la URL
    const [article, setArticle] = useState(null);

    const { data, isLoading, isError } = useFetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${id}`, {
        headers: {
            'accept': 'application/json',
            'X-CSRFToken': 'HvuEjtfDJSNLRDq4fLdLk9zmNZGCtWIGb1W3b6q2iABexBDvLyv4rINRtQBPzg3q',
        },
    });

    useEffect(() => {
        if (data) {
            setArticle(data);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !article) {
        return <div>Error: No se pudo cargar el artículo</div>;
    }

    // Sanitizar el contenido HTML
    const sanitizedContent = DOMPurify.sanitize(article.content);

    return (
        <div className="article-detail">
            <h1>{article.title}</h1>
            {article.abstract && <h4>{article.abstract}</h4>}
            <p className="article-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            {article.image && <img src={article.image} alt={article.title} />}
            <div className="article-footer">

                <p><strong>Views:</strong> {article.view_count}</p>
            </div>
        </div>
    );
};

export default ArticleDetail;
