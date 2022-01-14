# deploy en AWS

Se debe activar un usuario en la cuenta de AWS y con el token obtenido seguir los siguientes pasos.  
crear una carpeta:

```
.aws
```

dentro de la ruta del usuario principal de windows y crear un archivo:

```
credentials
```

con el siguiente código:

```
# default for local development
[default]
aws_access_key_id = EscribirClaveToken
aws_secret_access_key = PonerAquiClaveSecretaDelToken
# serverless-agent
[serverless]
aws_access_key_id = EscribirClaveToken
aws_secret_access_key=PonerAquiClaveSecretaDelToken
```

con esto ya tenemos el token activado para deployar en AWS.
Utilizaremos el siguiente comando.

```
serverless deploy --aws-profile serverless
```

Con esto se despliega las lambdas y la base de datos dynamodb.  

## consulta a la api:

ya con python instalado y la librería request puedo utilizar el siguiente código para pegarle a la api:

```
import requests
# poner la url al endpoint de la api
url= "https://wgtofy782c.execute-api.us-east-1.amazonaws.com/dev/mutant"
data = {"dna": ["CGGGCC","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }

print(requests.post(url, json=data))
```

por no poder usar postman (por accesibilidad) utilizo python para consultar a la api y automatizar los test.

## Rendimiento

en el serverless.yml se decidió poner:

```
ReadCapacityUnits: 10
WriteCapacityUnits: 500
```

Ya que las lecturas son pocas, se consulta menos al stats, y se escribe más a la base de datos soportando la cantidad de consultas que se pide.  
según esta documentación:  
[https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/ProvisionedThroughput.html#ProvisionedThroughput.CapacityUnits.InitialSettings](https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/ProvisionedThroughput.html#ProvisionedThroughput.CapacityUnits.InitialSettings)
y según la lectura de capacidad la capa de un servicio solo soporta hasta 1000 unidades de escritura. Puse 500 para tener un punto medio, si se necesita desplegar mas se pone otras instancias y un balanceador de carga. En este caso solo se usó una capa gratuita.

[Volver](../README.md)