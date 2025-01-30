FROM nginx:latest
COPY dist/nms-cinemas-frontend /usr/share/nginx/html
EXPOSE 80
