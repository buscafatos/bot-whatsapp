#Compilador da aplicação
FROM node:18 as builder

WORKDIR /workspace

#Copia todos os fontes
COPY . .

#Instala as dependências de desenvolvimento e transpila o código
RUN yarn install
RUN yarn build


#Imagem final de produção
FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache nss chromium

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

#Copia os arquivos compilados e necessários
COPY --from=builder /workspace/dist ./dist
COPY package.json yarn.lock ./

#Instala somente as dependências de produção
RUN yarn install --production

ENTRYPOINT [ "node", "dist/app.js" ]
