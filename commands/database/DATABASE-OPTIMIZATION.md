# Database Optimization

## Overview
Optimize database performance through query optimization, indexing, and schema improvements.

## Database Optimization Areas

### 1. Query Optimization
- [ ] Identify slow queries
- [ ] Analyze query execution plans
- [ ] Optimize JOIN operations
- [ ] Reduce subqueries
- [ ] Use appropriate WHERE clauses
- [ ] Avoid SELECT *
- [ ] Limit result sets appropriately
- [ ] Use EXPLAIN/ANALYZE

### 2. Index Optimization
- [ ] Identify missing indexes
- [ ] Create indexes on frequently queried columns
- [ ] Create composite indexes for multi-column queries
- [ ] Remove unused indexes
- [ ] Monitor index usage
- [ ] Use covering indexes
- [ ] Consider partial indexes
- [ ] Balance read vs write performance

### 3. Schema Optimization
- [ ] Normalize where appropriate
- [ ] Denormalize for performance when needed
- [ ] Use appropriate data types
- [ ] Minimize column sizes
- [ ] Use appropriate table engines
- [ ] Partition large tables
- [ ] Archive old data
- [ ] Implement soft deletes carefully

### 4. Connection Management
- [ ] Implement connection pooling
- [ ] Configure pool size appropriately
- [ ] Handle connection timeouts
- [ ] Reuse connections
- [ ] Close connections properly
- [ ] Monitor connection usage

## Query Optimization Techniques

### Analyze Query Performance

**PostgreSQL:**
```sql
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > NOW() - INTERVAL '1 year'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC
LIMIT 100;
```

**MySQL:**
```sql
EXPLAIN FORMAT=JSON
SELECT * FROM users WHERE email = 'user@example.com';
```

### Avoid N+1 Queries

**Bad:**
```javascript
// N+1 Query Problem
const users = await User.findAll();
for (const user of users) {
  user.posts = await Post.findAll({ where: { userId: user.id } });
}
```

**Good:**
```javascript
// Single Query with JOIN
const users = await User.findAll({
  include: [{ model: Post }]
});

// OR use DataLoader for GraphQL
const posts = await postLoader.loadMany(userIds);
```

### Use Proper Indexes

```sql
-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);

-- Partial index
CREATE INDEX idx_active_users ON users(email) WHERE active = true;

-- Covering index
CREATE INDEX idx_users_cover ON users(id, name, email);
```

### Optimize JOINs

```sql
-- Use INNER JOIN instead of subqueries
-- BAD
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM orders WHERE total > 100);

-- GOOD
SELECT DISTINCT u.* 
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 100;
```

### Limit Result Sets

```sql
-- Always use LIMIT for large result sets
SELECT * FROM logs 
WHERE created_at > NOW() - INTERVAL '1 day'
ORDER BY created_at DESC
LIMIT 1000;

-- Use pagination for large datasets
SELECT * FROM products
ORDER BY created_at DESC
LIMIT 50 OFFSET 100;
```

### Avoid Functions on Indexed Columns

```sql
-- BAD: Function prevents index usage
SELECT * FROM users WHERE LOWER(email) = 'user@example.com';

-- GOOD: Use functional index or store lowercase
CREATE INDEX idx_users_email_lower ON users(LOWER(email));
-- OR
SELECT * FROM users WHERE email = LOWER('user@example.com');
```

## Indexing Best Practices

### When to Create Indexes
- [ ] Columns in WHERE clauses
- [ ] Columns in JOIN conditions
- [ ] Columns in ORDER BY
- [ ] Columns in GROUP BY
- [ ] Foreign key columns
- [ ] Columns used in DISTINCT

### When NOT to Index
- [ ] Small tables (< 1000 rows)
- [ ] Columns with low cardinality
- [ ] Frequently updated columns
- [ ] Large text/blob columns
- [ ] Columns rarely used in queries

### Index Monitoring

```sql
-- PostgreSQL: Find unused indexes
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND indexname NOT LIKE 'pk_%'
ORDER BY pg_relation_size(indexrelid) DESC;

-- MySQL: Check index usage
SELECT * FROM sys.schema_unused_indexes;
```

## Connection Pooling

### Node.js (PostgreSQL)
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,              // Maximum pool size
  min: 5,               // Minimum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Use pool for queries
const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
```

### Python (SQLAlchemy)
```python
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

engine = create_engine(
    'postgresql://user:password@localhost/dbname',
    poolclass=QueuePool,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
    pool_recycle=3600
)
```

## Caching Strategies

### Query Result Caching
```javascript
const cache = new Map();

async function getCachedUser(userId) {
  const cacheKey = `user:${userId}`;
  
  // Check cache
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  // Query database
  const user = await User.findById(userId);
  
  // Store in cache
  cache.set(cacheKey, user);
  setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000); // 5 min TTL
  
  return user;
}
```

### Redis Caching
```javascript
const redis = require('redis');
const client = redis.createClient();

async function getCachedData(key, fetchFn, ttl = 3600) {
  // Try cache first
  const cached = await client.get(key);
  if (cached) return JSON.parse(cached);
  
  // Fetch from database
  const data = await fetchFn();
  
  // Store in cache
  await client.setEx(key, ttl, JSON.stringify(data));
  
  return data;
}
```

## Table Partitioning

```sql
-- Partition by range (date)
CREATE TABLE orders (
    id SERIAL,
    user_id INT,
    total DECIMAL(10,2),
    created_at TIMESTAMP
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2024_q1 PARTITION OF orders
    FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');

CREATE TABLE orders_2024_q2 PARTITION OF orders
    FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');
```

## Monitoring & Maintenance

### Performance Monitoring
- [ ] Track slow queries
- [ ] Monitor query execution time
- [ ] Check database CPU/memory usage
- [ ] Monitor connection pool usage
- [ ] Track cache hit rates
- [ ] Monitor disk I/O
- [ ] Check replication lag

### Regular Maintenance
```sql
-- PostgreSQL: Vacuum and analyze
VACUUM ANALYZE;

-- Update statistics
ANALYZE users;

-- Rebuild indexes
REINDEX TABLE users;

-- MySQL: Optimize tables
OPTIMIZE TABLE users;
```

## Best Practices Checklist
- [ ] Use prepared statements/parameterized queries
- [ ] Implement proper error handling
- [ ] Use transactions for multiple operations
- [ ] Close connections properly
- [ ] Monitor query performance regularly
- [ ] Keep database statistics updated
- [ ] Regular backup and recovery testing
- [ ] Use read replicas for read-heavy workloads
- [ ] Implement query timeout limits
- [ ] Log slow queries for analysis

