# 前端 Dockerfile
# 多阶段构建：构建阶段 + 生产阶段

# 构建阶段
FROM node:20-alpine AS builder

# 启用 corepack (Node 20 内置，自动提供 yarn)
RUN corepack enable

WORKDIR /app

# 复制依赖文件
COPY package.json yarn.lock* ./

# 安装依赖
RUN yarn install

# 复制所有源文件
COPY . .

# 构建应用
RUN yarn build

# 生产阶段
FROM nginx:alpine

# 复制构建产物到 nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
