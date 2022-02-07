# Actualización:

  Se pidió agregar el proyecto en una imagen docker, debido a que las versiones como:  
[amaysim/serverless](https://hub.docker.com/r/amaysim/serverless)  
no funcionaba correctamente y generar una versión docker que funcione con serverless offline iva a llevar mas tiempo se decidió re estructurarlo. la versión anterior quedó en el branch: "serverless"

En el branch: "main" se generó una nueva versión con express y se hizo el dockerfile. para levantar esta versión poner el siguiente comando:  

Para construir la imagen:  

    docker build -t <nombre_de_la_imagen> .
    
Para correr el container  
    docker run -p 3000:3000 --name <nombre_container> <nombre_de_la_imagen>

y queda la api corriendo en el puerto 3000.

Se utilizó la base de datos: NeDB que es local con JavaScript para las pruebas de api, el controlador está en:  
src/repo/neDBController.js

Desde el archivo:  
src/db.js
se pueden agregar otros contorladores que pueden ser invocado cambiando la variable de entorno "STAGE" que se encuentra en el archivo .env

[Volver](../README.md)