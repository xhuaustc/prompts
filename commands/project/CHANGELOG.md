# Generate Changelog

## Overview
Generate and maintain a comprehensive changelog that documents all notable changes to the project.

## Changelog Format

Follow [Keep a Changelog](https://keepachangelog.com/) format:

### Structure
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New features that have been added

### Changed
- Changes in existing functionality

### Deprecated
- Features that will be removed in upcoming releases

### Removed
- Features that have been removed

### Fixed
- Bug fixes

### Security
- Security vulnerability fixes

## [1.2.0] - 2024-01-15

### Added
- User authentication with OAuth2
- Password reset functionality
- Email verification

### Changed
- Updated user profile page design
- Improved API response times

### Fixed
- Login redirect issue
- Memory leak in background job

## [1.1.0] - 2023-12-01

### Added
- Dark mode support
- Export data feature

### Fixed
- Date formatting bug
- Mobile responsive issues

## [1.0.0] - 2023-11-01

### Added
- Initial release
- User registration and login
- Basic CRUD operations
- Dashboard view

[Unreleased]: https://github.com/user/repo/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/user/repo/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/user/repo/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/user/repo/releases/tag/v1.0.0
```

## Change Categories

### Added
**For new features**
```markdown
### Added
- User profile customization
- Two-factor authentication
- Export to PDF functionality
- Webhook support for external integrations
```

### Changed
**For changes in existing functionality**
```markdown
### Changed
- Updated UI design to match new brand guidelines
- Improved search algorithm for better performance
- Changed authentication flow to use OAuth2
- Modified API response format (see migration guide)
```

### Deprecated
**For features that will be removed**
```markdown
### Deprecated
- `/api/v1/users` endpoint (use `/api/v2/users` instead)
- Legacy authentication method (will be removed in v3.0.0)
- Old dashboard layout (new layout is default, old is accessible via settings)
```

### Removed
**For removed features**
```markdown
### Removed
- Support for Internet Explorer 11
- Deprecated `/api/v1/auth` endpoint
- Legacy user settings page
- Old API key authentication (use OAuth2)
```

### Fixed
**For bug fixes**
```markdown
### Fixed
- Login redirect loop when session expires
- Race condition in payment processing
- Memory leak in WebSocket connections
- Incorrect timezone handling in date picker
- XSS vulnerability in comment system
```

### Security
**For security vulnerability fixes**
```markdown
### Security
- Fixed SQL injection vulnerability in search feature
- Patched XSS vulnerability in user-generated content
- Updated dependencies to address security advisories
- Improved password hashing algorithm
```

## Automated Changelog Generation

### Using conventional-changelog
```bash
# Install
npm install -D conventional-changelog-cli

# Generate changelog
npx conventional-changelog -p angular -i CHANGELOG.md -s

# Generate for first release
npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```

### package.json Scripts
```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "changelog:reset": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
  }
}
```

### Using standard-version
```bash
# Install
npm install -D standard-version

# Create release
npx standard-version

# First release
npx standard-version --first-release

# Prerelease
npx standard-version --prerelease alpha
```

### package.json Configuration
```json
{
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major",
    "release:patch": "standard-version --release-as patch"
  },
  "standard-version": {
    "skip": {
      "bump": false,
      "changelog": false,
      "commit": false,
      "tag": false
    },
    "types": [
      {"type": "feat", "section": "Features"},
      {"type": "fix", "section": "Bug Fixes"},
      {"type": "chore", "hidden": true},
      {"type": "docs", "section": "Documentation"},
      {"type": "style", "hidden": true},
      {"type": "refactor", "section": "Code Refactoring"},
      {"type": "perf", "section": "Performance Improvements"},
      {"type": "test", "hidden": true}
    ]
  }
}
```

### Using GitHub Releases
```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Generate changelog
        run: npm run changelog
      
      - name: Create Release
        uses: googleapis/release-please-action@v3
        with:
          release-type: node
          package-name: my-package
```

## Semantic Versioning

### Version Format
```
MAJOR.MINOR.PATCH

Example: 2.3.1
```

### Version Increment Rules

**MAJOR (Breaking changes)**
```
1.0.0 → 2.0.0

- Incompatible API changes
- Removed features
- Changed behavior that breaks existing usage
```

**MINOR (New features)**
```
1.0.0 → 1.1.0

- New features added
- Functionality enhanced
- Backward compatible changes
```

**PATCH (Bug fixes)**
```
1.0.0 → 1.0.1

