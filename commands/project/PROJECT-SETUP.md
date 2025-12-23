# Project Setup

## Overview
Set up a new project with proper structure, tooling, and best practices from the start.

## Project Setup Checklist

### 1. Initialize Project
- [ ] Choose project name and directory
- [ ] Initialize version control (git)
- [ ] Create repository (GitHub/GitLab/Bitbucket)
- [ ] Initialize package manager (npm, yarn, pnpm)
- [ ] Set up project structure
- [ ] Create README.md

### 2. Configure Dependencies
- [ ] Install core dependencies
- [ ] Install development dependencies
- [ ] Set up TypeScript (if applicable)
- [ ] Configure bundler (Webpack, Vite, etc.)
- [ ] Set up testing framework
- [ ] Install linters and formatters

### 3. Code Quality Tools
- [ ] ESLint configuration
- [ ] Prettier configuration
- [ ] TypeScript configuration
- [ ] Git hooks (Husky)
- [ ] Lint-staged configuration
- [ ] Commitlint (conventional commits)

### 4. Development Environment
- [ ] EditorConfig file
- [ ] VS Code settings (workspace)
- [ ] Environment variables setup
- [ ] Local development scripts
- [ ] Hot reload configuration
- [ ] Debug configuration

### 5. Testing Setup
- [ ] Unit testing framework
- [ ] Integration testing setup
- [ ] E2E testing framework
- [ ] Test coverage configuration
- [ ] Test scripts in package.json

### 6. CI/CD Pipeline
- [ ] GitHub Actions / GitLab CI
- [ ] Build pipeline
- [ ] Test automation
- [ ] Deployment configuration
- [ ] Environment management

### 7. Documentation
- [ ] README with setup instructions
- [ ] Contributing guidelines
- [ ] Code of conduct
- [ ] API documentation setup
- [ ] Changelog

## Project Structure Examples

### Node.js / Express API
```
project/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   ├── config/           # Configuration
│   ├── types/            # TypeScript types
│   └── index.ts          # Entry point
├── tests/
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── fixtures/         # Test data
├── scripts/              # Build/deployment scripts
├── docs/                 # Documentation
├── .env.example          # Environment template
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── tsconfig.json
├── jest.config.js
├── package.json
└── README.md
```

### React / Next.js Application
```
project/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── ui/           # Reusable UI components
│   │   └── features/     # Feature-specific components
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript types
│   └── utils/            # Helper functions
├── public/               # Static assets
├── tests/
│   ├── components/       # Component tests
│   ├── e2e/              # E2E tests
│   └── utils/            # Test utilities
├── .env.local.example
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
├── package.json
└── README.md
```

### Python / Django Project
```
project/
├── app/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── apps/
│   ├── users/
│   ├── products/
│   └── orders/
├── static/
├── templates/
├── tests/
│   ├── unit/
│   └── integration/
├── scripts/
├── requirements/
│   ├── base.txt
│   ├── dev.txt
│   └── prod.txt
├── .env.example
├── .gitignore
├── manage.py
├── pytest.ini
├── setup.py
└── README.md
```

## Configuration Files

### package.json
```json
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "Project description",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix",
    "format": "prettier --write \"src/**/*.ts\"",
    "type-check": "tsc --noEmit",
    "prepare": "husky install"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/jest": "^29.0.0",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "eslint-config-prettier": "^9.0.0",
    "husky": "^8.0.0",
    "jest": "^29.0.0",
    "lint-staged": "^15.0.0",
    "prettier": "^3.0.0",
    "ts-jest": "^29.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### .eslintrc.js
```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    es2022: true
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
};
```

### .prettierrc
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### .editorconfig
```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[*.{json,yml,yaml}]
indent_size = 2
```

### .gitignore
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output/

# Production
dist/
build/

# Misc
.DS_Store
.env
.env.local
.env.*.local
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
Thumbs.db
```

### .env.example
```env
# Application
NODE_ENV=development
PORT=3000
APP_VERSION=1.0.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=7d

# External APIs
API_KEY=your-api-key-here

# Logging
LOG_LEVEL=info
```

## Git Hooks Setup

### Install Husky
```bash
npm install -D husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
```

### Pre-commit Hook
```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### lint-staged Configuration
```json
{
  "lint-staged": {
    "*.{js,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml}": [
      "prettier --write"
    ]
  }
}
```

### Commit Message Hook
```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

### commitlint.config.js
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Formatting
        'refactor', // Code refactoring
        'test',     // Tests
        'chore',    // Maintenance
        'perf',     // Performance
        'ci',       // CI/CD
        'revert'    // Revert commit
      ]
    ]
  }
};
```

## README Template

```markdown
# Project Name

Brief description of the project

## Features

- Feature 1
- Feature 2
- Feature 3

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 14

## Installation

\`\`\`bash
# Clone repository
git clone https://github.com/username/project.git
cd project

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run database migrations
npm run migrate

# Start development server
npm run dev
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code

## Project Structure

\`\`\`
src/
├── controllers/
├── services/
├── models/
└── routes/
\`\`\`

## Environment Variables

See `.env.example` for required environment variables.

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT
```

## Best Practices

- [ ] Use consistent code style
- [ ] Set up automated testing
- [ ] Configure CI/CD from start
- [ ] Document setup process
- [ ] Use environment variables for config
- [ ] Implement proper error handling
- [ ] Add logging from the beginning
- [ ] Version control everything except secrets
- [ ] Use semantic versioning
- [ ] Keep dependencies updated

