# build frontend
FROM node:10 AS builder
WORKDIR /frontend

COPY ./frontend/package.json package.json
COPY ./frontend/package-lock.json package-lock.json
RUN npm install

COPY ./frontend ./
RUN npm run build

# build backend
FROM node:12 AS product
WORKDIR /app

RUN sed -i s/deb.debian.org/archive.debian.org/g /etc/apt/sources.list
RUN sed -i 's|security.debian.org|archive.debian.org/|g' /etc/apt/sources.list
RUN sed -i '/stretch-updates/d' /etc/apt/sources.list
RUN apt update
RUN apt install -y ghostscript graphicsmagick

COPY ./backend/package.json package.json
COPY ./backend/package-lock.json package-lock.json
RUN npm install

COPY ./backend ./
COPY --from=builder /frontend/build ./client

EXPOSE 4000
CMD ["npx", "ts-node", "/app/index.ts"]
