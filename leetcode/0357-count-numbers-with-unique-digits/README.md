# 357. Count Numbers with Unique Digits

Given an integer `n`, return the count of all numbers with unique digits in the range `[0, 10^n - 1]`.

**Example 1:**
```
Input: n = 2
Output: 91
Explanation: All numbers 0-99 except 11,22,33,44,55,66,77,88,99, so 100 - 9 = 91.
```

**Example 2:**
```
Input: n = 0
Output: 1
Explanation: Only 0 itself.
```

**Constraints:**
- 0 <= n <= 8

## Approach

Checking every number up to `10^n - 1` and testing its digits for uniqueness works but is exponential in `n`. There's a direct combinatorial count instead: figure out, for each digit-length `k`, how many `k`-digit numbers exist with all unique digits, and sum those counts.

For `k = 1`, every digit 0-9 is trivially unique — that's 10 numbers (including 0 itself, which is length 1 even though it has no leading-digit restriction). For `k >= 2`, count `k`-digit numbers with distinct digits: the leading digit has 9 choices (1-9, can't be 0), the second digit has 9 remaining choices (0-9 minus whatever the first digit was), the third has 8, and so on, decreasing by one each position — so the count for length `k` is `9 * 9 * 8 * 7 * ... * (9 - k + 2)`. This is 0 once `k > 10`, since you'd run out of distinct digits to use (there are only 10 digits total), so the loop only needs to run up to `min(n, 10)`.

Accumulate a running product (`unique_count`) that carries the length-`(k-1)` count forward, multiplying by the next available digit count each time the length grows by one, and add each length's count into the running total.

**Time complexity:** O(min(n, 10)) — effectively O(1) given the tiny fixed bound on `n`.

**Space complexity:** O(1) — just a few running counters.
