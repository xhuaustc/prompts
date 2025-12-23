# Database Migration

## Overview
Create safe, reversible database migrations that modify schema without data loss or downtime.

## Migration Principles
1. **Reversible**: Always provide rollback capability
2. **Safe**: Test thoroughly before production
3. **Incremental**: Make small, focused changes
4. **Idempotent**: Safe to run multiple times
5. **Documented**: Clear description of changes

## Migration Checklist

### Planning
- [ ] Document current schema state
- [ ] Define migration requirements
- [ ] Identify affected tables and data
- [ ] Plan for data backups
- [ ] Estimate migration duration
- [ ] Consider impact on running application
- [ ] Plan rollback strategy

### Development
- [ ] Write migration (up)
- [ ] Write rollback (down)
- [ ] Test on development database
- [ ] Verify data integrity
- [ ] Check application compatibility
- [ ] Document breaking changes
- [ ] Review with team

### Testing
- [ ] Test migration on copy of production data
- [ ] Test rollback procedure
- [ ] Verify application still works
- [ ] Check query performance
- [ ] Test edge cases
- [ ] Load test if changing structure
- [ ] Verify data consistency

### Deployment
- [ ] Backup production database
- [ ] Schedule maintenance window (if needed)
- [ ] Run migration in staging first
- [ ] Monitor migration progress
- [ ] Verify migration success
- [ ] Deploy application changes
- [ ] Monitor application health

## Migration Types

### 1. Add Column

**Safe Migration:**
```sql
-- Up: Add nullable column (safe for running app)
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Later, after deployment
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;
```

**Rollback:**
```sql
-- Down
ALTER TABLE users DROP COLUMN phone;
```

### 2. Remove Column

**Safe Migration (Multi-step):**
```sql
-- Step 1: Stop using column in application code
-- Deploy application

-- Step 2: Drop column
ALTER TABLE users DROP COLUMN deprecated_field;
```

### 3. Rename Column

**Safe Migration:**
```sql
-- Up: Add new column, copy data
ALTER TABLE users ADD COLUMN email_address VARCHAR(255);
UPDATE users SET email_address = email;

-- Deploy application supporting both columns

-- Later migration: Drop old column
ALTER TABLE users DROP COLUMN email;
```

### 4. Change Column Type

**Safe Migration:**
```sql
-- Up: Create new column with new type
ALTER TABLE products ADD COLUMN price_cents BIGINT;

-- Copy and convert data
UPDATE products SET price_cents = CAST(price * 100 AS BIGINT);

-- Deploy application using new column

-- Later: Drop old column
ALTER TABLE products DROP COLUMN price;
```

### 5. Add Index

```sql
-- Up: Create index concurrently (PostgreSQL)
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);

-- Down
DROP INDEX idx_users_email;
```

### 6. Add Foreign Key

```sql
-- Up: Add constraint
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_user 
FOREIGN KEY (user_id) REFERENCES users(id);

-- Down
ALTER TABLE orders DROP CONSTRAINT fk_orders_user;
```

### 7. Create Table

```sql
-- Up
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    action VARCHAR(50) NOT NULL,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Down
DROP TABLE IF EXISTS audit_logs;
```

## Migration Tools & Frameworks

### Node.js - Sequelize
```javascript
// migrations/20240101000000-add-user-phone.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'phone', {
      type: Sequelize.STRING(20),
      allowNull: true
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'phone');
  }
};
```

### Node.js - Knex
```javascript
// migrations/20240101000000_add_user_phone.js
exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    table.string('phone', 20);
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('phone');
  });
};
```

### Python - Alembic
```python
# migrations/versions/001_add_user_phone.py
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.add_column('users',
        sa.Column('phone', sa.String(20), nullable=True)
    )

def downgrade():
    op.drop_column('users', 'phone')
```

### Ruby on Rails
```ruby
# db/migrate/20240101000000_add_phone_to_users.rb
class AddPhoneToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :phone, :string, limit: 20
  end
end
```

## Zero-Downtime Migrations

### Strategy 1: Expand-Contract Pattern

**Phase 1: Expand** (Add new schema)
```sql
-- Add new column
ALTER TABLE users ADD COLUMN new_email VARCHAR(255);
```

**Phase 2: Dual-Write** (Write to both old and new)
```javascript
// Application writes to both columns
await db.query(
  'UPDATE users SET email = $1, new_email = $1 WHERE id = $2',
  [email, userId]
);
```

**Phase 3: Backfill** (Migrate existing data)
```sql
-- Backfill data in batches
UPDATE users 
SET new_email = email 
WHERE new_email IS NULL 
LIMIT 10000;
```

**Phase 4: Dual-Read** (Read from new, fallback to old)
```javascript
// Read from new column, fallback to old
const email = user.new_email || user.email;
```

**Phase 5: Contract** (Remove old schema)
```sql
-- Drop old column
ALTER TABLE users DROP COLUMN email;
-- Rename new column
ALTER TABLE users RENAME COLUMN new_email TO email;
```

### Strategy 2: Shadow Tables

```sql
-- Create new table structure
CREATE TABLE users_new (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    -- new schema
);

-- Copy data
INSERT INTO users_new SELECT * FROM users;

-- Swap tables (in transaction)
BEGIN;
ALTER TABLE users RENAME TO users_old;
ALTER TABLE users_new RENAME TO users;
COMMIT;

-- Later, drop old table
DROP TABLE users_old;
```

## Data Migrations

### Batch Processing
```javascript
// Migrate large datasets in batches
async function migrateUserData() {
  const batchSize = 1000;
  let offset = 0;
  
  while (true) {
    const users = await db.query(
      'SELECT * FROM users LIMIT $1 OFFSET $2',
      [batchSize, offset]
    );
    
    if (users.length === 0) break;
    
    // Process batch
    for (const user of users) {
      await processUser(user);
    }
    
    offset += batchSize;
    console.log(`Processed ${offset} users`);
  }
}
```

### Background Jobs
```javascript
// Queue data migration as background jobs
for (let userId of userIds) {
  await queue.add('migrate-user-data', { userId });
}
```

## Best Practices

### DO
- [ ] Always create backups before migration
- [ ] Test migrations on production-like data
- [ ] Use transactions where possible
- [ ] Make migrations reversible
- [ ] Version migrations sequentially
- [ ] Add indexes concurrently (PostgreSQL)
- [ ] Process large data changes in batches
- [ ] Monitor migration progress
- [ ] Document breaking changes
- [ ] Test rollback procedure

### DON'T
- [ ] Don't drop columns immediately
- [ ] Don't rename columns in one step
- [ ] Don't change column types directly
- [ ] Don't run migrations during peak hours
- [ ] Don't skip testing on production data
- [ ] Don't forget to update application code
- [ ] Don't make non-reversible changes
- [ ] Don't migrate production without backup

## Migration Naming Convention

```
YYYYMMDDHHMMSS_descriptive_name.ext

Examples:
20240101120000_create_users_table.sql
20240101130000_add_email_to_users.sql
20240101140000_create_orders_index.sql
```

## Troubleshooting

### Migration Fails
1. Check error message and logs
2. Verify database state
3. Rollback migration
4. Fix migration script
5. Test in development
6. Retry in staging
7. Apply to production

### Performance Issues
- Use CONCURRENTLY for index creation
- Batch large data updates
- Add indexes before foreign keys
- Monitor database locks
- Consider maintenance window

