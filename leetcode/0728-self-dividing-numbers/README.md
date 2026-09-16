# 728. Self Dividing Numbers

**Commonly asked at:** Amazon, Google, Meta, Microsoft

A self-dividing number is a number that's divisible by every digit it contains, and none of its digits are zero (since dividing by zero isn't allowed). Given a range `left` to `right` (inclusive), return every self-dividing number in that range.

**Example 1:**
```
Input: left = 1, right = 22
Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
```

**Example 2:**
```
Input: left = 47, right = 85
Output: [48, 55, 66, 77]
```

**Constraints:**
- 1 <= left <= right <= 10^4

## Approach

There's no shortcut around checking each number individually — just walk the range and test every candidate. For a given number `n`, peel off its digits one at a time with `% 10` and `/ 10`. If any digit is 0, or `n` isn't evenly divisible by that digit, `n` fails and can be skipped immediately.

Since `right` is capped at 10^4, this brute force is already fast enough — there's no denser structure hiding in the problem to exploit.

Verified against both example ranges, plus `left = 10, right = 10` (10 has a 0 digit, so the result is `[]`) and `left = 5, right = 5` (a single digit always divides itself, so `[5]`).

**Time complexity:** O((right - left) * d) — d is the number of digits in each number (bounded by 5 here), so effectively linear in the range size.

**Space complexity:** O(1) extra, not counting the output list.
