# UI 项目开发计划

## 项目概述

创建一个 Web 应用，提供：
1. **配置界面** - 编辑基础信息（setting.md, characters.md, outline.md等）
2. **AI 对话界面** - 与 AI 助手交互，生成/修改章节
3. **自动文件管理** - 自动更新 database、list 等文件
4. **项目管理** - 查看章节列表、状态等

## 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 库**: Tailwind CSS + shadcn/ui
- **状态管理**: Zustand 或 React Context
- **路由**: React Router
- **Markdown 编辑**: CodeMirror 或 Monaco Editor

### 后端（可选）
- **框架**: Node.js + Express（或直接前端调用 AI API）
- **文件系统**: Node.js fs 模块
- **AI 集成**: OpenAI API / Anthropic API

### 项目结构
```
vibe-noveling-ui/
├── frontend/              # React 前端应用
│   ├── src/
│   │   ├── components/    # UI 组件
│   │   ├── pages/         # 页面
│   │   ├── services/      # API 服务
│   │   ├── stores/        # 状态管理
│   │   └── utils/         # 工具函数
│   └── package.json
├── backend/               # Node.js 后端（可选）
│   ├── src/
│   │   ├── routes/        # API 路由
│   │   ├── services/      # 业务逻辑
│   │   └── utils/         # 文件操作工具
│   └── package.json
└── shared/                # 共享类型定义
    └── types.ts
```

## 核心功能

### 1. 配置管理页面
- **世界观设定编辑器** (setting.md)
- **角色管理界面** (characters.md)
  - 添加/编辑/删除角色
  - 角色卡片展示
- **大纲编辑器** (outline.md)
  - 章节树形结构
  - 拖拽排序
- **风格指南编辑器** (style_guide.md)
- **规则查看器** (rules.md) - 只读

### 2. AI 助手对话页面
- **对话界面**
  - 消息列表
  - 输入框
  - 发送按钮
- **快捷指令**
  - "生成第 X 章"
  - "修改第 X 章"
  - "检查一致性"
- **上下文管理**
  - 自动加载相关文件
  - 显示当前使用的上下文

### 3. 章节管理页面
- **章节列表**
  - 显示所有章节
  - 章节状态（已完成/进行中）
  - 最后更新时间
- **章节编辑器**
  - Markdown 编辑器
  - 实时预览
  - 保存功能

### 4. 数据库管理页面
- **Database 文件查看器**
  - 显示所有 database_XXX.md
  - 查看最新状态
- **列表文件管理**
  - items_list.md
  - skills_list.md
  - relationships_list.md
  - foreshadowing_list.md
- **时间线可视化** (timeline.md)

### 5. 自动更新功能
- **章节完成后自动更新**
  - 解析章节内容
  - 提取物品/技能/关系变化
  - 更新列表文件
  - 生成 database_XXX.md
  - 更新时间线

## 实现步骤

### Phase 1: 基础框架
1. 初始化 React + TypeScript 项目
2. 配置 Tailwind CSS
3. 设置路由
4. 创建基础布局组件

### Phase 2: 文件管理
1. 实现文件读取/写入功能
2. Markdown 解析和渲染
3. 文件列表组件

### Phase 3: 配置界面
1. 世界观设定编辑器
2. 角色管理界面
3. 大纲编辑器
4. 风格指南编辑器

### Phase 4: AI 集成
1. 集成 AI API
2. 实现对话界面
3. 上下文管理
4. 快捷指令

### Phase 5: 自动更新
1. 章节内容解析
2. 数据提取（物品/技能/关系）
3. 自动更新列表文件
4. 生成 Database 文件

### Phase 6: 优化和测试
1. 错误处理
2. 加载状态
3. 用户反馈
4. 测试

## API 设计

### 文件操作 API
```
GET    /api/files/:path          # 读取文件
POST   /api/files/:path          # 写入文件
GET    /api/files/list/:dir      # 列出目录文件
DELETE /api/files/:path          # 删除文件
```

### AI 助手 API
```
POST   /api/ai/chat              # 发送消息给 AI
POST   /api/ai/generate-chapter  # 生成章节
POST   /api/ai/modify-chapter    # 修改章节
POST   /api/ai/check-consistency # 检查一致性
```

### 项目管理 API
```
GET    /api/project/status       # 获取项目状态
GET    /api/chapters             # 获取章节列表
POST   /api/chapters/:id/complete # 完成章节（自动更新）
```

## UI 设计要点

1. **左侧导航栏**
   - 配置管理
   - AI 助手
   - 章节管理
   - 数据库管理
   - 时间线

2. **主内容区**
   - 根据选择显示不同页面
   - 支持标签页切换

3. **右侧面板**（可选）
   - 当前上下文信息
   - 快捷操作

4. **响应式设计**
   - 支持桌面和移动端

## 数据流

```
用户操作
  ↓
UI 组件
  ↓
Service 层（API 调用）
  ↓
文件系统操作 / AI API
  ↓
更新文件
  ↓
刷新 UI
```

## 安全考虑

1. **文件路径验证** - 防止路径遍历攻击
2. **文件大小限制** - 防止大文件导致问题
3. **AI API 密钥** - 存储在环境变量，不暴露给前端
4. **输入验证** - 验证用户输入

## 部署方案

### 开发环境
- 前端：Vite dev server
- 后端：Node.js Express（或直接前端调用 AI API）

### 生产环境
- 前端：构建后部署到静态服务器（Vercel/Netlify）
- 后端：部署到 Node.js 服务器（Railway/Render）
- 或：全栈框架（Next.js）部署

## 后续扩展

1. **版本控制集成** - Git 操作
2. **导出功能** - 导出为 EPUB/PDF
3. **协作功能** - 多人协作
4. **模板系统** - 预设模板
5. **统计分析** - 字数统计、进度分析

