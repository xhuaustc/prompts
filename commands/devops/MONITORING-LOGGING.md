# Monitoring & Logging

## Overview
Implement comprehensive monitoring and logging to track application health, performance, and issues.

## Monitoring Strategy

### 1. Application Monitoring
- [ ] Track application uptime
- [ ] Monitor response times
- [ ] Track error rates
- [ ] Monitor resource usage (CPU, Memory)
- [ ] Track custom business metrics
- [ ] Monitor API endpoints
- [ ] Track user activity
- [ ] Monitor background jobs

### 2. Infrastructure Monitoring
- [ ] Server health checks
- [ ] Database performance
- [ ] Cache hit rates
- [ ] Network latency
- [ ] Disk usage
- [ ] Container health
- [ ] Load balancer status
- [ ] CDN performance

### 3. Log Management
- [ ] Centralized logging
- [ ] Structured logging
- [ ] Log aggregation
- [ ] Log retention policy
- [ ] Log analysis
- [ ] Real-time log streaming
- [ ] Log-based alerting

### 4. Alerting
- [ ] Define alert thresholds
- [ ] Configure notification channels
- [ ] Set up on-call rotation
- [ ] Escalation policies
- [ ] Alert acknowledgment
- [ ] Alert history tracking

## Key Metrics to Monitor

### Golden Signals (SRE)

**1. Latency**
```javascript
// Track request duration
const start = Date.now();
// Process request
const duration = Date.now() - start;
metrics.recordLatency('api.request', duration, { endpoint: '/api/users' });
```

**2. Traffic**
```javascript
// Track request rate
metrics.incrementCounter('api.requests', { endpoint: '/api/users' });
```

**3. Errors**
```javascript
// Track error rate
try {
  // Operation
} catch (error) {
  metrics.incrementCounter('api.errors', { 
    endpoint: '/api/users',
    error_type: error.name 
  });
  throw error;
}
```

**4. Saturation**
```javascript
// Track resource usage
metrics.gauge('system.memory.used', process.memoryUsage().heapUsed);
metrics.gauge('system.cpu.usage', cpuUsage);
```

### Application Metrics

**RED Method** (Rate, Errors, Duration)
```javascript
// Using Prometheus client
const promClient = require('prom-client');

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Middleware to track metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
    httpRequestTotal
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .inc();
  });
  
  next();
});
```

### USE Method (Utilization, Saturation, Errors)
```javascript
// For resources like CPU, Memory, Disk, Network

// CPU Utilization
metrics.gauge('cpu.utilization', cpuUtilization);

// Memory Saturation
metrics.gauge('memory.saturation', memoryUsage / totalMemory);

// Disk Errors
metrics.counter('disk.errors', diskErrorCount);
```

## Logging Implementation

### Structured Logging

**Node.js (Winston)**
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { 
    service: 'myapp',
    version: process.env.APP_VERSION 
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ 
      filename: 'error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'combined.log' 
    })
  ]
});

// Usage
logger.info('User logged in', { 
  userId: user.id, 
  email: user.email 
});

logger.error('Payment failed', {
  userId: user.id,
  amount: payment.amount,
  error: error.message,
  stack: error.stack
});
```

**Python (structlog)**
```python
import structlog

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()

# Usage
logger.info("user_login", user_id=user.id, email=user.email)
logger.error("payment_failed", 
    user_id=user.id, 
    amount=payment.amount,
    error=str(error)
)
```

### Log Levels
```javascript
logger.debug('Detailed debugging information');    // Development only
logger.info('General informational messages');     // Important events
logger.warn('Warning messages');                   // Potential issues
logger.error('Error messages');                    // Errors that need attention
logger.fatal('Critical errors');                   // System failure
```

### Correlation IDs
```javascript
// Add correlation ID to track requests across services
const { v4: uuidv4 } = require('uuid');

app.use((req, res, next) => {
  req.correlationId = req.headers['x-correlation-id'] || uuidv4();
  res.setHeader('x-correlation-id', req.correlationId);
  
  // Add to logger context
  req.logger = logger.child({ correlationId: req.correlationId });
  
  next();
});

