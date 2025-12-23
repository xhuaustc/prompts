# 如何使用这些命令 (How to Use These Commands)

## 📖 什么是Cursor Commands？

Cursor Commands是可以在Cursor AI IDE中通过输入 `/` 来调用的预定义工作流。这些命令帮助你快速完成常见的开发任务。

## 🚀 使用方法

### 方法一：在Cursor中直接使用（推荐）

1. **设置Commands目录**
   - 将这些markdown文件复制到项目根目录的 `.cursor/commands/` 文件夹
   - 或者配置Cursor指向当前的 `commands` 目录

2. **使用命令**
   ```
   在Cursor聊天框中输入 /
   从列表中选择命令
   按照提示提供必要信息
   ```

### 方法二：作为提示词模板使用

直接在Cursor聊天中复制粘贴相关的命令内容，然后根据你的需求进行修改。

## 💡 具体使用示例

### 示例 1：生成React组件

**场景**：需要创建一个新的Button组件

**在Cursor中输入**：
```
请帮我创建一个React Button组件，要求：
- 支持 primary、secondary、outline 三种样式
- 支持 small、medium、large 三种尺寸
- 支持 loading 状态
- 包含完整的TypeScript类型
- 使用CSS Modules
- 包含单元测试
- 确保无障碍访问（a11y）

参考：commands/frontend/COMPONENT-CREATION.md 的规范
```

**Cursor会生成**：
```typescript
// Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'medium',
  loading = false,
  children,
  ...props 
}) => {
  // 完整实现...
};
```

---

### 示例 2：添加API端点

**场景**：需要创建用户登录接口

**在Cursor中输入**：
```
请创建一个POST /api/auth/login 端点，要求：
- 接收 email 和 password
- 使用Zod验证输入
- 检查用户凭证
- 返回JWT token
- 包含错误处理
- 添加单元测试和集成测试

参考：commands/coding/API-DESIGN.md 的最佳实践
```

**Cursor会生成**：
```typescript
// routes/auth.routes.ts
router.post('/auth/login', validate(loginSchema), login);

// controllers/auth.controller.ts
export const login = async (req, res) => {
  const { email, password } = req.body;
  // 完整实现...
};

// schemas/auth.schema.ts
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
```

---

### 示例 3：修复Bug

**场景**：发现一个登录重定向的bug

**在Cursor中输入**：
```
我发现一个bug需要修复：

问题描述：
- 用户登录成功后没有自动跳转到dashboard
- 期望：登录后跳转到 /dashboard
- 实际：停留在 /login 页面
- 控制台没有错误

相关代码：
[粘贴登录相关代码]

请按照 commands/debugging/DEBUG-ISSUE.md 的步骤：
1. 分析根本原因
2. 提供修复方案
3. 添加测试避免回归
```

---

### 示例 4：性能优化

**场景**：列表页面加载很慢

**选择慢代码**：
```typescript
function loadUserPosts() {
  const users = getUsers(); // 100 users
  for (const user of users) {
    const posts = getPostsByUserId(user.id); // N+1 query!
    user.posts = posts;
  }
  return users;
}
```

**在Cursor中输入**：
```
这段代码性能很差，请优化：
[粘贴上面的代码]

参考 commands/debugging/PERFORMANCE-ANALYSIS.md
- 识别性能瓶颈
- 提供优化方案
- 展示性能对比
```

**Cursor会优化为**：
```typescript
async function loadUserPosts() {
  // 使用JOIN一次查询
  const users = await db.users.findMany({
    include: { posts: true }
  });
  return users;
}
// 性能提升：从 N+1 查询 → 1次查询
```

---

### 示例 5：代码审查

**提交前自查**：

**在Cursor中输入**：
```
请审查以下代码：
[粘贴你的代码]

按照 commands/project/CODE-REVIEW.md 的标准检查：
- 功能正确性
- 代码质量
- 安全性
- 性能
- 测试覆盖
```

---

