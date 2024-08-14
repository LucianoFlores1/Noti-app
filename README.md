# 📰 Noti-App 

![ikm](https://github.com/user-attachments/assets/6e7c508a-0912-4cb7-b37a-77ed44677053)


## ⭐ Introducción

Noti-App es una aplicación web de noticias serias para gente seria, desarrollada con ReactJS, con el fin de demostrar nuestros conocimientos adquiridos en el cursado de la materia Programación III.

## 🙋‍♂️ Integrantes 

🗿 Flores Luciano

🗿 Salto Ignacio

## 🎯 Objetivos 

Nuestro objetivo es desarrollar una página de noticias basados en la informacion otorgada por la API de la academia CIMNE-IBER, logrando implementar los requisitos mínimos solicitados.

## 📝 Instalación

Clonar el repositorio de forma local.

```shell
git clone https://github.com/LucianoFlores1/Noti-app.git
```

Instalación del módulo npm.

```shell
npm create vite@latest
```

```shell
npm install 
```

Ejecutar la aplicación a través del comando

```shell
npm run dev 
```

## 🗂️ Estructura del proyecto 

News_0.1

 ├───node_modules
 
 ├───public
 
 ├───src/
 
 │   ├───assets/
 
 │   ├───components/
 
 │   ├───contexts/
 
 │   ├───hooks/
 
 │   ├───routes/
 
 └───index.css   
 
 └───main.jsx
 
└───.env

└───index.html

└───package-lock.json

└───package.json

└───vite.config.json

└───README.md


## 🟢 Consumo de la API 

 Se solicitan peticiones para poder consumir los endpoints de la sección InfoSphere, en donde se obtienen los diversos datos sobre los artículos, categorías, etc.

## 🟢 Enrutamiento 

 Se trabajó este proyecto utilizando las funciones de enrutamiento y protección adecuadas según se requerían. (Router, Layout, ProtectedRoute).

### 💻 Renderizado del proyecto 
  
  /Home: Sección que muestra un mensaje de bienvenida, una seccion con las noticias ordenadas en forma de cascada con una imágen, su respectivo titulo y el cuerpo de la noticia, una barra para desplazarse por las  
  secciones y un Footer correspondiente. La pagina tambien cuenta con un boton para cargar mas noticias.
  
  /Login: Sección que permite al usuario iniciar sesión con sus credenciales correspondientes.
  
  /Articles: Sección en donde muestra las noticias en forma de miniaturas. Cuando el usuario clickea sobre uno de ellos, se despliega la noticia completa, otorgando una visión más completa de la información.
  Cuenta con una barra de búsqueda para que el usuario pueda encontrar noticias de manera más precisa.

  /articles/id: Una seccion que te dirige hacia la noticia con el ID indicado al hacer click en alguna noticia, por ejemplo 'articles/91'.

  Boton 'Fuera': Boton que elimina el token de usuario del almacenamiento local, permite el delogueo de la app.
  
  La sección /home, es la unica en la que no se implementa una ruta protegida, a comparación de las demás.

## ⚙️ Testing 

 Se realizaron diversas pruebas de rendimiento.
 
 Barra de búsqueda para los artículos.

## 📚 Documentación

 Se logró documentar de manera técnica el proyecto.
 
 Despliegue de la aplicación.
