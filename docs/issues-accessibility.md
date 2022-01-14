# Accesibilidad

Me encontré con muchos problemas de accesibilidad en el camino. Alguno de ellos fueron.

## Testing

el reporte de mocha o de otros framework javascript es poco claro en sus reportes de consola, cuando explota tira mucha información y no se puede personalizar. En eso python es mas claro, por eso para la api se utilizó python para testear.  
Postman no es del todo accesible, para las pruebas utilicé python y curl por consola.

## AWS

La interface de AWS no cumple con las pautas [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/):

- tiene menú sin etiquetados
- botones sin descripción
- no tiene miga de pan para saber donde estás
- no pone encabezados para describir zonas de la web
- no usa semántica html 5
- no es operable con ayuda al usuario
- algunos login pide captcha sin posibilidad de activar audio.

Me contacté con ellos por twitter y me mandaron a un chat online.  
En el chat los hablantes español no pueden responder, solo me pasan en inglés.  
Y en el soporte me dicen que anotarán el problema para solucionarlo.

Hay funciones como crear usuario que hay botones que el teclado no llega, un amigo hizo click con mouse utilizando manejo remoto vía zoom para ayudarme a activar mi token.

Y no pude ver los errores del log cuando tenía problemas con lambda, lo hizo un amigo para ayudarme.

En dynamodb aveces no me pone el foco para moverme, examiné como usar la cli para ver por consola la tabla en dynamodb. con el comando:

```
aws dynamodb scan --region us-east-1 --table-name mutant-ml-api-dev-mutants
```

pude ver mi tabla mutante y ver si agregaba o no los datos. por twitter me ayudaron a encontrar este comando.

## herramientas

No puedo usar postman ni un debug de javascript por no ser accesible con lector de pantalla, mucho tuve que hacer poniendo console.log y usar liberrías en otro lenguaje para encontrar la solución más efectiva.

## Gracias

Gracias a las comunidades que republicaron mi twitter de ayuda, pude acceder estos días a ayuda para encontrar soluciones a estas dificultades de cloud, que la documentación es poco clara, y hay pocos ejemplos.

[Volver](../README.md)