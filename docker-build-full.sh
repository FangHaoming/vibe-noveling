#!/bin/bash

# Docker 构建脚本 - 完整清理版本（会清理所有未使用的 Docker 资源）
# ⚠️ 警告：这会删除所有未使用的容器、网络、镜像和构建缓存
# 只在你确定要清理所有 Docker 资源时使用

read -p "⚠️  这将清理所有未使用的 Docker 资源（包括其他项目）。继续？(y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "已取消"
    exit 1
fi

echo "🧹 清理所有未使用的 Docker 资源..."
docker-compose down -v
docker system prune -f

echo "🔨 重新构建前端镜像（不使用缓存）..."
docker-compose build --no-cache frontend

echo "🔨 重新构建后端镜像（不使用缓存）..."
docker-compose build --no-cache backend

echo "✅ 构建完成！"
echo "🚀 启动服务: docker-compose up -d"

