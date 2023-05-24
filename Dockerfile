FROM node:10 AS builder
COPY ./frontend /frontend

# build frontend
WORKDIR /frontend
RUN npm install
RUN npm run build

FROM node:12 AS product
COPY ./backend /app
COPY --from=builder /frontend/build /app/client

# build backend
WORKDIR /app
RUN npm install

RUN sed -i s/deb.debian.org/archive.debian.org/g /etc/apt/sources.list
RUN sed -i 's|security.debian.org|archive.debian.org/|g' /etc/apt/sources.list
RUN sed -i '/stretch-updates/d' /etc/apt/sources.list

RUN apt update
RUN apt install -y ghostscript graphicsmagick

WORKDIR /app
EXPOSE 4000
CMD ["npx", "ts-node", "/app/index.ts"]