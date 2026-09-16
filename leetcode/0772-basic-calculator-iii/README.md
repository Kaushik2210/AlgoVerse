# 772. Basic Calculator III

**Commonly asked at:** Google, Meta

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given a string `s` representing an expression that can contain integers, `+`, `-`, `*`, `/`, and parentheses `(` `)`. Implement a basic calculator to evaluate it and return the result. Integer division should truncate toward zero, and it's assumed the expression is always valid.

**Example 1:**
```
Input: s = "1+1"
Output: 2
```

**Example 2:**
```
Input: s = "6-4/2"
Output: 4
```

**Example 3:**
```
Input: s = "2*(5+5*2)/3+(6/2+8)"
Output: 21
```

**Constraints:**
- 1 <= s.length <= 10^4
- `s` consists of digits, `'+'`, `'-'`, `'*'`, `'/'`, `'('`, `')'`, and spaces
- The expression is a valid one

## Approach

This combines the two hard parts of Basic Calculator I and II — operator precedence (`*` and `/` bind tighter than `+` and `-`) and nested parentheses — into one problem, so a single stack-based scan needs to handle both at once.

Use a recursive-descent-flavored single pass with an explicit stack of numbers and a "current operator" tracker, driven by an index that's shared across recursive calls (a mutable pointer, effectively) so a parenthesized group can be evaluated by recursing and then resuming the outer scan right where the group left off:

- Walk through the string character by character, skipping spaces.
- If you see a digit, parse the full number.
- If you see `(`, recurse to evaluate everything inside the matching parentheses as its own sub-expression, treating the result as a single number.
- Whenever you have a complete number in hand, look at the *previous* operator (starting as `+`) to decide how to fold it in: for `+`, push the number; for `-`, push its negation; for `*`, pop the top of the stack, multiply, and push the result back; for `/`, pop the top, divide (truncating toward zero), and push the result back. This defers `+`/`-` until everything is on the stack, but resolves `*`/`/` immediately against the last pushed value, which is exactly what gives multiplication and division higher precedence.
- When you hit an operator character (`+ - * /`) or the end of the string (or a `)`, which ends the current recursive call), update the "previous operator" to the new one and continue.
- At the end of a pass (top-level or inside a parenthesized group), the stack holds only values that need to be summed — sum the stack for the final result of that scope.

**Time complexity:** O(n) — each character is processed once across the top-level scan and all the recursive calls combined.

**Space complexity:** O(n) for the stack and the recursion depth in the worst case of deeply nested parentheses.
