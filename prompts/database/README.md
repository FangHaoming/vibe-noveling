# 数据库目录 (Database Directory)

## 说明

本目录存储所有章节级数据库文件和列表文件。

## 文件结构

```
database/
├── database_001.md          # 第一章结束时的状态快照
├── database_002.md          # 第二章结束时的状态快照
├── ...
└── list/                    # 列表文件目录
    ├── items_list.md        # 物品追踪列表
    ├── skills_list.md       # 技能追踪列表
    ├── relationships_list.md # 角色关系列表
    └── foreshadowing_list.md # 伏笔追踪列表
```

## 使用规则

1. **撰写新章节时**：参考最新的 `database_XXX.md` 文件
2. **修改旧章节时**：参考对应章节的 `database_XXX.md` 文件
3. **每章完成后**：
   - 创建新的 `database_XXX.md` 文件
   - 更新 `list/` 目录下的所有列表文件

---

*最后更新：[日期]*

