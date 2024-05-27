# Etapa de compilación
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copia los archivos de configuración de npm
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación Angular
RUN npm run build --prod

# Etapa de ejecución
FROM node:16 AS run

# Set the working directory
WORKDIR /app

# Copia los archivos construidos desde la etapa anterior
COPY --from=build /app /app

# Exponer el puerto 4200
EXPOSE 4200

# Comando para ejecutar la aplicación Angular
CMD ["npm", "start"]
