# Debug Issue

## Overview
Systematically debug and resolve issues using proven debugging techniques and methodologies.

## Debugging Process

### 1. Reproduce the Issue
- [ ] Identify steps to reproduce
- [ ] Document expected vs actual behavior
- [ ] Check if issue is consistent or intermittent
- [ ] Test in different environments
- [ ] Verify preconditions

### 2. Gather Information
- [ ] Check error messages and stack traces
- [ ] Review application logs
- [ ] Examine recent code changes
- [ ] Check system resource usage
- [ ] Review related bug reports
- [ ] Check external dependencies status

### 3. Isolate the Problem
- [ ] Narrow down the scope
- [ ] Identify affected components
- [ ] Rule out unrelated code
- [ ] Create minimal reproduction case
- [ ] Test individual components
- [ ] Use binary search to locate issue

### 4. Analyze Root Cause
- [ ] Use debugger to step through code
- [ ] Add logging/console statements
- [ ] Check variable values at different points
- [ ] Verify data flow
- [ ] Review business logic
- [ ] Check for race conditions
- [ ] Examine edge cases

### 5. Common Bug Types

#### Logic Errors
- [ ] Incorrect conditions (if/else)
- [ ] Wrong loop boundaries
- [ ] Incorrect calculations
- [ ] Missing validations

#### Data Issues
- [ ] Null/undefined values
- [ ] Type mismatches
- [ ] Incorrect data transformations
- [ ] Data corruption

#### State Management
- [ ] Incorrect state updates
- [ ] Race conditions
- [ ] State synchronization issues
- [ ] Memory leaks

#### Integration Issues
- [ ] API communication failures
- [ ] Database connection problems
- [ ] Third-party service errors
- [ ] Authentication failures

### 6. Debug Tools & Techniques

#### Debugging Tools
- **Browser DevTools**: Chrome, Firefox, Safari
- **IDE Debuggers**: VSCode, IntelliJ, PyCharm
- **Network Tools**: Postman, curl, browser network tab
- **Logging**: Winston, Log4j, Sentry
- **Profilers**: Chrome Profiler, Python cProfile

#### Techniques
- [ ] Breakpoints and step-through
- [ ] Watch expressions
- [ ] Call stack analysis
- [ ] Console logging
- [ ] Rubber duck debugging
- [ ] Code review
- [ ] Unit test isolation

### 7. Fix and Verify
- [ ] Implement fix
- [ ] Add test cases to prevent regression
- [ ] Verify fix resolves the issue
- [ ] Test edge cases
- [ ] Check for side effects
- [ ] Review performance impact
- [ ] Update documentation

### 8. Prevention
- [ ] Add validation to prevent similar issues
- [ ] Improve error handling
- [ ] Add relevant tests
- [ ] Update coding standards
- [ ] Document lessons learned

## Debugging Checklist

### Quick Checks
- [ ] Is the code actually being executed?
- [ ] Are variables what you expect?
- [ ] Is the data format correct?
- [ ] Are there any typos?
- [ ] Are dependencies up to date?
- [ ] Is the environment configured correctly?

### Common Mistakes
- [ ] Off-by-one errors
- [ ] Async/await issues
- [ ] Incorrect variable scope
- [ ] Type coercion problems
- [ ] Missing error handling
- [ ] Incorrect assumptions
- [ ] Copy-paste errors

## Best Practices
- Debug systematically, not randomly
- Make one change at a time
- Document your findings
- Use version control to track changes
- Take breaks when stuck
- Ask for help when needed
- Learn from each bug
- Write tests to prevent recurrence

