FROM node:22-slim

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY . .

RUN npx tsc

EXPOSE 7860

CMD ["node", "dist/index.js"]
