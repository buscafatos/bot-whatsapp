FROM node:18

RUN apt-get update && apt-get install libnss3 chromium -y

WORKDIR /app

COPY package.json yarn.lock ./
COPY dist ./dist

RUN yarn install --prod

ENTRYPOINT [ "node", "dist/app.js" ]
