# 快速开始 (Quick Start Guide)

## 🚀 5分钟快速上手

### 第1步：了解可用命令

查看所有命令分类：
```
commands/
├── coding/        # 代码生成、重构、优化
├── testing/       # 测试相关
├── debugging/     # 调试和性能
├── security/      # 安全审计
├── database/      # 数据库优化
├── devops/        # CI/CD、Docker
├── frontend/      # 前端组件、状态
├── documentation/ # 文档生成
└── project/       # 项目管理
```

### 第2步：选择你需要的命令

| 我想做什么 | 使用哪个命令 |
|-----------|------------|
| 创建新组件 | `frontend/COMPONENT-CREATION.md` |
| 创建API接口 | `coding/API-DESIGN.md` |
| 写测试 | `testing/UNIT-TEST.md` |
| 修复Bug | `debugging/DEBUG-ISSUE.md` |
| 优化性能 | `debugging/PERFORMANCE-ANALYSIS.md` |
| 代码审查 | `project/CODE-REVIEW.md` |

### 第3步：在Cursor中使用

**方式1：直接引用**
```
在Cursor聊天中输入：

"请创建一个用户登录表单组件，参考 commands/frontend/COMPONENT-CREATION.md 
的规范，需要包含：
- email和password输入框
- 表单验证
- loading状态
- 错误提示
- 单元测试"
```

**方式2：详细描述**
```
"我需要优化这段代码的性能：
[粘贴代码]

请按照以下步骤：
1. 分析当前性能瓶颈（Big O复杂度）
2. 提供优化方案
3. 展示优化前后的对比
4. 确保功能不变

参考：commands/debugging/PERFORMANCE-ANALYSIS.md"
```

## 📖 实战示例

### 示例1：快速创建登录页面

**输入到Cursor**：
```
创建一个完整的登录页面，包括：

前端部分（参考 commands/frontend/COMPONENT-CREATION.md）：
- LoginForm组件（email、password输入框）
- 表单验证（email格式、密码长度）
- 提交按钮带loading状态
- 错误提示显示
- 响应式设计

后端部分（参考 commands/coding/API-DESIGN.md）：
- POST /api/auth/login 接口
- 输入验证（使用Zod）
- JWT token生成
- 错误处理
- 单元测试和集成测试

文件结构：
frontend/
  LoginForm.tsx
  LoginForm.module.css
  LoginForm.test.tsx
backend/
  routes/auth.routes.ts
  controllers/auth.controller.ts
  schemas/auth.schema.ts
  tests/auth.test.ts
```

### 示例2：修复性能问题

**场景**：用户列表加载很慢

**选中慢代码并输入**：
```typescript
// 选中这段代码
async function getUsersWithPosts() {
  const users = await User.findAll();
  for (const user of users) {
    const posts = await Post.findAll({ where: { userId: user.id } });
    user.posts = posts;
  }
  return users;
}
```

**在Cursor中输入**：
```
这段代码有N+1查询问题，性能很差。

请：
1. 解释为什么慢（参考 commands/debugging/PERFORMANCE-ANALYSIS.md）
2. 提供优化方案（使用JOIN或批量查询）
3. 展示性能提升数据
4. 添加测试确保功能正确
```

**Cursor输出**：
```typescript
// 优化后的代码
async function getUsersWithPosts() {
  // 使用eager loading，一次查询获取所有数据
  const users = await User.findAll({
    include: [{ 
      model: Post,
      as: 'posts'
    }]
  });
  return users;
}

/*
性能对比：
- 优化前：101次数据库查询（1次users + 100次posts）
- 优化后：1次数据库查询
- 响应时间：从 500ms 降到 50ms
- 性能提升：10倍
*/
```

### 示例3：提交前代码自查

**在Cursor中输入**：
```
请审查我即将提交的代码：

[粘贴修改的代码]

检查项（参考 commands/project/CODE-REVIEW.md）：
✓ 功能正确性
✓ 代码质量
✓ 安全性
✓ 性能
✓ 测试覆盖
✓ 文档完整性

请指出所有问题并给出修改建议。
```

## 🎯 常用命令组合

### 场景：新功能开发
```
步骤1: 生成组件
"参考 commands/frontend/COMPONENT-CREATION.md 创建UserProfile组件"

步骤2: 创建API
"参考 commands/coding/API-DESIGN.md 创建 GET /api/users/:id 接口"

步骤3: 写测试
"参考 commands/testing/UNIT-TEST.md 为以上代码添加测试"

步骤4: 代码审查
"参考 commands/project/CODE-REVIEW.md 审查上述所有代码"
```

