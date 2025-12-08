# Docker 清理命令说明

## `docker-compose down` vs `docker-compose down -v`

### `docker-compose down`
只清理当前项目的：
- ✅ 停止并删除当前 docker-compose.yml 中定义的容器
- ✅ 删除当前项目创建的网络
- ❌ 不会删除 volumes（命名卷或 bind mount）

### `docker-compose down -v`
清理当前项目的：
- ✅ 停止并删除当前 docker-compose.yml 中定义的容器
- ✅ 删除当前项目创建的网络
- ✅ 删除当前项目的**命名卷**（named volumes）
- ❌ 不会删除 bind mount volumes（因为它们指向主机文件系统）

## 本项目的情况

查看 `docker-compose.yml`：

```yaml
volumes:
  - .:/app:rw  # 这是 bind mount，不是命名卷
```

本项目使用的是 **bind mount**，不是命名卷，所以：
- `docker-compose down` 和 `docker-compose down -v` 效果相同
- 都不会删除任何卷（因为 bind mount 指向主机文件系统，不会被删除）
- 都只会删除当前项目的容器和网络

## 安全保证

`docker-compose down` 或 `docker-compose down -v` **只会**：
1. 删除 `docker-compose.yml` 中定义的容器（`vibe-noveling-backend`, `vibe-noveling-frontend`）
2. 删除 `docker-compose.yml` 中定义的网络（`vibe-noveling-network`）

**不会**：
- ❌ 删除其他项目的容器
- ❌ 删除其他项目的网络
- ❌ 删除任何镜像
- ❌ 删除其他项目的卷
- ❌ 删除 bind mount（因为它们指向主机文件系统）

## 对比其他命令

| 命令 | 影响范围 | 安全性 |
|------|---------|--------|
| `docker-compose down` | 只当前项目 | ✅ 安全 |
| `docker-compose down -v` | 只当前项目（命名卷） | ✅ 安全（本项目无命名卷） |
| `docker system prune -f` | 所有未使用的资源 | ⚠️ 危险（会清理所有项目） |

---

*最后更新：2025年*

