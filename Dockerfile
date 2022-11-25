FROM node:18

WORKDIR /app

COPY package.json .

RUN yarn install --prod

COPY dist ./dist

ENTRYPOINT [ "node", "dist/app.js" ]
