# CI/CD Setup

## Overview
Set up continuous integration and continuous deployment pipeline for automated testing and deployment.

## CI/CD Pipeline Components

### 1. Source Control Integration
- [ ] Connect to Git repository (GitHub, GitLab, Bitbucket)
- [ ] Configure branch protection rules
- [ ] Set up webhooks for automatic triggers
- [ ] Define branching strategy (GitFlow, trunk-based)

### 2. Build Stage
- [ ] Install dependencies
- [ ] Compile/transpile code
- [ ] Bundle assets
- [ ] Generate build artifacts
- [ ] Cache dependencies for speed
- [ ] Version artifacts

### 3. Test Stage
- [ ] Run linters and code style checks
- [ ] Execute unit tests
- [ ] Run integration tests
- [ ] Execute end-to-end tests
- [ ] Security scanning (SAST, dependency scan)
- [ ] Generate coverage reports
- [ ] Performance tests

### 4. Quality Gates
- [ ] Minimum test coverage requirement
- [ ] No critical security vulnerabilities
- [ ] Code quality metrics (SonarQube)
- [ ] No linting errors
- [ ] All tests passing
- [ ] Performance benchmarks met

### 5. Deployment Stage
- [ ] Deploy to staging environment
- [ ] Run smoke tests
- [ ] Deploy to production
- [ ] Database migrations
- [ ] Zero-downtime deployment
- [ ] Rollback capability

### 6. Post-Deployment
- [ ] Health checks
- [ ] Monitoring and alerting
- [ ] Performance monitoring
- [ ] Error tracking
- [ ] Deployment notifications

## Popular CI/CD Platforms

### GitHub Actions
```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
  
  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build application
        run: npm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: dist/
  
  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy to production
        run: |
          # Deployment commands
          echo "Deploying to production..."
```

### GitLab CI
```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

.node_template:
  image: node:${NODE_VERSION}
  cache:
    paths:
      - node_modules/

test:
  extends: .node_template
  stage: test
  script:
    - npm ci
    - npm run lint
    - npm test -- --coverage
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

build:
  extends: .node_template
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

deploy_staging:
  stage: deploy
  script:
    - echo "Deploying to staging..."
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

deploy_production:
  stage: deploy
  script:
    - echo "Deploying to production..."
  environment:
    name: production
    url: https://example.com
  only:
    - main
  when: manual
```

### Jenkins Pipeline
```groovy
// Jenkinsfile
pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Test') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Unit Tests') {
                    steps {
                        sh 'npm test'
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh './deploy.sh production'
            }
        }
    }
    
    post {
        always {
            junit 'test-results/**/*.xml'
            publishHTML([
                reportDir: 'coverage',
                reportFiles: 'index.html',
                reportName: 'Coverage Report'
            ])
        }
        failure {
            emailext(
                subject: "Build Failed: ${env.JOB_NAME}",
                body: "Build failed. Check ${env.BUILD_URL}",
                to: "${env.DEVELOPER_EMAIL}"
            )
        }
    }
}
```

### CircleCI
```yaml
# .circleci/config.yml
version: 2.1

executors:
  node:
    docker:
      - image: cimg/node:18.0

jobs:
  test:
    executor: node
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-deps-{{ checksum "package-lock.json" }}
      - run: npm ci
      - save_cache:
          key: v1-deps-{{ checksum "package-lock.json" }}
          paths:
            - node_modules
      - run: npm run lint
      - run: npm test -- --coverage
      - store_test_results:
          path: test-results
      - store_artifacts:
          path: coverage

  build:
    executor: node
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-deps-{{ checksum "package-lock.json" }}
      - run: npm ci
      - run: npm run build
      - persist_to_workspace:
          root: .
          paths:
            - dist

  deploy:
    executor: node
    steps:
      - attach_workspace:
          at: .
      - run:
          name: Deploy
          command: |
            # Deployment commands

workflows:
  version: 2
  build-test-deploy:
    jobs:
      - test
      - build:
          requires:
            - test
      - deploy:
          requires:
            - build
          filters:
            branches:
              only: main
```

## Docker Integration

### Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Docker Compose for Testing
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=test
      - DATABASE_URL=postgresql://user:pass@db:5432/testdb
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: testdb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
```

## Deployment Strategies

### Blue-Green Deployment
```yaml
# Switch traffic between two identical environments
- name: Deploy to green
  run: deploy.sh green
  
- name: Test green environment
  run: smoke-test.sh green
  
- name: Switch traffic to green
  run: switch-traffic.sh green
  
- name: Keep blue as backup
  run: echo "Blue environment available for rollback"
```

### Rolling Deployment
```yaml
# Update instances one at a time
- name: Rolling update
  run: |
    for instance in $(get-instances); do
      update-instance $instance
      wait-for-health $instance
      sleep 30
    done
```

### Canary Deployment
```yaml
# Route small percentage of traffic to new version
- name: Deploy canary
  run: deploy.sh canary 10%  # 10% traffic
  
- name: Monitor metrics
  run: monitor.sh --duration 30m
  
- name: Promote to full deployment
  run: deploy.sh production 100%
```

## Best Practices

### Security
- [ ] Store secrets in secure vault (not in code)
- [ ] Use environment variables
- [ ] Scan for vulnerabilities
- [ ] Sign and verify artifacts
- [ ] Implement RBAC for deployments
- [ ] Audit deployment activities

### Performance
- [ ] Cache dependencies
- [ ] Parallelize jobs when possible
- [ ] Use incremental builds
- [ ] Optimize Docker layers
- [ ] Use build artifacts

### Reliability
- [ ] Implement automatic rollback
- [ ] Set appropriate timeouts
- [ ] Add health checks
- [ ] Monitor deployment status
- [ ] Keep deployment history
- [ ] Document rollback procedure

### Notifications
- [ ] Slack/Teams integration
- [ ] Email notifications
- [ ] Status badges
- [ ] Deployment announcements
- [ ] Failure alerts

## Monitoring Integration
```yaml
- name: Send metrics to monitoring
  run: |
    curl -X POST https://monitoring.example.com/deploy \
      -d "service=myapp&version=$VERSION&status=success"
```

## Quality Metrics
- [ ] Build success rate
- [ ] Test pass rate
- [ ] Code coverage trend
- [ ] Deployment frequency
- [ ] Lead time for changes
- [ ] Mean time to recovery
- [ ] Change failure rate

