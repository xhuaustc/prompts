# Code Review

## Overview
Conduct thorough, constructive code reviews to maintain code quality and share knowledge across the team.

## Code Review Goals
1. **Catch Bugs**: Find issues before they reach production
2. **Maintain Quality**: Ensure code meets standards
3. **Share Knowledge**: Learn from each other
4. **Consistency**: Keep codebase consistent
5. **Documentation**: Verify proper documentation

## Code Review Checklist

### Functionality
- [ ] Code does what it's supposed to do
- [ ] Edge cases are handled
- [ ] Error conditions are properly managed
- [ ] No obvious bugs or logic errors
- [ ] Performance is acceptable
- [ ] No breaking changes (or documented if necessary)

### Code Quality
- [ ] Code is readable and understandable
- [ ] Functions are small and focused
- [ ] Variables and functions have descriptive names
- [ ] No code duplication (DRY principle)
- [ ] Appropriate design patterns used
- [ ] Code follows SOLID principles
- [ ] No over-engineering or premature optimization
- [ ] Magic numbers replaced with named constants

### Architecture & Design
- [ ] Code fits the existing architecture
- [ ] Separation of concerns is maintained
- [ ] Dependencies are appropriate
- [ ] No circular dependencies
- [ ] Interfaces/abstractions are well-designed
- [ ] Follows project conventions and patterns

### Testing
- [ ] Sufficient test coverage
- [ ] Tests are meaningful and test behavior
- [ ] Tests are independent and isolated
- [ ] Edge cases are tested
- [ ] No flaky tests
- [ ] Tests are readable and maintainable
- [ ] Integration points are tested

### Security
- [ ] No security vulnerabilities
- [ ] Input validation is present
- [ ] No SQL injection risks
- [ ] No XSS vulnerabilities
- [ ] Authentication/authorization properly implemented
- [ ] Sensitive data is not logged
- [ ] No hardcoded secrets or credentials

### Performance
- [ ] No obvious performance issues
- [ ] Database queries are optimized
- [ ] No N+1 query problems
- [ ] Caching is used appropriately
- [ ] Large operations are paginated
- [ ] Resource usage is reasonable

### Documentation
- [ ] Public APIs are documented
- [ ] Complex logic is explained
- [ ] README updated if needed
- [ ] Breaking changes documented
- [ ] Comments are helpful (not obvious)
- [ ] Commit message is clear and follows conventions

### Error Handling
- [ ] Errors are properly caught and handled
- [ ] Error messages are user-friendly
- [ ] Logging is appropriate
- [ ] No swallowed exceptions
- [ ] Resources are cleaned up properly
- [ ] Graceful degradation where appropriate

### Dependencies
- [ ] New dependencies are justified
- [ ] Dependencies are up to date
- [ ] No vulnerable dependencies
- [ ] License compatibility checked
- [ ] Bundle size impact considered

### Style & Conventions
- [ ] Code follows project style guide
- [ ] Linter passes with no warnings
- [ ] Consistent formatting
- [ ] No commented-out code
- [ ] No debug statements or console.logs
- [ ] Imports are organized

## Review Process

### 1. Before Requesting Review
```bash
# Self-review checklist
# Run tests
npm test

# Run linter
npm run lint

# Check types
npm run type-check

# Format code
npm run format

# Review your own changes
git diff main...feature-branch
```

### 2. Creating Pull Request

**Good PR Title**
```
feat(auth): add OAuth2 authentication

fix(api): resolve race condition in user creation

refactor(db): optimize query performance
```

**Good PR Description**
```markdown
## What
Brief description of what this PR does

## Why
Explanation of why this change is needed

## How
Technical implementation details

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if UI changes)
Before: [screenshot]
After: [screenshot]

## Checklist
- [ ] Tests passing
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### 3. Reviewing Code

**Start with the Big Picture**
- Understand the goal of the changes
- Check if the approach makes sense
- Look at architecture and design decisions

**Review Systematically**
```
1. Read PR description and context
2. Review test changes first
3. Review main implementation
4. Check edge cases and error handling
5. Look at documentation
6. Check for side effects
```

**Leave Constructive Comments**

❌ **Bad Comment**
```
This is wrong.
```

✅ **Good Comment**
```
Consider using a Map instead of an array here for O(1) lookup:

const userMap = new Map(users.map(u => [u.id, u]));
const user = userMap.get(userId);

This would improve performance when searching through large datasets.
```

**Comment Categories**

```
🔴 Blocking: Must fix before merge
Required: This will cause a bug

🟡 Non-blocking: Should fix but not critical
Suggestion: Consider refactoring this

🟢 Optional: Nice to have
Nit: Minor formatting preference

💡 Learning: Educational comments
TIL: Interesting approach!

