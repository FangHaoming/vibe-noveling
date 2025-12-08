# AI 写作规则 (AI Writing Rules)

## 1. 核心原则 (Core Principles)

- 始终遵循本文档和用户指令
- 严格遵循 `prompts/outline.md` 的内容要求
- 参考 `prompts/context.md`（沟通细节）、`prompts/setting.md`（世界观设定）、`prompts/characters.md`（角色基础设定）以保持一致性

## 2. 内容质量要求 (Content Quality Requirements)

- 保持逻辑一致性
- 确保角色行为符合其性格设定
- 保持世界观设定的统一性
- 文笔流畅，符合风格要求

## 3. 创作风格 (Writing Style)

- 参考 `prompts/style_guide.md` 中的风格定义
- 保持叙事视角的一致性
- 对话自然流畅，符合角色性格
- 描述生动具体，避免空洞

## 4. 数据一致性 (Data Consistency - Important)

### 章节级Database管理 (Chapter-level Database Management)

- **每章完成后**：创建 `prompts/database/database_XXX.md` 文件（如 `database_001.md`），记录该章节结束时的状态快照
- **撰写新章节时**：参考**最新的** `prompts/database/database_XXX.md` 文件（编号最大的那个）作为起始状态
- **修改旧章节时**：参考**对应章节的** `prompts/database/database_XXX.md` 文件，确保一致性
- 示例：撰写第二章时，参考 `prompts/database/database_001.md`；修改第一章时，也参考 `prompts/database/database_001.md`

## 5. 文件归档 (File Archiving)

- 主要章节内容应存储在 `prompts/chapters/` 目录下，命名格式如 `001_章节名.md`
- 章节级数据库文件应存储在 `prompts/database/` 目录下，命名格式如 `database_XXX.md`（如 `database_001.md`）

## 6. 物品与技能追踪 (Item and Skill Tracking)

### 物品列表 (Item List)
- **文件位置**：`prompts/database/list/items_list.md`
- **功能**：记录物品的获取、使用、丢失历史，以及当前剩余数量
- **格式**：`物品名称 | 章节 | 操作类型（获取/使用/丢失）| 数量 | 剩余`
- **更新要求**：每章完成后必须更新此列表

### 技能列表 (Skill List)
- **文件位置**：`prompts/database/list/skills_list.md`
- **功能**：记录技能的获取、升级历史，以及当前等级
- **格式**：`技能名称 | 章节 | 操作类型（获取/升级）| 等级变化 | 当前等级`
- **更新要求**：每章完成后必须更新此列表

### Database中的记录 (Records in Database)
- Database 文件记录**当前状态快照**（当前拥有的物品、当前技能等级等）
- 详细的历史变化记录在 `prompts/database/list/items_list.md` 和 `prompts/database/list/skills_list.md` 中
- Database 中的物品和技能部分会引用列表文件，但也会包含简要的当前状态信息

## 7. 角色关系与伏笔追踪 (Character Relationship and Foreshadowing Tracking)

### 角色关系列表 (Character Relationship List)
- **文件位置**：`prompts/database/list/relationships_list.md`
- **功能**：记录所有角色与主角之间关系的变化、好感度变化、当前状态
- **格式**：`角色名称 | 章节 | 关系变化 | 好感度变化 | 当前好感度 | 备注`
- **更新要求**：每章完成后必须更新此列表

### 伏笔追踪列表 (Foreshadowing Tracking List)
- **文件位置**：`prompts/database/list/foreshadowing_list.md`
- **功能**：记录所有埋下的伏笔和线索，追踪其回收情况
- **格式**：`伏笔内容 | 埋下章节 | 回收章节 | 状态 | 备注`
- **更新要求**：每章完成后必须检查并更新此列表

### 事件时间线 (Event Timeline)
- **文件位置**：`prompts/timeline.md`
- **功能**：按时间顺序记录小说中的**关键节点事件**
- **原则**：只记录关键节点事件，避免文件过长（每章最多3-5个最重要的关键事件）
- **详细事件**：详细事件记录在对应章节的 `prompts/database/database_XXX.md` 文件中
- **格式**：按时间顺序，每个事件包括时间点、事件描述、涉及角色、章节
- **更新要求**：每章完成后只添加关键节点事件到此时间线

## 8. 检查清单 (Checklist)

- 每章完成后，参考 `prompts/checklist.md` 进行质量检查
- 确保所有列表文件已更新
- 确保 Database 文件已创建/更新
- 确保时间线已更新

## 9. 修改与迭代 (Revision and Iteration)

- 修改章节时，必须参考对应的 Database 文件
- 修改后需要更新相关的列表文件
- 重大修改需要更新 `prompts/outline.md`

## 10. 错误处理 (Error Handling)

- 如发现逻辑不一致，立即停止并报告
- 如发现与设定冲突，优先遵循 `prompts/setting.md` 和 `prompts/characters.md`
- 如发现与大纲冲突，优先遵循 `prompts/outline.md`

