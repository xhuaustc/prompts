# Git Workflow

## Overview
Establish effective Git workflow and branching strategy for team collaboration and code management.

## Git Workflow Strategies

### 1. GitFlow
**Best for**: Projects with scheduled releases

```
main (production)
├── develop (integration)
    ├── feature/user-auth
    ├── feature/dashboard
    ├── release/v1.2.0
    └── hotfix/critical-bug
```

**Branches:**
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: New features
- `release/*`: Release preparation
- `hotfix/*`: Production fixes

**Workflow:**
```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication

# Work on feature
git add .
git commit -m "feat(auth): add user authentication"

# Finish feature
git checkout develop
git merge --no-ff feature/user-authentication
git push origin develop

# Create release
git checkout -b release/v1.2.0 develop
# Bump version, fix bugs
git checkout main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"
git checkout develop
git merge --no-ff release/v1.2.0

# Hotfix
git checkout -b hotfix/critical-bug main
# Fix bug
git checkout main
git merge --no-ff hotfix/critical-bug
git tag -a v1.2.1 -m "Hotfix v1.2.1"
git checkout develop
git merge --no-ff hotfix/critical-bug
```

### 2. GitHub Flow
**Best for**: Continuous deployment, web applications

```
main (production)
├── feature/add-login
├── feature/fix-bug
└── feature/update-docs
```

**Workflow:**
```bash
# Create feature branch
git checkout -b feature/add-login

# Make changes and commit
git add .
git commit -m "feat: add login functionality"

# Push to remote
git push -u origin feature/add-login

# Create Pull Request on GitHub
# After review and approval, merge to main
# Deploy automatically from main
```

### 3. Trunk-Based Development
**Best for**: High-performing teams, continuous deployment

```
main (always deployable)
├── short-lived-feature-1 (< 1 day)
└── short-lived-feature-2 (< 1 day)
```

**Workflow:**
```bash
# Create short-lived branch
git checkout -b feature/quick-fix

# Make small changes
git add .
git commit -m "feat: add validation"

# Merge quickly (same day)
git checkout main
git pull origin main
git merge feature/quick-fix
git push origin main

# Or commit directly to main with feature flags
git checkout main
git pull origin main
# Make changes
git add .
git commit -m "feat: add feature (behind feature flag)"
git push origin main
```

## Branch Naming Conventions

### Pattern
```
<type>/<short-description>
<type>/<issue-number>-<short-description>
```

### Types
- `feature/` - New features
- `fix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation changes
- `test/` - Test additions/changes
- `chore/` - Maintenance tasks
- `release/` - Release preparation

### Examples
```bash
feature/user-authentication
feature/123-add-payment-gateway
fix/login-redirect-issue
fix/456-resolve-memory-leak
hotfix/critical-security-patch
refactor/database-queries
docs/api-documentation
test/integration-tests
chore/update-dependencies
release/v2.0.0
```

## Commit Message Conventions

### Conventional Commits Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance
- `ci`: CI/CD changes
- `revert`: Revert previous commit

### Examples

**Simple Commits**
```bash
git commit -m "feat: add user registration"
git commit -m "fix: resolve login redirect issue"
git commit -m "docs: update API documentation"
git commit -m "style: format code with prettier"
git commit -m "refactor: extract validation logic"
git commit -m "test: add unit tests for auth service"
git commit -m "chore: update dependencies"
```

**Detailed Commits**
```bash
git commit -m "feat(auth): add OAuth2 authentication

- Implement Google OAuth2 provider
- Add user profile synchronization
- Update authentication middleware

Closes #123"
```

```bash
git commit -m "fix(api): resolve race condition in user creation

The user creation endpoint had a race condition when multiple
requests were made simultaneously. Added transaction locking
to prevent duplicate user creation.

Fixes #456"
```

**Breaking Changes**
```bash
git commit -m "feat(api)!: change authentication response format

BREAKING CHANGE: The authentication API now returns a different
response format. Update client code to use the new format:

Before:
{ token: 'xxx', user: {...} }

After:
{ accessToken: 'xxx', refreshToken: 'yyy', user: {...} }"
```

## Git Commands Reference

### Basic Operations
```bash
# Initialize repository
git init

# Clone repository
git clone <url>

# Check status
git status

# Stage changes
git add <file>
git add .              # Stage all changes
git add -p             # Stage interactively

# Commit changes
git commit -m "message"
git commit --amend     # Modify last commit
git commit --no-verify # Skip git hooks

# View history
git log
git log --oneline
git log --graph --oneline --all

# View changes
git diff
git diff --staged
git diff main..feature
```

### Branching
```bash
# List branches
git branch
git branch -a          # Include remote branches

# Create branch
git branch <name>
git checkout -b <name> # Create and switch

# Switch branches
git checkout <name>
git switch <name>      # Modern command

# Delete branch
git branch -d <name>   # Safe delete
git branch -D <name>   # Force delete

