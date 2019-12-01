# stage 1: install dependencies and build the app
FROM node:12.2.0-alpine as build

ARG REACT_APP_ENV
ARG REACT_APP_DOMAIN_PROD
ARG REACT_APP_DOMAIN_STAG
ARG REACT_APP_DOMAIN_DEV

WORKDIR /react-dash

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./package.json
RUN npm install

COPY . .
RUN npm run build

# stage 2: copy the built app and run the nginx server
FROM nginx:1.16.0-alpine
COPY --from=build /react-dash/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]