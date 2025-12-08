# Docker 部署指南

本项目支持使用 Docker Compose 一键启动前端和后端服务。

> **注意**：本项目使用 **Yarn** 作为包管理器，而不是 npm。

## 🚀 快速开始

### 1. 准备环境变量

复制 `.env.example` 为 `.env` 并填写：

```bash
cp .env.example .env
```

编辑 `.env` 文件，设置 OpenAI API 密钥：

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4
```

### 2. 启动服务

```bash
docker-compose up -d
```

这将启动：
- **后端服务**：http://localhost:3001
- **前端服务**：http://localhost:3000

### 3. 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 4. 停止服务

```bash
docker-compose down
```

## 📋 常用命令

### 启动服务
```bash
# 后台启动
docker-compose up -d

# 前台启动（查看日志）
docker-compose up
```

### 停止服务
```bash
# 停止服务
docker-compose stop

# 停止并删除容器
docker-compose down

# 停止并删除容器、网络、卷
docker-compose down -v
```

### 重建服务
```bash
# 重新构建并启动
docker-compose up -d --build

# 强制重建（不使用缓存）
docker-compose build --no-cache
docker-compose up -d
```

### 查看服务状态
```bash
docker-compose ps
```

### 进入容器
```bash
# 进入后端容器
docker-compose exec backend sh

# 进入前端容器
docker-compose exec frontend sh
```

## 🔧 配置说明

### 端口配置

- **前端**：3000（映射到容器内的 80）
- **后端**：3001

如需修改端口，编辑 `docker-compose.yml`：

```yaml
services:
  frontend:
    ports:
      - "8080:80"  # 修改为 8080
  backend:
    ports:
      - "8081:3001"  # 修改为 8081
```

### 数据持久化

项目数据通过 volumes 挂载：

- `./prompts` → `/app/prompts` (只读)
- `./chapters` → `/app/chapters` (读写)
- `./database` → `/app/database` (读写)

确保这些目录存在，或 Docker Compose 会自动创建。

### 环境变量

在 `.env` 文件中配置：

- `OPENAI_API_KEY` - OpenAI API 密钥（必需）
- `OPENAI_MODEL` - 使用的模型（默认：gpt-4）
- `PORT` - 后端端口（默认：3001）

## 🐛 故障排除

### 1. 端口被占用

如果端口 3000 或 3001 已被占用：

```bash
# 查看端口占用
lsof -i :3000
lsof -i :3001

# 修改 docker-compose.yml 中的端口映射
```

### 2. 构建失败

如果遇到构建错误（如 `tsc` 相关错误或显示 TypeScript 编译器帮助信息），可能是 Docker 缓存了旧文件：

```bash
# 方法 1: 使用清理脚本（推荐，只清理当前项目）
./docker-build.sh

# 方法 2: 手动清理并重新构建（只清理当前项目）
docker-compose down -v
docker-compose build --no-cache frontend
docker-compose build --no-cache backend
docker-compose up -d

# 方法 3: 完整清理（⚠️ 会清理所有未使用的 Docker 资源）
./docker-build-full.sh
```

**注意**：
- `docker-build.sh` 是安全版本，只清理当前项目的资源，不会影响其他 Docker 容器和镜像
- `docker-build-full.sh` 会清理所有未使用的 Docker 资源，使用前请确认

**常见问题**：

- **tsc 命令错误**：如果看到 `tsc` 的帮助信息，说明 Docker 可能使用了缓存的旧 `package.json`。使用 `--no-cache` 重新构建可以解决。

- **yarn 相关错误**：确保项目中有 `yarn.lock` 文件。如果没有，可以运行：

```bash
# 在前端和后端目录分别运行
cd frontend && yarn install
cd ../backend && yarn install
```

这会生成 `yarn.lock` 文件，确保依赖版本一致性。

### 3. 容器无法启动

```bash
# 查看详细日志
docker-compose logs backend
docker-compose logs frontend

# 检查容器状态
docker-compose ps
```

### 4. 文件权限问题

如果遇到文件读写权限问题：

```bash
# 检查文件权限
ls -la prompts/
ls -la chapters/
ls -la database/

# 修改权限（如果需要）
chmod -R 755 prompts/
chmod -R 755 chapters/
chmod -R 755 database/
```

### 5. 环境变量未生效

确保 `.env` 文件在项目根目录，且格式正确：

```bash
# 检查环境变量
docker-compose config
```

## 📦 生产环境部署

### 1. 使用生产环境配置

创建 `docker-compose.prod.yml`：

```yaml
version: '3.8'

services:
  backend:
    environment:
      - NODE_ENV=production
    # 其他生产环境配置...

  frontend:
    # 生产环境配置...
```

### 2. 使用生产配置启动

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 3. 使用反向代理（推荐）

在生产环境中，建议使用 Nginx 或 Traefik 作为反向代理：

```nginx
# nginx.conf 示例
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
    }

    location /api {
        proxy_pass http://localhost:3001;
    }
}
```

## 🔐 安全建议

1. **不要提交 `.env` 文件**
   - 确保 `.env` 在 `.gitignore` 中

2. **使用 Docker secrets**（生产环境）
   ```yaml
   services:
     backend:
       secrets:
         - openai_api_key
   secrets:
     openai_api_key:
       file: ./secrets/openai_api_key.txt
   ```

3. **限制网络访问**
   - 使用防火墙规则
   - 只暴露必要的端口

## 📝 开发模式

如果需要开发模式（热重载），可以使用开发配置：

```bash
# 开发模式启动（不使用 Docker）
cd frontend && npm run dev
cd backend && npm run dev
```

或者创建 `docker-compose.dev.yml` 用于开发环境。

---

*最后更新：2025年*

