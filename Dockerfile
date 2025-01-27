# Usa una imagen base de Node.js 20
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Inicializa el proyecto con npm (esto creará el package.json)
RUN npm init -y

# Instala las dependencias necesarias, en este caso express
RUN npm install express

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Expone el puerto 3000 para que la aplicación sea accesible
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]