# stage 1: install dependencies and build the app
FROM node:12.2.0-alpine as build

WORKDIR /react-dash

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./package.json
RUN npm install

ARG REACT_APP_ENV
ARG REACT_APP_DOMAIN_PROD
ARG REACT_APP_DOMAIN_STAG
ARG REACT_APP_DOMAIN_DEV

COPY . .
# EXPOSE 3000
# RUN npm run build
CMD ["npm", "start"]

# stage 2: copy the built app and run the nginx server
FROM nginx:1.16.0-alpine
COPY --from=build /react-dash/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]