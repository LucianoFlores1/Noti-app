import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import './Profile.css';


function Profile() {
    const [userData, setUserData] = useState(null);
    const [isloading, setIsLoading] = useState(null);
    const [iserror, setIsError] = useState(null);

    const { token, user__id } = useAuth("state");
    const { logout } = useAuth("actions");


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


    return(
        <div>
            {userData ? (
                <div className="container">
                    <h2 className="title is-2">Datos de usuario</h2>
                    <form className="formul">
                        <h2 className="subtitle is-3">Bienvenido <span className="title is-3">{userData.first_name}</span></h2>
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
                        <label>ID de usuario: </label>
                        <input 
                            type="text"
                            className="input is-info is-rounded" readOnly
                            disabled={true}
                            value={userData.user__id}
                         />
                    </form>
                    <p className="subtitle is-6"> {userData.bio || "Biografia no disponible"} </p>
                    <div className="columns">
                        <a className="button-irInicio2" href="/">Ir a Inicio</a>
                        <button className="button-irInicio" onClick={()=>logout()}>Cerrar sesion</button>
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