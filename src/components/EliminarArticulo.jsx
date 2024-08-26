import React, { useState } from 'react';
import Swal from 'sweetalert2';


function EliminarArt({ id, onDeleteSuccess }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que quieres eliminar este artículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    const token = localStorage.getItem('authToken');
    console.log("Token", token);

    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Debe iniciar sesión para eliminar un artículo.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      setIsDeleting(false);
      return;
    }

    try {
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`,
        {
          method: 'DELETE',
          headers: {
            'accept' : 'application/json' ,
            'Authorization' : `Bearer ${token}`,
            'X-CSRFToken': 'Yo0AMhNgyr55wRFVDC4enFmjq0uHZYllvxgVDahVBkM8wdJTDy7jdRJK3YNp13fZ',
            
          },
          credentials: 'include',
        }
      );

      if (response.ok) {
        Swal.fire({
          title: 'Eliminado',
          text: 'La canción ha sido eliminada con éxito.',
          icon: 'success',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        }).then(() => {
          if (onDeleteSuccess) {
            onDeleteSuccess();
          }
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error',
          text: errorData.message || 'Error al eliminar el artículo.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
      }
    } catch (e) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al intentar eliminar el artículo.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Eliminando...' : 'Eliminar Articulo'}<i className="fa-solid fa-trash"></i>
      </button>
      {error && <div className="error-message">{error}</div>}
    </>
  );
}

export default EliminarArt;