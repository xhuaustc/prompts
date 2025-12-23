# Docker Containerization

## Overview
Containerize applications using Docker for consistent deployment across different environments.

## Containerization Checklist

### 1. Dockerfile Creation
- [ ] Choose appropriate base image
- [ ] Use multi-stage builds
- [ ] Minimize image size
- [ ] Optimize layer caching
- [ ] Set proper working directory
- [ ] Copy only necessary files
- [ ] Install dependencies efficiently
- [ ] Set appropriate user (non-root)
- [ ] Define health checks
- [ ] Specify entry point and CMD

### 2. Image Optimization
- [ ] Use .dockerignore file
- [ ] Minimize number of layers
- [ ] Order instructions by change frequency
- [ ] Combine RUN commands
- [ ] Clean up in same layer
- [ ] Use specific image tags (not :latest)
- [ ] Scan for vulnerabilities

### 3. Configuration
- [ ] Use environment variables
- [ ] Externalize configuration
- [ ] Support multiple environments
- [ ] Configure logging
- [ ] Set resource limits
- [ ] Configure networking

## Dockerfile Best Practices

### Node.js Application
```dockerfile
# Multi-stage build for Node.js
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy application code
COPY . .

# Build application (if needed)
RUN npm run build

# Production stage
FROM node:18-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy built files from builder
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs package*.json ./

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Start application
CMD ["node", "dist/index.js"]
```

### Python Application
```dockerfile
# Multi-stage build for Python
FROM python:3.11-slim AS builder

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Production stage
FROM python:3.11-slim

# Create non-root user
RUN useradd -m -u 1001 appuser

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /root/.local /home/appuser/.local

# Copy application code
COPY --chown=appuser:appuser . .

# Switch to non-root user
USER appuser

# Add local bin to PATH
ENV PATH=/home/appuser/.local/bin:$PATH

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD python healthcheck.py

CMD ["python", "app.py"]
```

### Go Application
```dockerfile
# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Production stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy binary from builder
COPY --from=builder /app/main .

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["./main"]
```

## .dockerignore File
```
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.env.*
.DS_Store
coverage
dist
*.log
.vscode
.idea
test
tests
*.test.js
*.spec.js
.github
docs
```

## Docker Compose

### Development Environment
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: development
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - app-network

volumes:
  postgres-data:
  redis-data:

networks:
  app-network:
    driver: bridge
```

### Production Environment
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  app:
    image: myapp:${VERSION:-latest}
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
    networks:
      - app-network
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

## Docker Commands

### Build and Run
```bash
# Build image
docker build -t myapp:latest .

# Build with specific target
docker build --target production -t myapp:prod .

# Run container
docker run -d -p 3000:3000 --name myapp myapp:latest

# Run with environment variables
docker run -d -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgres://... \
  --name myapp myapp:latest

# Run with volume
docker run -d -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  --name myapp myapp:latest
```

### Manage Containers
```bash
# List running containers
docker ps

# List all containers
docker ps -a

# View logs
docker logs myapp
docker logs -f myapp  # Follow logs

# Execute command in container
docker exec -it myapp sh
docker exec myapp npm test

# Stop container
docker stop myapp

# Start container
docker start myapp

# Restart container
docker restart myapp

# Remove container
docker rm myapp
docker rm -f myapp  # Force remove
```

### Manage Images
```bash
# List images
docker images

# Remove image
docker rmi myapp:latest

# Prune unused images
docker image prune

# Save image to file
docker save myapp:latest | gzip > myapp.tar.gz

# Load image from file
docker load < myapp.tar.gz

# Tag image
docker tag myapp:latest myregistry.com/myapp:v1.0.0

# Push image
docker push myregistry.com/myapp:v1.0.0
```

### Docker Compose Commands
```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs
docker-compose logs -f app

# Execute command
docker-compose exec app sh

# Build services
docker-compose build

# Restart service
docker-compose restart app

# Scale service
docker-compose up -d --scale app=3
```

## Security Best Practices

### Image Security
- [ ] Use official base images
- [ ] Use specific version tags
- [ ] Scan images for vulnerabilities
- [ ] Keep base images updated
- [ ] Don't run as root
- [ ] Don't store secrets in images
- [ ] Use read-only root filesystem when possible

```dockerfile
# Security hardening
FROM node:18-alpine

# Create non-root user
RUN addgroup -g 1001 nodejs && \
    adduser -S nodejs -u 1001

# Install only necessary packages
RUN apk add --no-cache tini

# Use tini for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Set security options
USER nodejs
WORKDIR /app

# Read-only root filesystem
# Use --read-only flag when running container
# docker run --read-only --tmpfs /tmp myapp
```

### Runtime Security
```bash
# Run with security options
docker run -d \
  --read-only \
  --tmpfs /tmp \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  --security-opt=no-new-privileges \
  --user 1001:1001 \
  myapp:latest
```

## Debugging Tips

```bash
# View resource usage
docker stats

# Inspect container
docker inspect myapp

# Check container health
docker inspect --format='{{.State.Health.Status}}' myapp

# Build with no cache
docker build --no-cache -t myapp:latest .

# View image layers
docker history myapp:latest

# Analyze image size
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

## Health Checks

### Simple HTTP Check
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
```

### Custom Health Check Script
```javascript
// healthcheck.js
const http = require('http');

const options = {
  host: 'localhost',
  port: 3000,
  path: '/health',
  timeout: 2000
};

const healthCheck = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

healthCheck.on('error', () => {
  process.exit(1);
});

healthCheck.end();
```

