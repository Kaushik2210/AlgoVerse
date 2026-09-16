# 439. Ternary Expression Parser

**Commonly asked at:** Snap

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway since it's a compact stack-based parsing exercise that pairs well with expression-evaluation problems.*

You're given a string `expression` representing an arbitrarily nested ternary expression, built from digits `0-9`, `?`, `:`, `T` (true), and `F` (false). Ternary expressions associate from right to left (same as C++), and the result of a well-formed ternary is always exactly one digit or letter. Evaluate the expression and return the result as a string.

**Example 1:**
```
Input: expression = "T?2:3"
Output: "2"
Explanation: condition T is true, so the result is the true-branch, 2.
```

**Example 2:**
```
Input: expression = "F?1:T?4:5"
Output: "4"
Explanation: right-to-left grouping means this reads as F?1:(T?4:5). The outer condition F is false, so evaluate the false-branch, T?4:5, which evaluates to 4.
```

**Example 3:**
```
Input: expression = "T?T?F:5:3"
Output: "F"
Explanation: groups as T?(T?F:5):3. Outer T picks the true-branch, T?F:5, whose condition T picks F.
```

**Constraints:**
- `5 <= expression.length <= 10^4`
- `expression` consists of digits, `T`, `F`, `?`, and `:`
- `expression` is a valid ternary expression

## Approach

Right-to-left associativity is the whole trick here: instead of parsing left to right and juggling precedence, scan `expression` from right to left with a stack, and every `?...:...` group gets resolved the moment its condition character appears — because with this scan order, by the time you reach a condition, both of its branches are already sitting on top of the stack, fully evaluated.

Push characters onto the stack one at a time. The special case: whenever the character about to be pushed would land on top of an existing `?` (i.e., the stack's current top is `?`), that means we've just walked past a full `cond ? true : false` group and the next character is the condition. So instead of pushing: pop the `?`, pop the true-branch value, pop the `:`, pop the false-branch value, then push whichever branch the condition selects (`true_branch` if the condition is `'T'`, otherwise `false_branch`). This collapses the group into a single resolved value sitting on the stack, ready to be part of an outer group the same way.

Because everything nested resolves before its enclosing group is reached (right-to-left order guarantees inner conditions are hit first), by the end the stack holds exactly one value: the final answer.

**Time complexity:** O(n) where n is the length of `expression` — each character is pushed and popped a constant number of times.

**Space complexity:** O(n) for the stack in the worst case.
