FROM node:22-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 7860

CMD ["node", "--import", "tsx", "src/index.ts"]