# Rename branch
git branch -m <old> <new>

# Track remote branch
git branch --set-upstream-to=origin/<branch>
```

### Remote Operations
```bash
# Add remote
git remote add origin <url>

# List remotes
git remote -v

# Fetch changes
git fetch origin
git fetch --all

# Pull changes
git pull origin main
git pull --rebase origin main

# Push changes
git push origin main
git push -u origin feature  # Set upstream
git push --force-with-lease # Safer force push
git push --tags             # Push tags

# Remove remote branch
git push origin --delete <branch>
```

### Merging & Rebasing
```bash
# Merge branch
git checkout main
git merge feature
git merge --no-ff feature     # Always create merge commit
git merge --squash feature    # Squash commits

# Rebase branch
git checkout feature
git rebase main
git rebase -i main           # Interactive rebase
git rebase --continue
git rebase --abort

# Cherry-pick commit
git cherry-pick <commit-hash>
```

### Stashing
```bash
# Stash changes
git stash
git stash save "work in progress"
git stash -u               # Include untracked files

# List stashes
git stash list

# Apply stash
git stash apply
git stash apply stash@{2}
git stash pop              # Apply and remove

# Drop stash
git stash drop stash@{0}
git stash clear            # Remove all stashes
```

### Undoing Changes
```bash
# Discard working directory changes
git checkout -- <file>
git restore <file>

# Unstage changes
git reset HEAD <file>
git restore --staged <file>

# Undo commits
git reset --soft HEAD~1    # Keep changes staged
git reset --mixed HEAD~1   # Keep changes unstaged
git reset --hard HEAD~1    # Discard changes

# Revert commit (create new commit)
git revert <commit-hash>

# Clean untracked files
git clean -n               # Dry run
git clean -f               # Remove files
git clean -fd              # Remove files and directories
```

### Tagging
```bash
# Create tag
git tag v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"

# List tags
git tag
git tag -l "v1.*"

# Push tags
git push origin v1.0.0
git push origin --tags

# Delete tag
git tag -d v1.0.0
git push origin --delete v1.0.0

# Checkout tag
git checkout v1.0.0
```

### Advanced Operations
```bash
# Interactive rebase (squash, reword, edit commits)
git rebase -i HEAD~3

# Find commit that introduced bug
git bisect start
git bisect bad
git bisect good <commit-hash>
# Test each commit
git bisect good/bad
git bisect reset

# Show commit info
git show <commit-hash>

# Search commits
git log --grep="bug fix"
git log --author="John"
git log --since="2 weeks ago"

# Blame (find who changed each line)
git blame <file>

# Reflog (recover lost commits)
git reflog
git checkout <commit-hash>
```

## Git Hooks

### Pre-commit Hook
```bash
#!/bin/sh
# .git/hooks/pre-commit

# Run linter
npm run lint
if [ $? -ne 0 ]; then
    echo "Linting failed. Commit aborted."
    exit 1
fi

# Run tests
npm test
if [ $? -ne 0 ]; then
    echo "Tests failed. Commit aborted."
    exit 1
fi
```

### Using Husky
```bash
# Install Husky
npm install -D husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/pre-commit "npm test"

# Add commit-msg hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

## Best Practices

### Commits
- [ ] Make atomic commits (one logical change)
- [ ] Write clear, descriptive commit messages
- [ ] Follow conventional commits format
- [ ] Commit often, push regularly
- [ ] Don't commit generated files
- [ ] Don't commit secrets or credentials
- [ ] Review changes before committing

### Branches
- [ ] Keep branches short-lived
- [ ] Use descriptive branch names
- [ ] Delete branches after merging
- [ ] Keep main/develop branches clean
- [ ] Protect important branches
- [ ] Regularly sync with main branch

### Merging
- [ ] Review code before merging
- [ ] Run tests before merging
- [ ] Use pull requests for code review
- [ ] Resolve conflicts carefully
- [ ] Use merge commits or squash appropriately
- [ ] Don't force push to shared branches

### Collaboration
- [ ] Pull before pushing
- [ ] Communicate with team about major changes
- [ ] Use feature flags for incomplete features
- [ ] Write clear PR descriptions
- [ ] Respond to review comments
- [ ] Keep repository clean and organized

## Troubleshooting

### Merge Conflicts
```bash
# View conflicts
git status

# Resolve conflicts manually, then:
git add <resolved-file>
git commit

# Abort merge
git merge --abort
```

### Recover Lost Commits
```bash
# Find lost commit
git reflog

# Recover commit
git checkout <commit-hash>
git cherry-pick <commit-hash>
```

### Undo Force Push
```bash
# Find previous commit
git reflog

# Reset to previous state
git reset --hard <commit-hash>
git push --force-with-lease
```

### Remove Sensitive Data
```bash
# Use BFG Repo-Cleaner or git-filter-repo
git filter-repo --path <file> --invert-paths

# Force push all branches
git push origin --force --all
```

