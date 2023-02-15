# build stage
FROM node:18 as build-stage
RUN npm install -g pnpm
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
