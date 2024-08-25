import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import './Articles.css';

const Articles = () => {
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [hasMore, setHasMore] = useState(true); // Nuevo estado para controlar la visibilidad del botón
    const navigate = useNavigate();

    const { data, isLoading, isError } = useFetch(
        `https://sandbox.academiadevelopers.com/infosphere/articles?page=${page}&title=${searchTerm}`, {
        headers: {
            'accept': 'application/json',
            'X-CSRFToken': 'HvuEjtfDJSNLRDq4fLdLk9zmNZGCtWIGb1W3b6q2iABexBDvLyv4rINRtQBPzg3q',
        },
    });

    useEffect(() => {
        if (data && data.results) {
            setArticles(prevArticles => (page === 1 ? data.results : [...prevArticles, ...data.results]));

            // Verifica si hay más artículos para cargar
            if (data.results.length < 10) { // Supón que hay 10 artículos por página
                setHasMore(false);
            }
        }
    }, [data, page]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        setPage(1);
        setArticles([]);
        setSearchTerm(searchQuery);
        setHasMore(true); // Resetea el estado de `hasMore` al realizar una nueva búsqueda
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    if (isLoading && page === 1) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div className="not-found-art">Error: No se pudo obtener los datos</div>;
    }

    return (
        <div className="articles-data-container">
            <div className="logo"><img src="/ikm.png" alt="Logo" /></div>
            <h1 className="art">Artículos:</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    onChange={handleSearchInputChange}
                    onKeyDown={handleKeyPress}
                    className="search-bar"
                    value={searchQuery}
                />
                <button onClick={handleSearch} className="search-button">
                    Buscar
                </button>
            </div>
            <div className="articles-grid">
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div
                            key={article.id}
                            className="article-card"
                            onClick={() => navigate(`/articles/${article.id}`)}
                        >
                            <h2 className="title">{article.title}</h2>
                            <h4 className="abstract">{article.abstract}</h4>
                            {article.image && <img src={article.image} alt={article.title} className="article-image" />}
                        </div>
                    ))
                ) : (
                    <p>No hay artículos disponibles.</p>
                )}
            </div>
            {hasMore && !isLoading && (
                <button onClick={handleLoadMore} className="load-more-button">
                    Cargar más
                </button>
            )}
        </div>
    );
};

export default Articles;
