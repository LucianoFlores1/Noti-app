import { useState, useEffect } from "react";


const ArticleForm = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [articleData, setArticleData] = useState({ title: "", content: "" });

    useEffect(() => {

        fetch(`https://sandbox.academiadevelopers.com/infosphere/categories/`).then((response) => {
            if (!response.ok) {
                throw new Error("Error en la peticion");
            }
            return response.json();
        })
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error al obtener las categorias", error);
            })
    }, [])

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

    return (
        <form className="form">
            <div>
                <label>Titulo</label>
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
                        type="text"
                        name="content"
                        value={articleData.content}
                        onChange={handleInputChange} />
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
                <div>
                    <button className="create-button" type="submit">
                        Crear artículo
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ArticleForm;