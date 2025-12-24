# LLM Prompts & Cursor Commands（提示词库 + Cursor 命令集合）

这是一个整理好的工作区，主要包含三部分：

- **提示词模板库**：覆盖日常、工作、学习、创意、商业等场景。
- **Cursor 命令模板库**：用 Markdown 形式沉淀常用工程工作流（生成代码、测试、调试、文档等）。
- **可运行示例应用**：一个 Next.js 日历 UI demo（玻璃拟态风格），用于展示前端落地效果与组件拆分方式。

## 目录

- [项目包含内容](#项目包含内容)
- [快速开始](#快速开始)
- [仓库结构](#仓库结构)
- [开发说明](#开发说明)
- [部署](#部署)
- [常见问题](#常见问题)
- [贡献指南](#贡献指南)
- [支持与反馈](#支持与反馈)

## 项目包含内容

### 1）提示词库（`prompts/`）

提示词库按主题分类（如日常、工作、教育、创意、商业等）。

- 入口文件：`prompts/README.md`

### 2）Cursor 命令集合（`commands/`）

`commands/` 目录提供了可复用的 Cursor 工作流模板（以 Markdown 清单/规范形式组织）。

- 总览入口：`commands/README.md`
- 快速上手：`commands/QUICK-START.md`
- 使用说明：`commands/HOW-TO-USE.md`

### 3）示例应用（`apps/`）

当前包含一个可运行的 Next.js 日历 UI demo：

- 路径：`apps/日历/calendar-app`
- 应用说明：`apps/日历/calendar-app/README.md`

## 快速开始

### 使用提示词库

1. 打开 `prompts/README.md`。
2. 选择一个分类目录（例如 `daily-life/`、`work/`、`business/`）。
3. 打开对应的模板 Markdown 文件，复制到你的对话里使用。
4. 用你的真实上下文替换占位内容，并迭代优化。

### 使用 Cursor 命令集合

你可以用两种方式使用这些命令模板：

- **作为参考模板**：在 Cursor 对话里描述需求，并引用某个文件作为规范（例如 `commands/documentation/README.md`）。
- **安装为 Cursor Commands**：将这些 Markdown 文件复制到目标项目的 `.cursor/commands/` 目录，然后在 Cursor 对话中输入 `/` 选择命令执行。

更详细的说明与示例请看：`commands/HOW-TO-USE.md`。


## 仓库结构

```text
.
├── prompts/                 # Prompt templates library
├── commands/                # Cursor command templates (Markdown playbooks)
├── apps/
│   └── 日历/calendar-app/    # Next.js + TS + Tailwind calendar UI demo
└── cursor案例：设计+网站+生活技巧/ # Example assets and writing/design cases
```


## 开发说明

### 编辑提示词与命令模板

- 建议按主题归类、文件名清晰，方便检索与复用。
- 优先写“小而清晰”的模板，避免一个文件承担过多任务。
- 新增重要模板/分类后，建议同步更新对应的目录索引（例如 `prompts/README.md`、`commands/README.md`）。


## 部署

本仓库主要用于沉淀模板与示例，不提供根目录统一部署流程。

## 常见问题

- **Cursor 命令不显示**：确认文件放在目标项目的 `.cursor/commands/` 下，参考 `commands/HOW-TO-USE.md`。


## 贡献指南

欢迎贡献与完善：

1. 在 `prompts/` 或 `commands/` 下新增/改进模板。
2. 保持格式一致，并尽量提供至少一个可直接复用的示例。
3. 如新增重要模板/分类，请更新相关索引 README。

## 支持与反馈

- 提示词与命令使用问题：优先阅读 `commands/README.md`、`commands/QUICK-START.md`、`prompts/README.md`。
- 日历 demo 相关问题：参考 `apps/日历/calendar-app/README.md`。


