# Desafío de Mercado Libre

- Autor: Miguel Barraza
- Fecha de la última actualización: 14/01/2022
- Tecnologías: Javascript, serverless, AWS, DynamoDB. Python para otros tests.
- documentación en: [https://miguelbarrazaar.github.io/Mutantes-ML/](https://miguelbarrazaar.github.io/Mutantes-ML/)

## Documentación

- [Desafío y tecnologías](docs/desafio.md)
- [deploy local y tests](docs/deploy.md)
- [api local](docs/api-local.md)
- [deploy en AWS](docs/deploy-aws.md)
- [Problemas en accesibilidad](docs/issues-accessibility.md)
- [conclusiones](docs/conclusions.md)
- [cambios](docs/update.md)


## Objetivo

Detectar si  una matriz de ADN corresponde al de un humano o al de un mutante. 

Una matriz de ADN es un array de string de 6 caracteres por fila y de 6 columnas. Solo puede tener una de las siguientes letras en cada posición: "A", "C", "G" o "T".  
Aquí un ejemplo de ADN:  

````
ATGCGA
CAGTGC
TTATGT
AGAAGG
CCCCTA
TCACTG
````

Se dice que el ADN es de un mutante si posee más de una secuencia de 4 caracteres iguales.  
En este ejemplo decimos que es mutante porque encontramos 4 letras iguales en las siguientes secuencias:  

- a1, b2, c3, d4. letra "A".
- e1, e2, e3, e4. Letra "G".
- a5, b5, c5, d5. Letra "C".

Tomando como notación las filas como números (comenzando en 1)  
y las columnas como letras (iniciando en a).

Se puede leer la [consigna](consigna.pdf) completa  clickeando en el enlace.

##  Setup requerido:

Se requiere el siguiente setup configurado en el equipo para correr el sistema.

- node v14.16.0
- npm 6.14.11
- Python 3.9.6

Debería soportarse si se corre con una versión superior. Fue probado con este setup.


## Aplicación

La aplicación consta de tres servicios:

### 1. ping

Si se desea monitorizar si el servicio está operativo, el api responde a el ping.

Ejecutar un ```GET``` al siguiente endpoint:  
ping: mutant-ml-api-dev-ping  
[http://localhost:3000/dev/ping/](http://localhost:3000/dev/ping/)  
[https://wgtofy782c.execute-api.us-east-1.amazonaws.com/dev/ping](https://wgtofy782c.execute-api.us-east-1.amazonaws.com/dev/ping)  
Esto devolverá:  
```200 OK``` body: pong  

### 2. mutant

Verificación de un ADN dado.

Ejecutar un ```POST``` al siguiente endpoint:  
mutant: mutant-ml-api-dev-mutant  
[http://localhost:3000/dev/mutant/](http://localhost:3000/dev/mutant/)  
[https://wgtofy782c.execute-api.us-east-1.amazonaws.com/dev/mutant](https://wgtofy782c.execute-api.us-east-1.amazonaws.com/dev/mutant)
con el siguiente body:
```
{
  "dna": ["CGGGCC","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] 
}
```
Esto  devuelve  los siguientes status:

```200 OK``` Para un ADN mutante.

```403 FORBIDDEN``` Para un ADN humano.

```400 BadRequest``` Para un ADN incorrecto (no tiene la cantidad de filas o columnas  correctas o no tiene las letras correctas)

### 3. Stats - Estadísticas:

Mostrará las estadísticas de las consultas a la api.

Ejecutar un ```GET``` al siguiente endpoint:  
stats: mutant-ml-api-dev-stats  
[http://localhost:3000/dev/stats/](http://localhost:3000/dev/stats/)  
[https://wgtofy782c.execute-api.us-east-1.amazonaws.com/dev/stats](https://wgtofy782c.execute-api.us-east-1.amazonaws.com/dev/stats)  
Esto devolverá lo  siguiente:  
```200 OK```  
Con el siguiente body response:  
```
{
  "count_mutant_dna":40,
  "count_human_dna":100,
  "ratio":0.4
}
```

no implementado. porque no se logró conectar con la base de datos dynamodb.