FROM node:18-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.24.0-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]