# Code Comments & Documentation

## Overview
Add clear, meaningful comments and documentation strings that improve code understanding without cluttering.

## When to Comment

### DO Comment
- [ ] Complex algorithms or logic
- [ ] Non-obvious business rules
- [ ] Workarounds and why they exist
- [ ] Function/method purpose and usage
- [ ] Class and module overview
- [ ] Important assumptions
- [ ] Regex patterns explanation
- [ ] Performance considerations
- [ ] Security implications
- [ ] TODOs and FIXMEs

### DON'T Comment
- [ ] Obvious code (self-explanatory)
- [ ] What the code does (code shows this)
- [ ] Redundant information
- [ ] Outdated information
- [ ] Commented-out code (use version control)

## Comment Types

### 1. File/Module Header
```python
"""
Module: user_authentication.py
Description: Handles user authentication and session management
Author: Team Name
Date: 2024-01-01
"""
```

### 2. Class Documentation
```typescript
/**
 * Manages user sessions and authentication tokens
 * 
 * Handles login, logout, token refresh, and session validation.
 * Implements JWT-based authentication with refresh tokens.
 * 
 * @example
 * const auth = new AuthManager(config);
 * await auth.login(credentials);
 */
class AuthManager {
  // ...
}
```

### 3. Function/Method Documentation
```javascript
/**
 * Calculates the total price including taxes and discounts
 * 
 * @param {number} basePrice - Original price before modifications
 * @param {number} taxRate - Tax rate as decimal (e.g., 0.15 for 15%)
 * @param {number} discount - Discount amount to subtract
 * @returns {number} Final price after taxes and discounts
 * @throws {Error} If basePrice is negative
 * 
 * @example
 * const total = calculateTotal(100, 0.15, 10);
 * // Returns: 103.5 (100 - 10 = 90, 90 * 1.15 = 103.5)
 */
function calculateTotal(basePrice, taxRate, discount) {
  // ...
}
```

### 4. Inline Comments
```python
# Convert timestamp to datetime object for comparison
dt = datetime.fromtimestamp(timestamp)

# HACK: API sometimes returns null instead of empty array
# TODO: Remove this workaround when API v2 is released
users = response.data if response.data else []

# NOTE: This algorithm is O(n²) but n is always < 100
for item in items:
    for other in items:
        # ...
```

### 5. Complex Logic Explanation
```java
// Binary search requires sorted array
// Time complexity: O(log n)
// Space complexity: O(1)
public int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    
    // Continue while search space is not empty
    while (left <= right) {
        // Prevent integer overflow
        int mid = left + (right - left) / 2;
        // ...
    }
}
```

## Documentation Standards

### JSDoc (JavaScript/TypeScript)
```typescript
/**
 * @typedef {Object} User
 * @property {number} id - User ID
 * @property {string} name - User name
 * @property {string} email - User email
 */

/**
 * @param {User} user - User object
 * @returns {Promise<void>}
 */
async function saveUser(user) {
  // ...
}
```

### Python Docstrings
```python
def process_data(data: List[Dict], threshold: float = 0.5) -> List[Dict]:
    """
    Process data items above threshold.
    
    Args:
        data: List of data dictionaries
        threshold: Minimum value to include (default: 0.5)
        
    Returns:
        Filtered list of data items
        
    Raises:
        ValueError: If threshold is not between 0 and 1
        
    Examples:
        >>> process_data([{'value': 0.7}], 0.6)
        [{'value': 0.7}]
    """
    pass
```

### Java Javadoc
```java
/**
 * Manages database connections with pooling
 * 
 * <p>This class provides thread-safe connection pooling
 * with automatic reconnection and health checks.</p>
 * 
 * @author Team Name
 * @version 1.0
 * @since 2024-01-01
 */
public class ConnectionPool {
    /**
     * Gets a connection from the pool
     * 
     * @return available database connection
     * @throws SQLException if no connections available
     */
    public Connection getConnection() throws SQLException {
        // ...
    }
}
```

## Comment Style Guide
- [ ] Use complete sentences
- [ ] Start with capital letter
- [ ] End with period for complete sentences
- [ ] Keep comments up-to-date with code
- [ ] Use proper grammar and spelling
- [ ] Be concise but clear
- [ ] Avoid stating the obvious
- [ ] Explain "why" not "what"
- [ ] Use consistent formatting
- [ ] Place comments before the code they describe

## Special Comment Tags
- `TODO`: Work that needs to be done
- `FIXME`: Known issues that need fixing
- `HACK`: Temporary solution that should be improved
- `NOTE`: Important information
- `WARNING`: Dangerous or surprising behavior
- `OPTIMIZE`: Performance improvement opportunity
- `DEPRECATED`: Code that will be removed

## Best Practices
- Write comments as you code
- Review and update during refactoring
- Remove obsolete comments
- Use meaningful commit messages
- Generate documentation from comments
- Keep comment-to-code ratio balanced
- Focus on complex sections
- Document public APIs thoroughly
- Use examples for clarity