- Bug fixes
- Security patches
- Minor improvements
- Documentation updates
```

### Pre-release Versions
```
1.0.0-alpha.1   # Alpha release
1.0.0-beta.2    # Beta release
1.0.0-rc.1      # Release candidate
```

## Changelog Best Practices

### Writing Guidelines
- [ ] Use present tense ("Add feature" not "Added feature")
- [ ] Be specific and descriptive
- [ ] Link to relevant issues/PRs
- [ ] Group similar changes together
- [ ] Highlight breaking changes
- [ ] Include migration instructions for breaking changes
- [ ] Keep entries concise but informative

### Good vs Bad Examples

❌ **Bad**
```markdown
### Changed
- Fixed bugs
- Updated code
- Improved performance
```

✅ **Good**
```markdown
### Changed
- Improved database query performance by 40% through index optimization
- Updated authentication flow to use OAuth2 instead of session cookies
  (See migration guide: docs/migration-v2.md)

### Fixed
- Fixed race condition in order processing that caused duplicate charges (#123)
- Resolved memory leak in WebSocket connections that occurred after 24 hours
```

### Including Breaking Changes
```markdown
## [2.0.0] - 2024-01-15

### Changed
- **BREAKING**: Changed API response format for `/api/users` endpoint
  
  **Before:**
  ```json
  { "user": { "id": 1, "name": "John" } }
  ```
  
  **After:**
  ```json
  { "data": { "id": 1, "name": "John" }, "meta": {...} }
  ```
  
  **Migration:** Update client code to access `data` property instead of `user`

### Removed
- **BREAKING**: Removed support for IE11
- **BREAKING**: Removed deprecated `/api/v1/auth` endpoint (use `/api/v2/auth`)
```

## Templates

### Release Checklist
```markdown
## Release Checklist for v${VERSION}

### Pre-release
- [ ] All tests passing
- [ ] No known critical bugs
- [ ] Dependencies updated
- [ ] Security audit completed
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped in package.json

### Release
- [ ] Create release branch
- [ ] Tag release
- [ ] Build production artifacts
- [ ] Deploy to staging
- [ ] Run smoke tests
- [ ] Deploy to production
- [ ] Publish release notes
- [ ] Notify stakeholders

### Post-release
- [ ] Monitor for issues
- [ ] Update internal documentation
- [ ] Close related issues
- [ ] Tweet/announce release
```

### Release Notes Template
```markdown
# Release v${VERSION} - ${DATE}

## 🎉 Highlights

Brief summary of the most important changes in this release.

## ✨ New Features

- Feature 1: Description and link to docs
- Feature 2: Description and link to docs

## 🐛 Bug Fixes

- Fix 1: Brief description (#issue)
- Fix 2: Brief description (#issue)

## 🔧 Improvements

- Improvement 1: Description
- Improvement 2: Description

## 📚 Documentation

- Updated API documentation
- Added migration guide

## ⚠️ Breaking Changes

### Change 1
Description of breaking change and how to migrate.

### Change 2
Description of breaking change and how to migrate.

## 📦 Dependencies

- Updated dependency1 to v2.0.0
- Updated dependency2 to v3.1.0

## 🙏 Contributors

Thank you to all contributors who made this release possible!

- @contributor1
- @contributor2

## 📝 Full Changelog

See full changelog: [v1.0.0...v2.0.0](https://github.com/user/repo/compare/v1.0.0...v2.0.0)
```

## Automation Tools

### GitHub Actions for Changelog
```yaml
name: Update Changelog

on:
  pull_request:
    types: [closed]
    branches:
      - main

jobs:
  update-changelog:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Generate Changelog
        uses: TriPSs/conventional-changelog-action@v3
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          output-file: 'CHANGELOG.md'
          skip-version-file: 'false'
          skip-commit: 'false'
```

### Release Drafter
```yaml
# .github/release-drafter.yml
name-template: 'v$RESOLVED_VERSION'
tag-template: 'v$RESOLVED_VERSION'
categories:
  - title: '🚀 Features'
    labels:
      - 'feature'
      - 'enhancement'
  - title: '🐛 Bug Fixes'
    labels:
      - 'fix'
      - 'bugfix'
      - 'bug'
  - title: '🧰 Maintenance'
    label: 'chore'
change-template: '- $TITLE @$AUTHOR (#$NUMBER)'
template: |
  ## Changes
  
  $CHANGES
```

## Maintenance

### Regular Updates
- Update changelog with each merge to main
- Review unreleased section before releases
- Archive old versions for historical reference
- Keep changelog format consistent
- Link to relevant documentation

### Version Release Process
1. Update changelog with release date
2. Move Unreleased items to new version
3. Bump version in package.json
4. Create git tag
5. Push changes and tag
6. Create GitHub release with notes
7. Announce release to stakeholders

