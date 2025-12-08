#!/bin/bash

# Docker 构建脚本 - 安全版本（只清理当前项目）
# 不会影响其他 Docker 容器、镜像和网络

echo "🧹 清理当前项目的容器和网络..."
# docker-compose down 只会删除当前项目的容器和网络
# 不会影响其他项目的容器、网络、镜像或卷
docker-compose down

echo "🔨 重新构建前端镜像（不使用缓存）..."
docker-compose build --no-cache frontend

echo "🔨 重新构建后端镜像（不使用缓存）..."
docker-compose build --no-cache backend

echo "✅ 构建完成！"
echo "🚀 启动服务: docker-compose up -d"

