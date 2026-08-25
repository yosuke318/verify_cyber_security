FROM node:21

WORKDIR /src/app

# 依存関係のインストール（package.json が変わらない限りキャッシュが効く）
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
