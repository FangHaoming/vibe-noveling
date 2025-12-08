# 前端 Dockerfile
# 多阶段构建：构建阶段 + 生产阶段

# 构建阶段
FROM node:20-alpine AS builder

# 安装 yarn
RUN corepack enable && corepack prepare yarn@stable --activate

WORKDIR /app

# 复制 package 文件
COPY package.json ./

# 复制 yarn.lock（如果存在）
COPY yarn.lock* ./

# 安装依赖（包括 devDependencies，因为构建需要 vite）
# 使用 --production=false 确保 devDependencies 也被安装
RUN if [ -f yarn.lock ]; then \
      yarn install --frozen-lockfile --production=false; \
    else \
      yarn install --production=false; \
    fi

# 验证依赖安装
RUN echo "=== Checking node_modules ===" && \
    ls -la node_modules/ | head -5 && \
    echo "=== Checking for vite ===" && \
    (test -f node_modules/.bin/vite && echo "✅ vite found at node_modules/.bin/vite") || \
    (test -f node_modules/vite/bin/vite.js && echo "✅ vite found at node_modules/vite/bin/vite.js") || \
    (echo "❌ vite not found, listing node_modules/.bin:" && ls -la node_modules/.bin/ 2>/dev/null | head -10 || echo "node_modules/.bin does not exist")

# 复制所有文件（包括配置文件）
COPY . .

# 显示当前 package.json 中的 build 脚本（用于调试）
RUN echo "=== package.json build script ===" && cat package.json | grep -A 1 '"build"'

# 构建应用
# 使用 npx 直接调用 vite，避免 yarn 脚本解析问题
RUN npx vite build

# 生产阶段
FROM nginx:alpine

# 复制构建产物到 nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]

