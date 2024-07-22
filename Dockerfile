FROM node:18 as build-env
ARG PORT=3001
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --prefer-offline --no-audit --no-fund
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs18-debian11

WORKDIR /usr/src/app
COPY --from=build-env /usr/src/app/dist ./dist
COPY --from=build-env /usr/src/app/node_modules ./node_modules
EXPOSE $PORT
CMD ["dist/server.js"]
