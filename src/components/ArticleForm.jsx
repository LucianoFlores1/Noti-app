import { useState, useEffect } from "react";
import { useFetchCategories } from "../hooks/fetchCategories";
import "./ArticleForm.css"

const ArticleForm = () => {
    const { categories, loading, error } = useFetchCategories();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [articleData, setArticleData] = useState({ title: "", content: "" });

    const handleInputChange = (event) => {
        setArticleData({
            ...articleData,
            [event.target.name]: event.target.value,
        });
    };

    const handleCategoryChange = (event) => {
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        const updatedSelectedCategories = categories.filter((cat) =>
            selectedOptions.includes(String(cat.id))
        );
        setSelectedCategories(updatedSelectedCategories);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para enviar el formulario, por ejemplo, haciendo una petición POST
        console.log("Artículo creado:", articleData, selectedCategories);
    };

    if (loading) return <p>Cargando categorías...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div>
                <label>Título</label>
                <div>
                    <input
                        className="input"
                        type="text"
                        name="title"
                        value={articleData.title}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div>
                <label>Contenido</label>
                <div>
                    <textarea
                        className="textarea"
                        name="content"
                        value={articleData.content}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div>
                <label>Categorías</label>
                <div>
                    <select
                        multiple
                        size="5"
                        value={selectedCategories.map((cat) => cat.id)}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <button className="create-button" type="submit">
                    Crear artículo
                </button>
            </div>
        </form>
    );
};

export default ArticleForm;