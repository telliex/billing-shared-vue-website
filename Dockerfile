FROM node:latest  as build-stage
ENV NODE_ENV develop
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM httpd:2.4 as production-stage
COPY --from=build-stage /usr/src/app/dist /usr/local/apache2/htdocs/
EXPOSE 80
CMD ["httpd-foreground"]
