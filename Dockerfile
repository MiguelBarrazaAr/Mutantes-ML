FROM node:12

#variables de entorno 
ENV NODE_ENV=development
ENV PORT=3000
ENV DEBUG=true

# Crea un directorio y nos movemos ahí
WORKDIR /home/node/mutant_ml

# Copia el package.json
COPY package.json ./ 
RUN mkdir src 
COPY src/ src

# Ejecuta npm install. Esto produce que se instalen todas las dependencias necesarias para correr la aplicación
RUN ["npm", "install"]

# Expone el puerto 3000 donde corre la aplicación
EXPOSE 3000

# Copia los fuentes dentro del container
COPY server.js /home/node/mutant_ml/

# al hacer docker run El comando corre el servicio
CMD [ "node", "server" ]

# Para construir la imagen docker build -t <nombre_de_la_imagen> .
# Para correr el container
# docker run -p 3000:3000 --name <nombre_container> <nombre_de_la_imagen>
