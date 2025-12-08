# Vibe-Noveling 使用指南

欢迎使用 Vibe-Noveling！这是一个专为 AI 辅助小说创作设计的项目管理工具。

## 🐳 Docker 快速启动

使用 Docker Compose 一键启动：

```bash
# 1. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，设置 OPENAI_API_KEY

# 2. 启动服务
docker-compose up -d

# 3. 访问应用
# 前端: http://localhost:3000
# 后端: http://localhost:3001
```

详细说明请查看 [DOCKER_SETUP.md](./DOCKER_SETUP.md)

## 📚 目录

- [快速开始](#快速开始)
- [项目初始化](#项目初始化)
- [创作流程](#创作流程)
- [每章完成后的工作](#每章完成后的工作)
- [修改章节](#修改章节)
- [使用 AI 助手](#使用-ai-助手)
- [文件说明](#文件说明)
- [常见问题](#常见问题)

---

## 🚀 快速开始

### 第一步：初始化项目

1. **填写基础设定文件**
   - 编辑 `prompts/setting.md` - 设定世界观
   - 编辑 `prompts/characters.md` - 创建角色
   - 编辑 `prompts/outline.md` - 规划大纲

2. **配置风格和规则**
   - 编辑 `prompts/style_guide.md` - 定义写作风格
   - 查看 `prompts/rules.md` - 了解创作规则

### 第二步：开始创作

1. 在 `prompts/chapters/` 目录创建第一章：`001_章节名.md`
2. 参考 `prompts/outline.md` 和 `prompts/characters.md` 进行创作
3. 完成后按照[每章完成后的工作](#每章完成后的工作)更新所有文件

---

## 📝 项目初始化

### 1. 世界观设定 (`prompts/setting.md`)

填写以下内容：
- 世界类型（现代/古代/奇幻/科幻等）
- 地理环境
- 社会结构
- 文化背景
- 特殊设定（魔法/科技等）

### 2. 角色设定 (`prompts/characters.md`)

为每个角色填写：
- 基本信息（姓名、年龄、性别、身份）
- 外貌特征
- 性格特点
- 背景故事
- 能力/技能
- 目标与动机

### 3. 小说大纲 (`prompts/outline.md`)

规划：
- 作品基本信息
- 核心主题和冲突
- 故事结构（三幕剧等）
- 章节大纲

### 4. 风格指南 (`prompts/style_guide.md`)

定义：
- 整体写作风格
- 语言风格
- 叙事视角
- 对话风格
- 描述风格

### 5. 沟通上下文 (`prompts/context.md`)

记录：
- 项目背景
- 特殊要求
- 参考资料

---

## ✍️ 创作流程

### 撰写新章节

1. **准备工作**
   ```
   查看最新的 prompts/database/database_XXX.md 文件
   → 了解当前状态（角色、物品、技能、关系等）
   ```

2. **参考文件**
   - `prompts/outline.md` - 章节大纲
   - `prompts/setting.md` - 世界观设定
   - `prompts/characters.md` - 角色设定
   - `prompts/style_guide.md` - 写作风格
   - `prompts/timeline.md` - 时间线（了解之前的事件）

3. **创建章节文件**
   - 在 `prompts/chapters/` 目录创建：`XXX_章节名.md`
   - 按照大纲和设定进行创作

4. **创作时注意**
   - 保持角色性格一致性
   - 遵循世界观设定
   - 记录新出现的物品、技能
   - 记录关系变化
   - 埋设伏笔时做好标记

5. **完成后工作**（见下一节）

---

## ✅ 每章完成后的工作

每章完成后，必须完成以下步骤：

### 1. 创建/更新 Database 文件

复制 `prompts/database/database_template.md` 并重命名为 `prompts/database/database_XXX.md`（XXX 为章节编号）

填写：
- 章节信息
- 角色当前状态
- 物品当前状态
- 技能当前状态
- 关系当前状态
- 重要事件摘要
- 伏笔状态

### 2. 更新列表文件

#### 更新 `prompts/database/list/items_list.md`
记录本章中物品的变化：
```
物品名称 | 章节 | 操作类型（获取/使用/丢失）| 数量 | 剩余 | 备注
```

#### 更新 `prompts/database/list/skills_list.md`
记录本章中技能的变化：
```
技能名称 | 章节 | 操作类型（获取/升级）| 等级变化 | 当前等级 | 备注
```

#### 更新 `prompts/database/list/relationships_list.md`
记录本章中关系的变化：
```
角色名称 | 章节 | 关系变化 | 好感度变化 | 当前好感度 | 备注
```

#### 更新 `prompts/database/list/foreshadowing_list.md`
- 添加新埋下的伏笔
- 标记已回收的伏笔（更新状态为"已回收"，填写回收章节）

### 3. 更新时间线 (`prompts/timeline.md`)

只添加**关键节点事件**（每章最多3-5个）：
```
时间点 | 事件描述 | 涉及角色 | 章节
```

### 4. 质量检查

使用 `prompts/checklist.md` 逐项检查：
- 内容质量
- 文件更新
- 一致性检查
- 细节检查
- 格式检查

---

## 🔄 修改章节

### 修改旧章节的流程

1. **查看对应章节的 Database 文件**
   ```
   修改第 N 章 → 查看 prompts/database/database_NNN.md
   ```

2. **进行修改**
   - 修改章节内容
   - 注意保持与 Database 文件的一致性

3. **更新相关文件**
   - 如果修改影响了物品/技能/关系，更新对应的列表文件
   - 如果修改了关键事件，更新 `prompts/timeline.md`
   - 如果修改较大，更新对应的 `prompts/database/database_XXX.md`

4. **检查后续章节**
   - 如果修改影响了后续章节，需要检查并更新后续章节
   - 更新后续章节的 Database 文件

---

## 🤖 使用 AI 助手

### 给 AI 助手的指令模板

#### 撰写新章节
```
请帮我撰写第 X 章：[章节标题]

参考信息：
- 大纲：prompts/outline.md 中第 X 章的内容
- 当前状态：prompts/database/database_XXX.md（最新的那个）
- 角色设定：prompts/characters.md
- 世界观：prompts/setting.md
- 风格要求：prompts/style_guide.md

要求：
1. 严格遵循 prompts/rules.md 中的规则
2. 保持角色性格一致性
3. 记录新出现的物品、技能、关系变化
4. 完成后告诉我需要更新哪些列表文件
```

#### 修改章节
```
请帮我修改第 X 章：[修改内容描述]

参考信息：
- 章节文件：prompts/chapters/XXX_章节名.md
- 对应状态：prompts/database/database_XXX.md
- 其他设定文件：prompts/setting.md, prompts/characters.md 等

修改后请：
1. 更新对应的 prompts/database/database_XXX.md
2. 更新相关的列表文件（如有变化）
```

#### 检查一致性
```
请检查第 X 章与以下文件的一致性：
- prompts/database/database_XXX.md
- prompts/timeline.md
- prompts/database/list/ 下的所有列表文件

如有不一致，请指出并建议修改方案。
```

### AI 助手工作流程

1. **读取必要文件**
   - `prompts/rules.md` - 了解规则
   - `prompts/outline.md` - 了解大纲
   - `prompts/setting.md` - 了解世界观
   - `prompts/characters.md` - 了解角色
   - `prompts/style_guide.md` - 了解风格
   - 最新的 `prompts/database/database_XXX.md` - 了解当前状态

2. **进行创作/修改**

3. **生成更新清单**
   - 列出需要更新的文件
   - 提供更新内容建议

---

## 📂 文件说明

### 核心设定文件（根目录）

| 文件 | 说明 | 何时更新 |
|------|------|---------|
| `prompts/rules.md` | AI 写作规则 | 规则变更时 |
| `prompts/outline.md` | 小说大纲 | 大纲调整时 |
| `prompts/setting.md` | 世界观设定 | 设定变更时 |
| `prompts/characters.md` | 角色设定 | 角色变更时 |
| `prompts/style_guide.md` | 风格指南 | 风格调整时 |
| `prompts/context.md` | 沟通上下文 | 有新要求时 |
| `prompts/timeline.md` | 事件时间线 | 每章完成后 |
| `prompts/checklist.md` | 质量检查清单 | 每章完成后使用 |
| `prompts/database.md` | 数据库说明 | 系统变更时 |

### 章节文件

- `prompts/chapters/XXX_章节名.md` - 章节正文内容

### 数据库文件

- `prompts/database/database_XXX.md` - 每章结束时的状态快照
- `prompts/database/database_template.md` - 数据库模板
- `prompts/database/list/items_list.md` - 物品追踪列表
- `prompts/database/list/skills_list.md` - 技能追踪列表
- `prompts/database/list/relationships_list.md` - 关系追踪列表
- `prompts/database/list/foreshadowing_list.md` - 伏笔追踪列表

### 参考文档

- `PROMPT_FILES_GUIDE.md` - 完整的 prompt 文件清单（扩展参考）

---

## ❓ 常见问题

### Q1: 如何开始写第一章？

**A:** 
1. 确保已填写 `prompts/setting.md`、`prompts/characters.md`、`prompts/outline.md`
2. 在 `prompts/chapters/` 创建 `001_章节名.md`
3. 参考大纲和设定进行创作
4. 完成后创建 `prompts/database/database_001.md` 并更新所有列表文件

### Q2: 写第二章时应该参考哪个 Database 文件？

**A:** 参考最新的 Database 文件（编号最大的），通常是 `prompts/database/database_001.md`（第一章的）。

### Q3: 如何追踪伏笔？

**A:** 
1. 埋下伏笔时，在 `prompts/database/list/foreshadowing_list.md` 添加记录
2. 回收伏笔时，更新该列表的状态为"已回收"，填写回收章节

### Q4: 修改旧章节后，后续章节需要修改吗？

**A:** 
- 如果修改影响了后续章节的设定（如物品、技能、关系），需要检查并更新后续章节
- 更新后续章节对应的 Database 文件

### Q5: 时间线应该记录什么？

**A:** 只记录**关键节点事件**，每章最多3-5个。详细事件记录在对应章节的 Database 文件中。

### Q6: 物品/技能/关系在哪里记录？

**A:** 
- **历史追踪**：`database/list/` 下的对应列表文件
- **当前状态**：`prompts/database/database_XXX.md` 文件中

### Q7: 如何确保一致性？

**A:** 
1. 每章完成后使用 `prompts/checklist.md` 检查
2. 修改章节时参考对应的 Database 文件
3. 定期检查列表文件和时间线的一致性

---

## 💡 最佳实践

1. **先规划后创作**：完善大纲和设定后再开始写正文
2. **及时更新**：每章完成后立即更新所有相关文件
3. **定期检查**：定期使用 checklist 检查一致性
4. **版本控制**：使用 Git 等工具管理版本
5. **备份重要文件**：定期备份 Database 和列表文件

---

## 📖 扩展阅读

- `PROMPT_FILES_GUIDE.md` - 查看所有可用的 prompt 文件
- `prompts/rules.md` - 详细的创作规则
- `prompts/database/README.md` - 数据库系统详细说明

---

*最后更新：2024年*

