# Build React app
FROM node:18-alpine as build

ARG VITE_API_URL="https://tiketin.dta32.my.id/api"
ENV VITE_API_URL=${VITE_API_URL}

WORKDIR /app

COPY package.json package-lock.json /app
RUN npm install
COPY . /app
RUN npm run build

# Serve using Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]