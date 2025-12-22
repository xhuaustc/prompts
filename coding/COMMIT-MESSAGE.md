# Commit Message Guide

## Cursor Command for Generating Commit Messages

When generating commit messages, follow the Conventional Commits specification with Google-style formatting:

### Format Structure

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Rules

1. **Subject Line**:
   - Use imperative mood ("add feature" not "added feature" or "adds feature")
   - First letter lowercase (unless it's a proper noun)
   - No period at the end
   - Maximum 50 characters (72 is acceptable but 50 is preferred)
   - Be concise and descriptive

2. **Scope** (optional):
   - Enclosed in parentheses
   - Should be a noun describing the area of the codebase affected
   - Examples: `auth`, `api`, `ui`, `database`, `config`

3. **Body** (optional but recommended for complex changes):
   - Separated from subject by a blank line
   - Use imperative mood
   - Explain what and why vs. how
   - Wrap at 72 characters
   - Can include multiple paragraphs

4. **Footer** (optional):
   - Reference issues: `Closes #123`, `Fixes #456`, `Refs #789`
   - Breaking changes: `BREAKING CHANGE: <description>`
   - Co-authors: `Co-authored-by: Name <email>`

### Examples

#### Simple Feature
```
feat(auth): add JWT token authentication

Implement JWT-based authentication system with token refresh mechanism.
Supports both access and refresh tokens with configurable expiration times.

Closes #123
```

#### Bug Fix
```
fix(api): resolve null pointer exception in user service

Handle null user objects gracefully when fetching user profile.
Added null checks before accessing user properties.

Fixes #456
```

#### Documentation
```
docs(readme): update installation instructions

Add step-by-step guide for setting up development environment.
Include prerequisites and troubleshooting section.
```

#### Refactoring
```
refactor(database): optimize query performance

Replace N+1 queries with batch loading in user repository.
Reduce database round trips from O(n) to O(1).

Performance improvement: 80% reduction in query time.
```

#### Breaking Change
```
feat(api): change authentication endpoint structure

BREAKING CHANGE: Authentication endpoint moved from /auth/login to /api/v2/auth/login.
Update all client applications to use the new endpoint structure.

Migration guide: See docs/migration/v2-auth.md
```

#### Multiple Changes
```
feat(ui): add dark mode support

- Add theme toggle component in header
- Implement theme persistence using localStorage
- Update all components to support dark theme colors
- Add theme transition animations

Closes #789
```

### Best Practices

1. **Be Specific**: Clearly describe what changed and why
2. **Use Present Tense**: Write as if the commit is applying the change now
3. **Focus on Why**: Explain the reasoning behind the change, not just what changed
4. **Reference Issues**: Link to related issues or pull requests
5. **Group Related Changes**: One logical change per commit
6. **Write for Future You**: Assume you'll read this commit message 6 months later

### When Generating Commit Messages

1. Analyze the staged changes carefully
2. Identify the primary type of change
3. Determine the scope if applicable
4. Write a clear, concise subject line
5. Add body if the change is complex or needs explanation
6. Include footer references if applicable
7. Ensure the message follows the format above

### Common Mistakes to Avoid

- ❌ "Updated files" (too vague)
- ❌ "Fix bug" (doesn't explain what bug)
- ❌ "WIP" (work in progress - use proper type)
- ❌ Past tense ("Fixed bug" → "Fix bug")
- ❌ Too long subject lines
- ❌ Multiple unrelated changes in one commit

### Good Examples

✅ `feat(payment): add Stripe integration for credit card processing`
✅ `fix(login): resolve authentication timeout after 30 minutes`
✅ `docs(api): add OpenAPI specification for user endpoints`
✅ `refactor(utils): extract date formatting logic into separate module`

### Bad Examples

❌ `update code`
❌ `fix stuff`
❌ `changes`
❌ `WIP`
❌ `Fixed the bug where users couldn't log in after the authentication service was updated` (too long, past tense)

