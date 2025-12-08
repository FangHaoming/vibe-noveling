# UI 项目设置指南

## 快速开始

### 1. 安装依赖

#### 前端
```bash
cd frontend
npm install
```

#### 后端
```bash
cd backend
npm install
```

### 2. 配置环境变量

#### 后端环境变量
在 `backend/` 目录创建 `.env` 文件：

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4
PORT=3001
```

#### 前端环境变量（可选）
在 `frontend/` 目录创建 `.env` 文件：

```env
VITE_API_BASE=http://localhost:3001/api
```

### 3. 启动服务

#### 启动后端（终端 1）
```bash
cd backend
npm run dev
```

后端将在 http://localhost:3001 启动

#### 启动前端（终端 2）
```bash
cd frontend
npm run dev
```

前端将在 http://localhost:3000 启动

### 4. 访问应用

打开浏览器访问 http://localhost:3000

## 功能说明

### 已实现功能

1. **配置管理页面**
   - 世界观设定编辑器
   - 角色设定编辑器
   - 大纲编辑器
   - 风格指南编辑器

2. **AI 助手页面**
   - 对话界面
   - 快捷操作按钮
   - 上下文自动加载

3. **基础布局**
   - 左侧导航栏
   - 响应式设计

### 开发中功能

1. **章节管理页面**
   - 章节列表
   - 章节编辑器
   - Markdown 预览

2. **数据库管理页面**
   - Database 文件查看
   - 列表文件管理

3. **时间线页面**
   - 事件可视化

4. **自动更新功能**
   - 章节完成后自动更新 database
   - 自动更新列表文件
   - 自动更新时间线

## 项目结构

```
vibe-noveling/
├── frontend/          # React 前端应用
│   ├── src/
│   │   ├── components/    # UI 组件
│   │   ├── pages/         # 页面
│   │   ├── services/     # API 服务
│   │   ├── stores/        # 状态管理
│   │   └── types/         # 类型定义
│   └── package.json
├── backend/           # Node.js 后端
│   ├── src/
│   │   ├── routes/       # API 路由
│   │   └── index.ts      # 入口文件
│   └── package.json
└── [其他项目文件]
```

## 开发建议

1. **先配置基础信息**
   - 在配置管理页面填写世界观、角色、大纲等

2. **使用 AI 助手生成内容**
   - 在 AI 助手页面与 AI 对话
   - 使用快捷操作生成章节

3. **手动完善功能**
   - 目前自动更新功能还在开发中
   - 可以手动更新 database 和列表文件

## 故障排除

### 前端无法连接后端
- 检查后端是否正在运行
- 检查 `VITE_API_BASE` 环境变量

### AI 功能不工作
- 检查 `OPENAI_API_KEY` 是否配置
- 检查 API 密钥是否有效
- 查看后端控制台错误信息

### 文件读写失败
- 检查文件路径是否正确
- 检查文件系统权限
- 查看后端控制台错误信息

## 下一步开发

1. 实现章节管理页面
2. 实现数据库管理页面
3. 实现自动更新功能
4. 添加 Markdown 编辑器
5. 添加文件预览功能
6. 优化 UI/UX

