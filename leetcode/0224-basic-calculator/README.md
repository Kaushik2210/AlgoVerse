# 224. Basic Calculator

Given a string `s` representing a valid arithmetic expression, evaluate it and return the result. The expression can contain non-negative integers, `+`, `-`, parentheses `(` `)`, and spaces. There is no `*` or `/`.

**Example 1:**
```
Input: s = "1 + 1"
Output: 2
```

**Example 2:**
```
Input: s = " 2-1 + 2 "
Output: 3
```

**Example 3:**
```
Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23
```

**Constraints:**
- 1 <= s.length <= 3 * 10^5
- s consists of digits, '+', '-', '(', ')', and ' '
- s represents a valid expression
- '+' is not used as a unary operation
- '-' could be used as a unary operation for non-negative integers
- Every number and running calculation will fit in a signed 32-bit integer

## Approach

Without `*`/`/` there's no operator precedence to worry about — the only complication is that parentheses can flip the effective sign of everything inside them (e.g. `-(a - b)` should evaluate as `-a + b`). Track a running `result` and a `sign` (starting at +1) that applies to the next number encountered, and use a **stack to save/restore `(result, sign)` pairs across parentheses**.

Walk the string once, character by character:
- digit: accumulate a multi-digit number by scanning ahead.
- once a full number is read (hit a non-digit, or end of string), add `sign * number` to `result`, then reset for the next term.
- `+`: set `sign = 1` for the upcoming number.
- `-`: set `sign = -1` for the upcoming number.
- `(`: push the current `(result, sign)` onto the stack, then reset `result = 0` and `sign = 1` — start evaluating the parenthesized sub-expression as if it were a fresh expression.
- `)`: the sub-expression just finished is in `result`. Pop `(prev_result, prev_sign)` and combine: `result = prev_result + prev_sign * result` — this is where the "sign in front of the parenthesis" actually gets distributed across everything that was computed inside it, because `prev_sign` was the sign that was pending right before the `(` was hit.
- spaces are skipped.

The stack push/pop around `(`/`)` is what correctly propagates a leading minus sign through however many nested levels of parentheses it needs to.

**Time complexity:** O(n) — one pass over the string.

**Space complexity:** O(n) for the stack in the worst case (deeply nested parentheses).
