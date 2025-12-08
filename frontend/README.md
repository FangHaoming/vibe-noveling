# Vibe-Noveling UI

Vibe-Noveling 的前端用户界面。

## 功能

- ✅ 配置管理界面（世界观、角色、大纲、风格指南）
- ✅ AI 助手对话界面
- 🚧 章节管理（开发中）
- 🚧 数据库管理（开发中）
- 🚧 时间线可视化（开发中）

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建

```bash
npm run build
```

## 环境变量

创建 `.env` 文件：

```env
VITE_API_BASE=http://localhost:3001/api
```

## 项目结构

```
src/
├── components/     # UI 组件
├── pages/          # 页面组件
├── services/       # API 服务
├── stores/         # 状态管理
├── types/          # TypeScript 类型
└── utils/          # 工具函数
```

## 注意事项

1. 文件操作需要通过后端 API 完成
2. AI 功能需要配置 API 密钥
3. 确保后端服务正在运行

