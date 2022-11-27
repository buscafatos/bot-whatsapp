FROM node:18-alpine

RUN apk add --no-cache nss chromium

WORKDIR /app

COPY . .

RUN yarn install --prod
RUN yarn build

RUN rm -rf src/

ENTRYPOINT [ "node", "dist/app.js" ]
