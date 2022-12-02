#Build stage
FROM node:19 as builder

WORKDIR /workspace

COPY . .

RUN yarn install && yarn build


#Run stage
FROM node:19-alpine

WORKDIR /app

RUN apk add --no-cache nss chromium

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package.json yarn.lock ./

RUN yarn install --production

COPY --from=builder /workspace/dist ./dist

ENTRYPOINT [ "node", "dist/app.js" ]
