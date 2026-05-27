FROM node:22-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 7860

CMD ["node", "--import", "tsx", "src/index.ts"]
