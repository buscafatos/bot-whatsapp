FROM node:18-alpine

RUN apk add --no-cache nss chromium

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

RUN rm -rf src/

ENTRYPOINT [ "node", "dist/app.js" ]
