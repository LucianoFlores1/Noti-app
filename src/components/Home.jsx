import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import './Home.css'

const Home = () => {
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [hasMore, setHasMore] = useState(true);

    const { data, isLoading, isError } = useFetch(`https://sandbox.academiadevelopers.com/infosphere/articles?page=${page}&title=${searchTerm}`, {
        headers: {
            'accept': 'application/json',
            'X-CSRFToken': 'HvuEjtfDJSNLRDq4fLdLk9zmNZGCtWIGb1W3b6q2iABexBDvLyv4rINRtQBPzg3q',
        },
    });

    useEffect(() => {
        if (data && data.results) {
            setArticles(prevArticles => (page === 1 ? data.results : [...prevArticles, ...data.results]));

            if (data.results.length < 10) {
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
        setHasMore(true);
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

    const dateExist = (date) => {
        const parsedDate = new Date(date);
        return isNaN(parsedDate.getTime()) ? "Sin especificar" : parsedDate.toLocaleDateString();
    }

    const stripHTMLTags = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    };

    if (isLoading && page === 1) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div className="not-found-art">Error: No hay más noticias disponibles</div>;
    }

    return (
        <div className="articles-data-container">
            <div className="logo"><img src="/ikm.png" alt="Logo" /></div>
            <h1>Home:</h1>
            <div className="aestetic-container">
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
                <h5>Noticias del día</h5>
                {articles.length > 0 ? (
                    <div>
                        {articles.map((article) => (
                            <div key={article.id} className="article-card-home">
                                <h2 className="title">{stripHTMLTags(article.title)}</h2>
                                <h4 className="abstract">{stripHTMLTags(article.abstract)}</h4>
                                <p>{stripHTMLTags(article.content)}</p>
                                {article.image && <img src={article.image} alt="No" className="article-image" />}
                                <div className="article-footer">
                                    <p><strong>Author:</strong> {stripHTMLTags(article.author)}</p>
                                    <p><strong>Views:</strong> {article.view_count}</p>
                                    <p className="date"><strong>Fecha de publicación:</strong> {dateExist(article.created_at)}</p>
                                </div>
                            </div>
                        ))}
                        {hasMore && !isLoading && (
                            <button onClick={handleLoadMore} className="load-more-button">
                                Cargar más
                            </button>
                        )}
                    </div>
                ) : (
                    <p>No hay artículos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
