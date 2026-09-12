# 150. Evaluate Reverse Polish Notation

You're given an array of strings `tokens` representing an arithmetic expression in Reverse Polish Notation (postfix notation). Evaluate it and return the result as an integer. Valid operators are `+`, `-`, `*`, and `/` (division truncates toward zero). Division by zero never happens, and the input is guaranteed to be a valid RPN expression.

**Example 1:**
```
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: (2 + 1) * 3 = 9
```

**Example 2:**
```
Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: 4 + (13 / 5) = 4 + 2 = 6
```

**Constraints:**
- 1 <= tokens.length <= 10^4
- tokens[i] is either an operator (+, -, *, /) or an integer

## Approach

Postfix notation exists precisely so evaluation doesn't need parentheses or precedence rules — a stack handles it directly. Walk the tokens left to right: whenever you see a number, push it. Whenever you see an operator, pop the top two numbers off the stack (the second-to-top is the left operand, the top is the right operand, since it was pushed more recently), apply the operator, and push the result back on. By the time you reach the end, the stack has exactly one value left — the answer.

The one trap is division: Python's `//` floors toward negative infinity, but the problem wants truncation toward zero (e.g. `-7 / 2` should give `-3`, not `-4`). So division needs to explicitly truncate rather than using `//` directly — compute with `int(a / b)` or truncate with a sign check.

**Time complexity:** O(n) — each token is processed once with O(1) stack operations.

**Space complexity:** O(n) — the stack holds up to roughly n/2 operands in the worst case.