## 🎯 常见工作流

### 工作流 1：新功能开发
```
1. /generate-component
   ↓
2. /add-api-endpoint  
   ↓
3. /write-tests
   ↓
4. /review-code
```

### 工作流 2：Bug修复
```
1. /debug-issue
   ↓
2. /fix-bug
   ↓
3. /write-tests
   ↓
4. /review-code
```

### 工作流 3：代码重构
```
1. /review-code (找问题)
   ↓
2. /refactor-code
   ↓
3. /optimize-performance
   ↓
4. /write-tests (确保功能不变)
```

## 📝 命令速查表

| 场景 | 使用的命令 | 关键文件 |
|------|-----------|---------|
| 创建新组件 | Component Creation | frontend/COMPONENT-CREATION.md |
| 创建API | API Design | coding/API-DESIGN.md |
| 写测试 | Unit Test | testing/UNIT-TEST.md |
| 修Bug | Debug Issue | debugging/DEBUG-ISSUE.md |
| 优化性能 | Performance Analysis | debugging/PERFORMANCE-ANALYSIS.md |
| 代码重构 | Refactor Code | coding/REFACTOR-CODE.md |
| 代码审查 | Code Review | project/CODE-REVIEW.md |
| 安全检查 | Security Audit | security/SECURITY-AUDIT.md |
| 数据库优化 | DB Optimization | database/DATABASE-OPTIMIZATION.md |

## 💡 高效使用技巧

### 1. 提供充足的上下文
```
❌ 不好：创建一个按钮
✅ 好：创建一个按钮组件，支持3种样式、loading状态、图标、完整的a11y支持
```

### 2. 选中相关代码
- 在编辑器中选中要处理的代码
- 然后在聊天中引用或描述
- Cursor会基于选中的代码提供更准确的建议

### 3. 引用命令文档
```
参考 commands/coding/CODE-GENERATION.md 的规范来生成代码
```

### 4. 分步骤进行
```
第一步：生成基础结构
第二步：添加错误处理
第三步：添加测试
```

### 5. 迭代改进
```
1. 生成初始代码
2. 审查并提出改进
3. 优化性能
4. 完善测试
```

## 🎓 学习路径

### 新手阶段
1. 从简单的组件生成开始
2. 学习如何写测试
3. 理解基本的代码结构

**推荐命令**：
- COMPONENT-CREATION
- UNIT-TEST
- CODE-COMMENTS

### 进阶阶段
1. 学习API设计
2. 掌握错误处理
3. 理解性能优化

**推荐命令**：
- API-DESIGN
- ERROR-HANDLING
- PERFORMANCE-ANALYSIS

### 高级阶段
1. 系统架构设计
2. 安全最佳实践
3. DevOps和部署

**推荐命令**：
- SECURITY-AUDIT
- CI-CD-SETUP
- DATABASE-OPTIMIZATION

## 🔧 自定义命令

你也可以基于这些模板创建自己的命令：

1. 复制现有命令
2. 修改为你的需求
3. 保存到 `.cursor/commands/`
4. 在Cursor中使用 `/your-command`

## 📚 更多资源

- 查看 `commands/README.md` 了解所有可用命令
- 每个命令文件都包含详细的示例和最佳实践
- 参考 `commands/coding/` 了解编程相关命令
- 参考 `commands/testing/` 了解测试相关命令

## ❓ 常见问题

**Q: 这些命令必须放在 .cursor/commands/ 吗？**
A: 不是必须的。你可以直接在聊天中引用这些文档，Cursor会读取并应用其中的规范。

**Q: 可以修改这些命令吗？**
A: 当然可以！这些都是模板，你应该根据项目需求进行定制。

**Q: 命令太长了怎么办？**
A: 你可以只引用你需要的部分，比如"参考API-DESIGN.md的错误处理部分"。

**Q: 如何让Cursor更准确理解我的需求？**
A: 提供具体的需求、选中相关代码、引用命令文档、给出示例。

