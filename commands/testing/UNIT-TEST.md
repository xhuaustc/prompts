# Unit Test Generation

## Overview
Generate comprehensive unit tests with high coverage, clear assertions, and proper test organization.

## Test Principles
1. **Isolated**: Each test is independent
2. **Fast**: Tests run quickly
3. **Repeatable**: Same results every time
4. **Self-validating**: Clear pass/fail
5. **Comprehensive**: Cover all scenarios

## Test Coverage Checklist
- [ ] Happy path (normal execution)
- [ ] Edge cases and boundary conditions
- [ ] Error conditions and exceptions
- [ ] Invalid inputs and validation
- [ ] Null/undefined/empty values
- [ ] Concurrent operations (if applicable)
- [ ] Integration points (mocked)
- [ ] State changes and side effects

## Test Structure (AAA Pattern)
```
// Arrange - Set up test data and preconditions
// Act - Execute the code under test
// Assert - Verify the results
```

## Naming Convention
```
test_<function>_<scenario>_<expected_result>
```

## Best Practices
- [ ] Use descriptive test names
- [ ] One assertion per test (when possible)
- [ ] Mock external dependencies
- [ ] Use test fixtures for setup
- [ ] Clean up after tests
- [ ] Avoid test interdependencies
- [ ] Keep tests simple and readable
- [ ] Test behavior, not implementation
- [ ] Use parameterized tests for similar cases
- [ ] Add comments for complex test scenarios

## Common Frameworks
- **JavaScript/TypeScript**: Jest, Vitest, Mocha
- **Python**: pytest, unittest
- **Java**: JUnit, TestNG
- **C#**: xUnit, NUnit
- **Go**: testing package
- **Ruby**: RSpec, Minitest

## Example Test Cases
1. Valid input returns expected output
2. Invalid input throws appropriate error
3. Boundary values handled correctly
4. Empty/null inputs handled properly
5. State is modified correctly
6. Side effects occur as expected
7. Async operations complete successfully
8. Error callbacks are triggered

