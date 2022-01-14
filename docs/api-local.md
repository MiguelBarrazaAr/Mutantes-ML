# deploy api local

Para ahcer pruebas con la api localmente se debe instalar la siguiente librería con este comando:

```
npm install --save-dev serverless-offline
```

luego para levantar la api se debe poner el comando:

```
serverless offline start
```

Quedará levantada en el puerto 3000 en el host 'localhost'  

## correr test de api:

para correr las pruebas de api se debe tener python 3.9  instalado  y luego escribir el siguiente comando para instalar la librería:

```
pip install requests
```

y luego se corre los test con el comando:

```
python run_api_test.py
```

se pueden ver los test dentro del archivo: test/test_api.py  

nota: se decidió hacer este tipo de pruebas con python porque resulta mas accesible la lectura por consola. Con Javascript cuando hay un error la lectura no es fácil de interpretar por la cantidad de contenido que se arroja por consola.

[Volver](../README.md)