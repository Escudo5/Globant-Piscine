FROM nginx:alpine

# 1. Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 2.  Crear el directorio y copiar archivos (para que existan cuando se monten volúmenes)
WORKDIR /usr/share/nginx/html

# 3. Copiar archivos base (serán sobrescritos por volúmenes en desarrollo)
COPY index.html ./
COPY script.js ./
COPY styles.css ./

# 4. Dar permisos adecuados
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]