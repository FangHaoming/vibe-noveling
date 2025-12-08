# 后端 Dockerfile
FROM node:20-alpine

WORKDIR /app

# 安装 wget（用于健康检查）并启用 corepack
RUN apk add --no-cache wget && corepack enable

# 复制依赖文件
COPY package.json yarn.lock* ./

# 安装依赖
RUN yarn install

# 复制源代码
COPY . .

# 构建 TypeScript
RUN yarn build

EXPOSE 3001

CMD ["yarn", "start"]
