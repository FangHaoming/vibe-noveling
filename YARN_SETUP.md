# Yarn 设置说明

本项目使用 **Yarn** 作为包管理器。

## 📦 初始化 Yarn

如果项目还没有 `yarn.lock` 文件，需要先初始化：

### 前端

```bash
cd frontend
yarn install
```

### 后端

```bash
cd backend
yarn install
```

这将生成 `yarn.lock` 文件，确保依赖版本一致性。

## 🔧 常用 Yarn 命令

### 安装依赖
```bash
yarn install
# 或简写
yarn
```

### 添加依赖
```bash
# 添加生产依赖
yarn add <package>

# 添加开发依赖
yarn add -D <package>
```

### 移除依赖
```bash
yarn remove <package>
```

### 运行脚本
```bash
yarn <script-name>
# 例如：yarn dev, yarn build, yarn start
```

## 🐳 Docker 构建

Dockerfile 会自动处理：
- 如果存在 `yarn.lock`，使用 `yarn install --frozen-lockfile`（锁定版本）
- 如果不存在 `yarn.lock`，使用 `yarn install`（安装最新兼容版本）

## ⚠️ 注意事项

1. **提交 yarn.lock**：确保将 `yarn.lock` 文件提交到 Git，以保证团队依赖版本一致
2. **不要使用 npm**：项目已配置为使用 Yarn，不要混用 npm 和 yarn
3. **Docker 构建**：Docker 镜像会自动安装 Yarn（通过 corepack）

---

*最后更新：2025年*

