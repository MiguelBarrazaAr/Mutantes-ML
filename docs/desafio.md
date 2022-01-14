# Desafío:

La aplicación fue desarrollada en JavaScript, Utilizando el framework serverless para desacoplarse de un servidor, permitiendo deployear  en cualquier servicio cloud. En la máquina de desarollo se utilizó node 14.16.0.  
nota: se debe mejorar el código utilizando la   base de datos con el patrón repositorio ((repository pattern) para crear la capa de persistencia y de esa forma poderla cambiar si se utiliza otro servicio.  
Se utilizó las siguientes librerías:
- mocha: para desarrollar los tests en Javascript
- serverless: para utilizar el framework serverless con node.
- aws-sdk: para utilizar   AWS.
- serverless-offline: para probar la api de forma local.
- dotenv: para cargar la configuración en un .env
- requests: para test con python.

La base de datos elegida fue: dynamodb, es no relacional y es parte de los servicios de AWS.

Para los test se utilizó mocha en javascript y unittest con python.

Se decidió desplegarlo con AWS porque era el cloud que los conocidos utilizaban para si tenía que pedir ayuda tenía más referencias.

[Volver](../README.md)