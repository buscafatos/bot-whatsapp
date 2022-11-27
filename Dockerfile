FROM node:18

RUN apt-get update && apt-get install libnss3 chromium -y

WORKDIR /app

COPY . .

RUN yarn install --prod
RUN yarn build

ENTRYPOINT [ "node", "dist/app.js" ]
