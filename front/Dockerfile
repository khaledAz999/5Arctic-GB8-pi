FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
#clean install
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/pi /usr/share/nginx/html

#VOLUME /app/uploads

EXPOSE 80
