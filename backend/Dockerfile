# 后端 Dockerfile
FROM node:20-alpine

WORKDIR /app

# 安装 wget（用于健康检查）和 yarn
RUN apk add --no-cache wget && \
    corepack enable && \
    corepack prepare yarn@stable --activate

# 复制 package 文件
COPY package.json ./

# 复制 yarn.lock（如果存在）
COPY yarn.lock* ./

# 安装所有依赖（包括 devDependencies，用于构建）
# 如果有 yarn.lock 则使用 --frozen-lockfile
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; else yarn install; fi

# 复制源代码
COPY . .

# 构建 TypeScript
RUN yarn build

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["yarn", "start"]

