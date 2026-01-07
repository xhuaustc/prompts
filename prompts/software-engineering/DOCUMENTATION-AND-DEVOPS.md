# 📄 文档、Git 与 DevOps

此提示词集专注于项目的基础设施、协作流程以及技术文档编写。

## 高质量 README 编写

### 提示词模板
```
请为我的项目编写一份专业的 GitHub README.md：

项目基本信息：
- 名称：[项目名]
- 简介：[一句话介绍项目解决的核心问题]
- 核心特性：[列出 3-5 个亮点]

技术栈：
[技术栈列表]

要求包含以下章节：
1. 项目 Logo 或 Banner（占位符）
2. 核心功能介绍
3. 快速开始（安装、配置、运行步骤）
4. 项目架构图（Mermaid 描述）
5. 贡献指南 (Contributing)
6. 许可证 (License)

请以极简、现代的风格编写，使用标准的 Markdown 语法。
```

---

## Git 提交信息 (Commit Message) 标准化

### 提示词模板
```
请帮我为以下更改编写符合 Conventional Commits 规范的提交信息：

更改内容：
[描述你做了什么，或粘贴 git diff]

要求：
1. 格式：`<type>(<scope>): <subject>`。
2. 类型 (Type)：包含 feat, fix, docs, style, refactor, test, chore。
3. 描述：简短明确，使用动词开头。
4. 正文 (Body)：如果有重大变化 (Breaking Changes)，请详细说明。

请提供 1-2 个备选方案。
```

---

## Dockerfile 与容器化配置

### 提示词模板
```
请为我的应用编写高质量的 Dockerfile 和 docker-compose.yml：

应用信息：
- 语言/框架：[如：Node.js, Go, Python]
- 构建工具：[如：npm, go build, pip]
- 端口需求：[如：8080]

要求：
1. 多阶段构建 (Multi-stage Build)：减小镜像体积。
2. 安全性：不使用 root 用户运行。
3. 最佳实践：包含 .dockerignore 建议，利用构建缓存。
4. 环境变量：如何在 Compose 中管理环境配置。

请提供完整的配置文件及使用说明。
```

---

## CI/CD 流水线设计 (GitHub Actions / GitLab CI)

### 提示词模板
```
请帮我设计一套自动化的 CI/CD 流水线：

项目背景：
[项目类型及部署环境，如：部署到 AWS Lambda / Vercel / 自有服务器]

工作流要求：
1. 静态检查：Linting 和类型检查。
2. 自动化测试：运行单元测试。
3. 构建镜像：自动构建并推送到仓库。
4. 部署阶段：支持 预览环境 (Preview) 和 生产环境 (Production) 的部署。

请提供对应的 YAML 配置文件（如 .github/workflows/main.yml）。
```

---

## API 文档自动生成 (OpenAPI/Swagger)

### 提示词模板
```
请基于以下代码/接口定义，生成标准的 OpenAPI (Swagger) 3.0 规范文档：

接口信息：
[提供 API 列表、控制器代码或数据库模型]

要求：
1. 详细定义：包含请求参数、返回结构、状态码。
2. 类型引用：使用 $ref 来复用 Schema。
3. 示例值：为每个字段提供合理的 Example。

请输出 YAML 格式的定义文件。
```

---

## 使用技巧

1. **文档驱动开发**：在开始写代码前，先用 AI 生成 API 文档，这能帮你理清逻辑。
2. **安全第一**：在生成 Dockerfile 或 CI 配置时，始终提醒 AI "Follow security best practices, especially regarding secrets management"。
3. **保持更新**：README 应随着项目演进而更新，可以将 `git log` 给 AI 让它总结更新内容。