❓ Question: Seeking clarification
Question: Why did you choose this approach?
```

### 4. Providing Feedback

**Positive Feedback**
```
✅ Great use of TypeScript types here!
✅ Nice test coverage on edge cases
✅ Excellent error handling
✅ Clean and readable code
```

**Constructive Feedback**
```
💡 Suggestion: Extract this into a separate function for reusability

🔴 Required: This will throw an error if user is undefined. 
Add null check:
if (!user) {
  throw new Error('User not found');
}

❓ Question: Is there a reason we're not using the existing 
utility function for this?
```

**Code Suggestions**
```typescript
// Provide specific code examples
// Instead of:
const users = data.filter(item => item.type === 'user')
                   .map(item => item.data);

// Consider:
const users = data
  .filter(isUser)
  .map(extractUserData);

// This improves readability and makes it easier to test
```

## Review Techniques

### 1. Checklist Review
Use a standardized checklist to ensure nothing is missed

### 2. Scenario Walkthrough
Think through different scenarios and edge cases

### 3. Code Comparison
Compare similar code in the codebase for consistency

### 4. Documentation Review
Verify that docs match the implementation

### 5. Test Coverage Review
Check that tests cover critical paths

## Common Issues to Look For

### Logic Errors
```javascript
// Off-by-one error
for (let i = 0; i <= arr.length; i++) { // Should be i < arr.length
  console.log(arr[i]);
}

// Missing null check
function getUserEmail(userId) {
  const user = users.find(u => u.id === userId);
  return user.email; // Will throw if user is undefined
}

// Incorrect comparison
if (user.role = 'admin') { // Should be === not =
  // ...
}
```

### Performance Issues
```javascript
// N+1 query problem
for (const user of users) {
  const posts = await db.posts.find({ userId: user.id });
}

// Inefficient algorithm
function findDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) { // O(n²)
      if (arr[i] === arr[j]) return arr[i];
    }
  }
}
```

### Security Issues
```javascript
// SQL Injection vulnerability
db.query(`SELECT * FROM users WHERE id = ${userId}`);

// XSS vulnerability
element.innerHTML = userInput;

// Exposed secrets
const API_KEY = 'sk_live_abc123'; // Hardcoded secret
```

### Resource Leaks
```javascript
// Event listener not removed
element.addEventListener('click', handler);
// Missing: element.removeEventListener('click', handler);

// Connection not closed
const db = await connectDatabase();
// Missing: await db.close();
```

## Responding to Feedback

### As the Author

**Good Responses**
```
✅ "Good catch! Fixed in latest commit"
✅ "Interesting idea. I chose X because Y, but I'm open to changing it"
✅ "Can you explain more about the performance concern?"
✅ "You're right, let me refactor this"
```

**Avoid**
```
❌ "That's not my code, it was already there"
❌ "It works on my machine"
❌ "We can fix that later" (without creating an issue)
❌ Being defensive or argumentative
```

**Handling Disagreements**
1. Understand the concern
2. Explain your reasoning
3. Discuss trade-offs
4. Be willing to compromise
5. Escalate if needed (team lead, architecture review)

## Review Automation

### Automated Checks (should pass before review)
```yaml
# .github/workflows/pr-checks.yml
name: PR Checks

on: [pull_request]

jobs:
  checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Tests
        run: npm test -- --coverage
      
      - name: Build
        run: npm run build
      
      - name: Security audit
        run: npm audit --audit-level=moderate
```

### Code Quality Tools
- **SonarQube**: Code quality and security
- **CodeClimate**: Automated code review
- **Codecov**: Test coverage tracking
- **Snyk**: Dependency vulnerability scanning
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting

## Best Practices

### For Reviewers
- [ ] Review promptly (within 24 hours)
- [ ] Be respectful and constructive
- [ ] Explain the "why" behind suggestions
- [ ] Praise good code
- [ ] Ask questions instead of making demands
- [ ] Focus on important issues
- [ ] Approve when ready (don't nitpick)
- [ ] Learn from the code you review

### For Authors
- [ ] Keep PRs small and focused
- [ ] Write clear PR descriptions
- [ ] Self-review before requesting review
- [ ] Respond to all comments
- [ ] Ask for clarification if needed
- [ ] Don't take feedback personally
- [ ] Mark conversations as resolved
- [ ] Thank reviewers for their time

### For Teams
- [ ] Define review standards
- [ ] Use PR templates
- [ ] Set response time expectations
- [ ] Rotate reviewers
- [ ] Pair program on complex changes
- [ ] Share knowledge through reviews
- [ ] Continuous improvement of process

## Review Metrics (Optional)

Track these to improve process:
- Average time to first review
- Average time to merge
- Number of iterations
- Review coverage (% of PRs reviewed)
- Code quality trends

