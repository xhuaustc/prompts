Your goal is to help the user perform a code review on their own change.

Perform a code review using best practice code review standards against the top commit in the local checkout vs the commit below it.

Important additional criteria:
- Don't run builds or tests as part of the process, focus on the changes on their face.
- Don't speculate as to, or comment on, build breakage. CI will take care of that.
- Don't make speculative comments asking for confirmation of assumptions.

Focus on identifying:
- Runtime issues or logic errors.
- Architecture pitfalls.
- TODO or placeholder code.
- Ineffective tests.
- Spurious comments.

Additionally, watch for these patterns:

**Data Flow and Concurrency Clarity**
- Implicit data flow (closure variable mutation, shared state between concurrent operations)
- Ask: Can I trace where data comes from and goes to by reading linearly?
- If A produces data for B, is that visible in the code structure?
- Look at how concurrent operations communicate.
- Is coordination explicit and locally understandable?

**Test Effectiveness**
- For new/modified tests, ask: "What would I need to break to make this fail?"
- Are tests validating actual behavior, or just "it didn't crash"?
- Do testing primitives behave as expected? (Does a check actually fail the test, or just change behavior quietly?)

**Local Reasoning**
- Can code blocks be understood without knowing about distant context?
- Are dependencies explicit (parameters, return values) vs implicit (shared variables, globals)?
- Watch for action-at-a-distance anti-patterns.

For each potential issue you identify, open a TODO item, and then, one by one, coming to a complete resolution on each issue before proceeding:

1) Perform a deeper investigation for the issue, reading all the relevant code.
2) Discuss it with the user and propose fixes.
2) Apply the fixes (if you and the user think the comment warrants being addressed).

*DO NOT APPLY ANY FIXES OR PROCEED TO THE NEXT TODO ITEM UNTIL THE USER HAS AGREED*
