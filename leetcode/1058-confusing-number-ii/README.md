# 1058. Confusing Number II

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

A confusing number is one that, when rotated 180 degrees, becomes a *different* valid number (using only the digits 0, 1, 6, 8, 9, which map to 0, 1, 9, 8, 6 respectively; any other digit makes a number invalid to rotate at all). Given an integer `n`, return how many confusing numbers there are in the range `[1, n]`.

**Example 1:**
```
Input: n = 20
Output: 6
Explanation: The confusing numbers are 6, 9, 10, 16, 18, 19.
```

**Example 2:**
```
Input: n = 100
Output: 19
```

**Constraints:**
- 1 <= n <= 10^9

## Approach

Checking every number from 1 to `n` for the confusing property doesn't work here — `n` can be up to 10^9, far too many to scan. But like problem 1291 (sequential digits), the *valid candidates* are sparse: a number can only possibly be confusing if every digit in it is one of 0, 1, 6, 8, 9 — everything else is instantly disqualified. So instead of scanning the whole range, **generate only numbers built from those five digits directly**, via backtracking, and check each one against `n` and against the confusing condition.

Build candidates digit by digit starting from nothing: at each step, try appending each of the five valid digits (skipping a leading 0, since that would either change the number's length or just re-produce 0 itself) to the current partial number. If appending would exceed `n`, stop extending that branch — since digits are only ever appended (never removed), any deeper extension would be even larger. If the current partial number (once non-zero) is itself a fully valid candidate in range, check whether it's confusing: build its rotation by peeling digits off the end and reassembling them in reverse order with the rotation mapping applied (same technique as problem 1056), then compare to the original — if they differ, count it. Recurse to extend the current number with one more digit regardless (a number and its extensions are independent checks; a valid 2-digit number doesn't block checking its 3-digit extensions).

Because the search only ever explores numbers made of the 5 valid digits, and cuts off any branch the moment it exceeds `n`, the whole search tree stays proportional to the actual digit-count of `n`, not to `n` itself.

**Time complexity:** O(5^d) where d is the number of digits in n — the backtracking tree has branching factor 5 and depth bounded by n's digit count (at most 10 for n up to 10^9), so this is a small constant in practice, not exponential in any meaningful sense for the given constraints.

**Space complexity:** O(d) for the recursion depth.
