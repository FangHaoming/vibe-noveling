# 快速开始指南

## 🎯 5 分钟快速上手

### 第一步：初始化（首次使用）

```bash
1. 填写 prompts/setting.md      # 世界观设定
2. 填写 prompts/characters.md  # 角色设定
3. 填写 prompts/outline.md      # 小说大纲
4. 填写 prompts/style_guide.md  # 写作风格
```

### 第二步：写第一章

```bash
1. 创建文件：prompts/chapters/001_章节名.md
2. 参考文件：
   - prompts/outline.md（大纲）
   - prompts/characters.md（角色）
   - prompts/setting.md（世界观）
   - prompts/style_guide.md（风格）
3. 开始创作
```

### 第三步：完成第一章后

```bash
1. 创建 prompts/database/database_001.md（复制模板并填写）
2. 更新 prompts/database/list/items_list.md
3. 更新 prompts/database/list/skills_list.md
4. 更新 prompts/database/list/relationships_list.md
5. 更新 prompts/database/list/foreshadowing_list.md
6. 更新 prompts/timeline.md（关键事件）
7. 使用 prompts/checklist.md 检查
```

### 第四步：写第二章

```bash
1. 查看最新的 prompts/database/database_001.md（了解当前状态）
2. 创建 prompts/chapters/002_章节名.md
3. 参考大纲和设定进行创作
4. 完成后重复第三步
```

---

## 📋 常用命令/操作

### 查看当前状态
```bash
查看最新的 Database 文件（编号最大的）
→ prompts/database/database_XXX.md
```

### 查找物品/技能/关系历史
```bash
prompts/database/list/items_list.md
prompts/database/list/skills_list.md
prompts/database/list/relationships_list.md
```

### 检查一致性
```bash
使用 prompts/checklist.md 逐项检查
```

---

## 🤖 给 AI 的指令模板

### 写新章节
```
请帮我写第 X 章：[章节标题]

参考：
- 大纲：prompts/outline.md
- 当前状态：prompts/database/database_XXX.md（最新的）
- 角色：prompts/characters.md
- 世界观：prompts/setting.md
- 风格：prompts/style_guide.md
- 规则：prompts/rules.md

完成后请告诉我需要更新哪些文件。
```

### 修改章节
```
请修改第 X 章：[修改内容]

参考：
- 章节：prompts/chapters/XXX_章节名.md
- 状态：prompts/database/database_XXX.md
- 设定：prompts/setting.md, prompts/characters.md

修改后请更新相关文件。
```

---

## ⚠️ 重要提醒

1. ✅ **每章完成后必须更新所有列表文件**
2. ✅ **写新章节前查看最新的 Database 文件**
3. ✅ **修改旧章节时查看对应的 Database 文件**
4. ✅ **时间线只记录关键事件（每章3-5个）**
5. ✅ **使用 prompts/checklist.md 检查质量**

---

*详细说明请查看 README.md*

