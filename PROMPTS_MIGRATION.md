# Prompt 文件迁移说明

## ✅ 已完成

所有 prompt 文件已整合到 `prompts/` 文件夹中，并更新了所有相关引用。

## 📁 新的文件结构

```
vibe-noveling/
├── prompts/                    # 所有 prompt 文件
│   ├── rules.md                # AI 写作规则
│   ├── outline.md              # 小说大纲
│   ├── setting.md              # 世界观设定
│   ├── characters.md           # 角色设定
│   ├── style_guide.md          # 风格指南
│   ├── context.md              # 沟通上下文
│   ├── timeline.md             # 事件时间线
│   ├── checklist.md           # 质量检查清单
│   ├── database.md             # 数据库说明
│   ├── chapters/               # 章节目录
│   │   └── README.md
│   └── database/               # 数据库目录
│       ├── database_template.md
│       ├── README.md
│       └── list/
│           ├── items_list.md
│           ├── skills_list.md
│           ├── relationships_list.md
│           └── foreshadowing_list.md
├── frontend/                   # 前端应用
├── backend/                    # 后端服务
└── [其他文档文件]
```

## 🔄 更新的文件

### 1. Prompt 文件
- ✅ `prompts/rules.md` - 所有路径引用已更新为 `prompts/` 前缀
- ✅ `prompts/database.md` - 路径引用已更新

### 2. 文档文件
- ✅ `README.md` - 所有文件路径引用已更新
- ✅ `QUICK_START.md` - 所有文件路径引用已更新

### 3. 后端代码
- ✅ `backend/src/routes/ai.ts` - 文件路径已更新为 `prompts/` 前缀

### 4. 前端代码
- ✅ `frontend/src/services/fileService.ts` - database 路径已更新
- ✅ `frontend/src/stores/fileStore.ts` - database 路径已更新
- ✅ `frontend/src/components/SettingEditor.tsx` - 文件路径已更新
- ✅ `frontend/src/components/CharacterEditor.tsx` - 文件路径已更新
- ✅ `frontend/src/components/OutlineEditor.tsx` - 文件路径已更新
- ✅ `frontend/src/components/StyleGuideEditor.tsx` - 文件路径已更新

## 📝 使用说明

现在所有 prompt 文件都在 `prompts/` 文件夹中，使用时请使用以下路径：

- 世界观设定：`prompts/setting.md`
- 角色设定：`prompts/characters.md`
- 小说大纲：`prompts/outline.md`
- 风格指南：`prompts/style_guide.md`
- AI 规则：`prompts/rules.md`
- 时间线：`prompts/timeline.md`
- 检查清单：`prompts/checklist.md`
- 章节文件：`prompts/chapters/XXX_章节名.md`
- Database 文件：`prompts/database/database_XXX.md`
- 列表文件：`prompts/database/list/*.md`

## ⚠️ 注意事项

1. 所有文件路径引用已更新，确保使用 `prompts/` 前缀
2. 后端 API 会自动处理 `prompts/` 路径
3. 前端编辑器会自动使用正确的路径
4. 如果手动编辑文件，请使用 `prompts/` 前缀的路径

---

*迁移完成日期：2025年*