### 场景：Bug修复
```
步骤1: 分析问题
"参考 commands/debugging/DEBUG-ISSUE.md 分析这个bug：
[描述bug现象]"

步骤2: 实施修复
"提供修复方案并实现"

步骤3: 添加测试
"参考 commands/testing/UNIT-TEST.md 添加回归测试"

步骤4: 验证修复
"确认修复后运行所有测试"
```

## 💡 专业技巧

### 技巧1：命令链式调用
```
我要创建完整的用户管理功能：

1. 参考 commands/frontend/COMPONENT-CREATION.md 创建UserList组件
2. 参考 commands/coding/API-DESIGN.md 创建CRUD接口
3. 参考 commands/database/DATABASE-OPTIMIZATION.md 优化查询
4. 参考 commands/testing/INTEGRATION-TEST.md 添加集成测试
5. 参考 commands/security/SECURITY-AUDIT.md 做安全检查
```

### 技巧2：具体化需求
```
❌ 不清晰：创建一个表单
✅ 清晰：
创建一个用户注册表单，包括：
- 字段：username, email, password, confirmPassword
- 验证：email格式、密码强度（8位以上，包含数字和字母）、密码确认匹配
- UI：Material-UI风格、响应式、无障碍支持
- 状态：提交中显示loading、成功显示提示、失败显示错误
- 测试：覆盖所有验证场景和提交流程
```

### 技巧3：分阶段实现
```
第一阶段：基础功能
"先创建基本的登录表单，只包含email和password"

第二阶段：增强功能
"添加记住我、忘记密码功能"

第三阶段：优化
"添加loading动画、错误重试、输入防抖"
```

## 📋 命令速记卡

打印或收藏这个速记卡：

```
生成代码     → coding/CODE-GENERATION.md
重构代码     → coding/REFACTOR-CODE.md
优化性能     → coding/CODE-OPTIMIZATION.md
API设计      → coding/API-DESIGN.md
单元测试     → testing/UNIT-TEST.md
集成测试     → testing/INTEGRATION-TEST.md
E2E测试      → testing/E2E-TEST.md
调试Bug      → debugging/DEBUG-ISSUE.md
错误处理     → debugging/ERROR-HANDLING.md
性能分析     → debugging/PERFORMANCE-ANALYSIS.md
安全审计     → security/SECURITY-AUDIT.md
漏洞修复     → security/VULNERABILITY-FIX.md
数据库优化   → database/DATABASE-OPTIMIZATION.md
数据迁移     → database/MIGRATION.md
CI/CD设置    → devops/CI-CD-SETUP.md
Docker容器化 → devops/DOCKER-CONTAINERIZATION.md
监控日志     → devops/MONITORING-LOGGING.md
创建组件     → frontend/COMPONENT-CREATION.md
状态管理     → frontend/STATE-MANAGEMENT.md
项目设置     → project/PROJECT-SETUP.md
代码审查     → project/CODE-REVIEW.md
Git工作流    → project/GIT-WORKFLOW.md
生成文档     → documentation/README.md
```

## ⚡ 一句话命令

当你很忙时，用这些简短指令：

```
"参考COMPONENT-CREATION创建Button组件"
"参考API-DESIGN创建登录接口"
"参考UNIT-TEST为这段代码写测试"
"参考DEBUG-ISSUE帮我修这个bug"
"参考PERFORMANCE-ANALYSIS优化这段代码"
"参考CODE-REVIEW审查我的代码"
"参考SECURITY-AUDIT检查安全问题"
```

## 🎓 学习建议

**第1周**：熟悉基础命令
- COMPONENT-CREATION
- API-DESIGN
- UNIT-TEST

**第2周**：掌握调试优化
- DEBUG-ISSUE
- PERFORMANCE-ANALYSIS
- REFACTOR-CODE

**第3周**：学习最佳实践
- CODE-REVIEW
- SECURITY-AUDIT
- GIT-WORKFLOW

**第4周**：综合应用
- 结合多个命令完成复杂任务
- 自定义适合自己的命令
- 分享给团队使用

## 🆘 遇到问题？

1. **命令输出不理想**
   → 提供更多上下文和具体需求

2. **不知道用哪个命令**
   → 查看 HOW-TO-USE.md 的场景对照表

3. **想要定制命令**
   → 复制现有命令并根据需求修改

4. **需要更多示例**
   → 查看各个命令文件中的Examples部分

---

**开始使用吧！** 🚀

选择一个命令，在Cursor中试试看！

