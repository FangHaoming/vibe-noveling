# 数据库说明 (Database Documentation)

## 数据库系统说明

本项目的数据库系统用于记录小说创作过程中的状态快照和历史追踪。

## 文件结构

### 章节级数据库
- **位置**：`prompts/database/database_XXX.md`
- **功能**：记录每章结束时的状态快照
- **命名规则**：`database_001.md`, `database_002.md` 等

### 列表文件
- **位置**：`prompts/database/list/`
- **包含文件**：
  - `items_list.md` - 物品追踪列表
  - `skills_list.md` - 技能追踪列表
  - `relationships_list.md` - 角色关系列表
  - `foreshadowing_list.md` - 伏笔追踪列表

## 使用规则

1. **撰写新章节时**：参考最新的 `prompts/database/database_XXX.md` 文件
2. **修改旧章节时**：参考对应章节的 `prompts/database/database_XXX.md` 文件
3. **每章完成后**：创建新的 `prompts/database/database_XXX.md` 文件，并更新所有列表文件

## 数据库文件模板

每个 `database_XXX.md` 文件应包含：

- 章节信息
- 角色当前状态
- 物品当前状态
- 技能当前状态
- 关系当前状态
- 重要事件摘要
- 伏笔状态

---

*最后更新：[日期]*

