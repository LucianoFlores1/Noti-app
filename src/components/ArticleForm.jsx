import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./ArticleForm.css"

export default function ArticleForm() {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [articleData, setArticleData] = useState({ title: "", content: "", abstract: "" });
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const state = useAuth("state");
    let token = state.token;
    console.log("state", state);
    console.log(token);


    const fetchCategories = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error al realizar la petición al endpoint");
            }
            const data = await response.json();
            if (data.next) {
                setCategories((prevCategories) => [
                    ...prevCategories,
                    ...data.results,
                ]);
                fetchCategories(data.next);
            } else {

                setCategories((prevCategories) => [...prevCategories, ...data.results]);
            }
        } catch (error) {
            console.error("Error fetching categories", error);
        } finally {
            setLoadingCategories(false);
        }
    };

    useEffect(() => {
        setLoadingCategories(true);
        fetchCategories(`${import.meta.env.VITE_API_BASE_URL}infosphere/categories`);
    }, []);

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

        if (!submitting && !loadingCategories) {
            setSubmitting(true);

            // Crear una instancia de FormData
            const formData = new FormData();
            formData.append('title', articleData.title);
            formData.append('content', articleData.content);
            formData.append('abstract', articleData.abstract); // Añadir el abstract

            // Agregar categorías seleccionadas
            selectedCategories.forEach((category) => {
                formData.append('categories', category.id);
            });

            // Agregar la imagen si es que se seleccionó una
            if (imageFile) {
                formData.append('image', imageFile);
            }

            fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error al realizar la petición al endpoint");
                    }
                    return response.json();
                })
                .then((article) => {
                    selectedCategories.forEach((category) => {
                        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/article-categories/`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Token ${token}`,
                            },
                            body: JSON.stringify({
                                article: article.id,
                                category: category.id,
                            }),
                        });
                    });
                })
                .catch((error) => {
                    console.error("Error creating article", error);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };

    return (
        <form className="conteiner-form" onSubmit={handleSubmit}>
            <div>
                <label className="label">Título</label>
                <div>
                    <input
                        className="input"
                        type="text"
                        name="title"
                        value={articleData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
            <div>
                <label className="label">Copete</label>
                <div>
                    <textarea
                        className="textarea-abstract"
                        name="abstract"
                        value={articleData.abstract}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
            <div>
                <label className="label">Contenido</label>
                <div>
                    <textarea
                        className="textarea"
                        type="text"
                        name="content"
                        value={articleData.content}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
            <div>
                <label className="label">Imagen</label>
                <div>
                    <input
                        className="input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </div>
            </div>
            <div>
                <label className="label">Categorías</label>
                <div className="conteiner-categories">
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
                <div>
                    <button
                        className="create-button"
                        type="submit"
                        disabled={submitting || loadingCategories}
                    >
                        Crear Artículo
                    </button>
                </div>
            </div>
        </form>
    );
}
