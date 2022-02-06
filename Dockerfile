FROM public.ecr.aws/lambda/nodejs:12

# variables de entorno 
ENV NODE_ENV=dev
ENV DEBUG=true

# Crea un directorio y nos movemos ahí
WORKDIR /home/node/mutant_ml

# Copia el package.json
COPY package.json package-lock.json ./ 
RUN mkdir models
COPY models/ models
RUN mkdir api-handlers 
COPY api-handlers/ api-handlers

# Ejecuta npm install. Esto produce que se instalen todas las dependencias necesarias para correr la aplicación
RUN ["npm", "install"]

# Expone el puerto 3000 donde corre la aplicación
EXPOSE 3000

# Copia los fuentes dentro del container
COPY .env /home/node/mutant_ml/
COPY serverless.yml /home/node/mutant_ml/

# Le da permisos al usuario node para escribir en /home/node/mutant_ml
#RUN chown -R node:users /home/node/

# Habilita el usuario node. Por defecto, los containers corren los comandos con el usuario root
#USER node

# Comando por defecto sino se provee uno al hacer docker run El comando corre el servicio
CMD [ "ping.handler" ]
#CMD [ "serverless", "offline", "start" ]

# LISTO! Para construir la imagen docker build -t <nombre_de_la_imagen> . Para correr el container
# docker run -p 3000:3000 --name <nombre_container> --user node <nombre_de_la_imagen>
# docker run -p 3000:3000 --name m1  mu