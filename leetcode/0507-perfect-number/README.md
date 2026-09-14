# 507. Perfect Number

A perfect number equals the sum of its positive divisors, excluding itself. Given an integer `num`, return `true` if it's a perfect number, `false` otherwise.

**Example 1:**
```
Input: num = 28
Output: true
Explanation: 28 = 1 + 2 + 4 + 7 + 14
```

**Example 2:**
```
Input: num = 7
Output: false
```

**Constraints:**
- 1 <= num <= 10^8

## Approach

The naive way is to test every integer from 1 up to `num - 1` as a potential divisor and sum the ones that divide evenly — O(num), which is far too slow once `num` reaches 10^8.

Divisors come in pairs: if `i` divides `num`, so does `num / i`, and one of those two is always less than or equal to `sqrt(num)`. So it's enough to scan `i` from 2 up to `sqrt(num)`, and whenever `i` divides `num`, add both `i` and its partner `num / i` to the running sum (careful not to double-count when `i == num / i`, i.e. when `num` is a perfect square). Start the sum at 1, since 1 is always a divisor (and `num` itself is excluded from the sum by definition). Numbers `<= 1` have no divisors besides themselves, so they're handled as an immediate `false`.

Verified against `num = 28` -> true, `num = 7` -> false, `num = 6` -> true (1+2+3), `num = 496` -> true (the next perfect number after 6 and 28), and `num = 1` -> false.

**Time complexity:** O(sqrt(num)) — only divisors up to the square root are checked directly.

**Space complexity:** O(1).
