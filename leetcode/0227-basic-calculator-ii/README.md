# 227. Basic Calculator II

Given a string `s` representing an expression, evaluate it and return its value. The expression contains non-negative integers, `+`, `-`, `*`, `/` operators, and empty spaces. There are no parentheses, integer division truncates toward zero, and you may not use `eval`.

**Example 1:**
```
Input: s = "3+2*2"
Output: 7
```

**Example 2:**
```
Input: s = " 3/2 "
Output: 1
```

**Example 3:**
```
Input: s = " 3+5 / 2 "
Output: 5
```

**Constraints:**
- 1 <= s.length <= 3 * 10^5
- s consists of integers and operators ('+', '-', '*', '/') separated by some number of spaces
- s represents a valid expression
- All the integers in the expression are non-negative integers in the range [0, 2^31 - 1]
- The answer is guaranteed to fit in a 32-bit integer

## Approach

Without parentheses, the only thing that complicates a left-to-right scan is operator precedence: `*` and `/` bind tighter than `+` and `-`. The trick is to resolve the high-precedence operators immediately when encountered, so that by the time everything's been scanned, all that's left is a sequence of numbers to add and subtract — which can just be summed.

Walk the string tracking the current number being built (digits accumulate into it) and the operator that preceded it (starting with an implicit `+`). Whenever the next non-digit, non-space character is hit (or the string ends), the just-finished number needs to be applied to a running stack based on what the *previous* operator was:
- `+` → push the number as-is.
- `-` → push the negated number (this converts subtraction into "adding a negative," so the final total is just a sum).
- `*` or `/` → pop the last value off the stack, combine it with the current number, and push the result back — this resolves the higher-precedence operation immediately rather than deferring it, which is exactly what enforces precedence without needing a full expression-tree parser.

At the very end, the stack contains only values meant to be added together (the sign already baked in via the `-` handling), so summing the stack gives the answer. Integer division needs to truncate toward zero, same trap as in Evaluate Reverse Polish Notation.

**Time complexity:** O(n) — a single pass through the string, with amortized O(1) stack operations per number.

**Space complexity:** O(n) — the stack can hold up to roughly n/2 values in the worst case (all `+`/`-` separated single-digit numbers).
