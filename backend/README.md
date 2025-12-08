# Vibe-Noveling Backend

Vibe-Noveling 的后端 API 服务。

## 功能

- 文件读写 API
- AI 助手 API（集成 OpenAI）
- 自动更新功能（开发中）

## 开发

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env.example` 为 `.env` 并填写：

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4
PORT=3001
```

### 启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:3001 启动

### 构建

```bash
npm run build
npm start
```

## API 端点

### 文件操作

- `GET /api/files/:path` - 读取文件
- `POST /api/files/:path` - 写入文件
- `GET /api/files/list/:dir` - 列出目录文件

### AI 助手

- `POST /api/ai/chat` - 发送聊天消息
- `POST /api/ai/generate-chapter` - 生成章节
- `POST /api/ai/modify-chapter` - 修改章节
- `POST /api/ai/check-consistency` - 检查一致性

## 注意事项

1. 需要配置 OpenAI API 密钥
2. 文件操作会直接访问项目目录
3. 确保有足够的文件系统权限

