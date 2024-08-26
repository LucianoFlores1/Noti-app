import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import './Profile.css';
import UpdateProfileForm from "./UpdateProfileForm";


function Profile() {
    const [userData, setUserData] = useState(null);
    const [isloading, setIsLoading] = useState(null);
    const [iserror, setIsError] = useState(null);
    const { token, user__id } = useAuth("state");
    const { logout } = useAuth("actions");
    const isValidImage = UpdateProfileForm.image && typeof UpdateProfileForm.image === 'string' && UpdateProfileForm.image.trim() !== '';


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data`,{
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if(!response.ok){
                    throw new Error("Falló al hacer fetch del usuario");
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                setIsError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    },[])

    const handleImageUpload = (image) => {
        setProfileImage(image);
    }

    console.log(userData);

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', options).format(date);
    }

    return(
        <div>
            {userData ? (
                <div className="container">
                    <h2 className="title is-2">Datos de usuario</h2>
                    <form className="formul">
                        <h2 className="subtitle is-3">Bienvenido <span className="title is-3">{userData.first_name}</span></h2>
                            {userData.image && (
                            <div className="profile-image">
                                <img
                                    src={`http://sandbox.academiadevelopers.com/${userData.image}`}
                                    alt="Imagen de perfil"
                                    className="profile-img"
                                />
                            </div>
                        )}
                        <label>Usuario: </label>
                        <input 
                            type="text"
                            className="input is-info is-rounded" readOnly
                            disabled={true}
                            value={userData.username}
                         />
                         <br />
                        <label>Nombre: </label>
                        <input 
                            type="text"
                            className="input is-info is-rounded" readOnly
                            disabled={true}
                            value={userData.first_name}
                         />
                         <br />
                        <label>Apellido: </label>
                        <input 
                            type="text"
                            className="input is-info is-rounded" readOnly
                            disabled={true}
                            value={userData.last_name}
                         />
                         <br />
                        <label>Email: </label>
                        <input 
                            type="email"
                            className="input is-info is-rounded" readOnly
                            disabled={true}
                            value={userData.email}
                         />
                         <br />
                        <label>Fecha de nacimiento: </label>
                        <input 
                            type="date"
                            className="input is-info is-rounded" readOnly
                            disabled={true}
                            value={userData.dob}
                         />
                         
                         
                         <p className="bio">
                         Mi Biografia:
                         <br />
                         <br />
                            <span className="bioSpan">
                                <br />
                                {userData.bio || "Biografia no disponible"}
                            </span>    
                        <br />
                        </p>
                        <p className="bio"> 
                            Creado el: {formatDate(userData.created_at)}
                        </p>
                        <p className="bio"> 
                            Ultima actualización : {formatDate(userData.updated_at)}
                        </p>
                    </form>
                    <br />
                    <div className="columns">
                        <a className="inicio" href="/">Ir a Inicio</a>
                        <br />
                        <a className="editar" href="/updateprofile/:{user__id}">Editar Perfil</a>
                        <br />
                        <button className="buttonLogout" onClick={()=>logout()}>Cerrar sesion</button>
                    </div>

                </div>

            ) : (
                <p>No se encontraron datos</p>
            )}
        </div>
    )

}


export default Profile;

//Comentario para commit
//Ultimos cambios

