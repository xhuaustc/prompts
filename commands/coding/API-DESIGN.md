# API Design

## Overview
Design RESTful APIs that are intuitive, consistent, and follow industry best practices.

## API Design Principles
1. **RESTful**: Follow REST architectural principles
2. **Consistent**: Uniform naming and structure
3. **Intuitive**: Easy to understand and use
4. **Versioned**: Support API versioning
5. **Documented**: Clear API documentation
6. **Secure**: Implement proper authentication and authorization

## Design Checklist

### Endpoints
- [ ] Use nouns for resources (not verbs)
- [ ] Use plural names for collections
- [ ] Implement proper HTTP methods (GET, POST, PUT, PATCH, DELETE)
- [ ] Use nested routes for related resources
- [ ] Follow consistent naming conventions
- [ ] Use kebab-case or snake_case (be consistent)

### Request/Response
- [ ] Use appropriate status codes
- [ ] Return consistent response format
- [ ] Include metadata (pagination, total count)
- [ ] Support filtering, sorting, pagination
- [ ] Implement field selection
- [ ] Use proper content types

### Error Handling
- [ ] Return meaningful error messages
- [ ] Use standard error format
- [ ] Include error codes
- [ ] Provide helpful error details
- [ ] Log errors appropriately

### Security
- [ ] Implement authentication (JWT, OAuth)
- [ ] Add authorization checks
- [ ] Validate all inputs
- [ ] Use HTTPS only
- [ ] Implement rate limiting
- [ ] Add CORS configuration
- [ ] Sanitize output to prevent XSS

### Documentation
- [ ] Document all endpoints
- [ ] Provide request/response examples
- [ ] Document authentication requirements
- [ ] Include error response examples
- [ ] Provide SDK/client examples
- [ ] Use OpenAPI/Swagger specification

## Example Structure
```
GET    /api/v1/users          - List users
POST   /api/v1/users          - Create user
GET    /api/v1/users/{id}     - Get user
PUT    /api/v1/users/{id}     - Update user
PATCH  /api/v1/users/{id}     - Partial update
DELETE /api/v1/users/{id}     - Delete user
GET    /api/v1/users/{id}/posts - Get user's posts
```

