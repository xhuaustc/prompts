# Error Handling

## Overview
Implement comprehensive error handling that gracefully manages failures and provides useful feedback.

## Error Handling Principles
1. **Fail Fast**: Detect and report errors early
2. **Graceful Degradation**: Continue operation when possible
3. **User-Friendly**: Provide clear, actionable messages
4. **Logged**: Record errors for debugging
5. **Secure**: Don't expose sensitive information

## Error Handling Checklist

### Input Validation
- [ ] Validate all user inputs
- [ ] Check data types and formats
- [ ] Verify required fields
- [ ] Validate ranges and constraints
- [ ] Sanitize inputs to prevent injection
- [ ] Provide clear validation messages

### Exception Handling
- [ ] Use try-catch blocks appropriately
- [ ] Catch specific exceptions, not generic ones
- [ ] Handle errors at the right level
- [ ] Clean up resources in finally blocks
- [ ] Don't swallow exceptions silently
- [ ] Log exceptions with context

### API Error Handling
- [ ] Return appropriate HTTP status codes
- [ ] Use consistent error response format
- [ ] Include error codes and messages
- [ ] Provide request ID for tracking
- [ ] Don't expose internal details
- [ ] Document possible error responses

### Database Error Handling
- [ ] Handle connection failures
- [ ] Manage transaction rollbacks
- [ ] Handle constraint violations
- [ ] Deal with deadlocks and timeouts
- [ ] Validate data before queries
- [ ] Use parameterized queries

### Async Error Handling
- [ ] Handle promise rejections
- [ ] Use try-catch with async/await
- [ ] Implement timeout mechanisms
- [ ] Handle concurrent operation failures
- [ ] Manage callback errors

## Error Response Format

### API Errors
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "requestId": "req_123456",
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

### Application Errors
```javascript
class ApplicationError extends Error {
  constructor(message, code, statusCode, details) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
```

## Error Categories

### Client Errors (4xx)
- **400 Bad Request**: Invalid request format
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource doesn't exist
- **409 Conflict**: Resource conflict
- **422 Unprocessable**: Validation failed
- **429 Too Many Requests**: Rate limit exceeded

### Server Errors (5xx)
- **500 Internal Server Error**: Generic server error
- **502 Bad Gateway**: Upstream service error
- **503 Service Unavailable**: Temporary unavailability
- **504 Gateway Timeout**: Upstream timeout

## Error Handling Patterns

### Try-Catch Pattern
```javascript
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  logger.error('Operation failed', { error, context });
  throw new ApplicationError(
    'Failed to process request',
    'OPERATION_FAILED',
    500
  );
}
```

### Error Boundary (React)
```javascript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
    this.setState({ hasError: true });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### Retry Pattern
```javascript
async function retryOperation(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(Math.pow(2, i) * 1000); // Exponential backoff
    }
  }
}
```

### Circuit Breaker Pattern
```javascript
class CircuitBreaker {
  constructor(threshold, timeout) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  async execute(fn) {
    if (this.state === 'OPEN') {
      throw new Error('Circuit breaker is OPEN');
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
}
```

## Logging Best Practices
- [ ] Log errors with full context
- [ ] Include timestamps
- [ ] Add request/correlation IDs
- [ ] Log stack traces
- [ ] Use appropriate log levels
- [ ] Don't log sensitive data
- [ ] Use structured logging
- [ ] Implement log aggregation

## User-Facing Errors
- [ ] Use clear, non-technical language
- [ ] Explain what went wrong
- [ ] Suggest how to fix it
- [ ] Provide support contact info
- [ ] Use friendly tone
- [ ] Avoid technical jargon
- [ ] Include helpful links

## Security Considerations
- [ ] Don't expose stack traces to users
- [ ] Don't reveal system internals
- [ ] Sanitize error messages
- [ ] Log security events
- [ ] Rate limit error responses
- [ ] Monitor error patterns for attacks

## Testing Error Handling
- [ ] Test all error paths
- [ ] Verify error messages
- [ ] Test edge cases
- [ ] Simulate failures
- [ ] Test error recovery
- [ ] Verify logging works