// Use in code
req.logger.info('Processing request', { 
  path: req.path,
  method: req.method 
});
```

## Monitoring Tools

### Application Performance Monitoring (APM)

**New Relic**
```javascript
// newrelic.js
'use strict'

exports.config = {
  app_name: ['My Application'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: {
    level: 'info'
  },
  distributed_tracing: {
    enabled: true
  },
  transaction_tracer: {
    enabled: true
  }
};

// app.js
require('newrelic');
```

**Datadog**
```javascript
const tracer = require('dd-trace').init({
  service: 'myapp',
  env: process.env.NODE_ENV,
  version: process.env.APP_VERSION
});

// Custom metrics
const dogstatsd = require('node-dogstatsd').StatsD;
const metrics = new dogstatsd();

metrics.increment('api.requests');
metrics.gauge('users.active', activeUserCount);
metrics.histogram('api.response_time', duration);
```

**Sentry (Error Tracking)**
```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// Capture exceptions
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error);
}

// Add breadcrumbs
Sentry.addBreadcrumb({
  message: 'User action',
  category: 'user',
  data: { userId: user.id }
});
```

### Infrastructure Monitoring

**Prometheus**
```javascript
const promClient = require('prom-client');

// Create metrics
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status']
});

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'path', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
```

**Grafana Dashboard Configuration**
```json
{
  "dashboard": {
    "title": "Application Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])"
          }
        ]
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m])"
          }
        ]
      },
      {
        "title": "Response Time (p95)",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
          }
        ]
      }
    ]
  }
}
```

## Centralized Logging

### ELK Stack (Elasticsearch, Logstash, Kibana)

**Logstash Configuration**
```
input {
  file {
    path => "/var/log/myapp/*.log"
    start_position => "beginning"
    codec => json
  }
}

filter {
  json {
    source => "message"
  }
  
  date {
    match => [ "timestamp", "ISO8601" ]
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "myapp-%{+YYYY.MM.dd}"
  }
}
```

### Log Shipping (Filebeat)
```yaml
# filebeat.yml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /var/log/myapp/*.log
    json.keys_under_root: true
    json.add_error_key: true

output.elasticsearch:
  hosts: ["elasticsearch:9200"]
  index: "myapp-%{+yyyy.MM.dd}"

setup.kibana:
  host: "kibana:5601"
```

## Alerting Configuration

### Prometheus Alerts
```yaml
# prometheus-alerts.yml
groups:
  - name: application_alerts
    interval: 30s
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} errors per second"
      
      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"
          description: "95th percentile latency is {{ $value }}s"
      
      - alert: ServiceDown
        expr: up{job="myapp"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service is down"
          description: "{{ $labels.instance }} is down"
```

### AlertManager Configuration
```yaml
# alertmanager.yml
route:
  receiver: 'team-notifications'
  group_by: ['alertname', 'cluster']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  
  routes:
    - match:
        severity: critical
      receiver: 'pagerduty'
      continue: true
    
    - match:
        severity: warning
      receiver: 'slack'

receivers:
  - name: 'slack'
    slack_configs:
      - api_url: '${SLACK_WEBHOOK_URL}'
        channel: '#alerts'
        title: '{{ .GroupLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'
  
  - name: 'pagerduty'
    pagerduty_configs:
      - service_key: '${PAGERDUTY_KEY}'
```

## Best Practices

### Monitoring
- [ ] Monitor business metrics, not just technical
- [ ] Set up SLIs (Service Level Indicators)
- [ ] Define SLOs (Service Level Objectives)
- [ ] Create actionable alerts (avoid alert fatigue)
- [ ] Use dashboards for visualization
- [ ] Monitor dependencies
- [ ] Track deployment impact
- [ ] Regular review of metrics

### Logging
- [ ] Log at appropriate levels
- [ ] Include contextual information
- [ ] Use structured logging
- [ ] Don't log sensitive data (passwords, tokens)
- [ ] Include correlation IDs
- [ ] Log errors with stack traces
- [ ] Implement log rotation
- [ ] Set retention policies
- [ ] Make logs searchable
- [ ] Use consistent log formats

