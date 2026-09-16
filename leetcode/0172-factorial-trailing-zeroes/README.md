# 172. Factorial Trailing Zeroes

**Commonly asked at:** Google

Given an integer `n`, return the number of trailing zeroes in `n!`.

**Example 1:**
```
Input: n = 3
Output: 0
Explanation: 3! = 6, no trailing zero
```

**Example 2:**
```
Input: n = 5
Output: 1
Explanation: 5! = 120, one trailing zero
```

**Example 3:**
```
Input: n = 0
Output: 0
```

**Constraints:**
- 0 <= n <= 10^4

## Approach

Computing `n!` directly and counting zeroes would work for small n but the factorial grows enormous fast — better to reason about where trailing zeroes actually come from. A trailing zero in a number's decimal form comes from a factor of 10, and 10 = 2 * 5. In `n!`, factors of 2 vastly outnumber factors of 5 (every other number contributes a 2, but only every fifth number contributes a 5), so the number of trailing zeroes is limited entirely by how many times 5 divides into `n!`.

Counting the total power of 5 in `n!` means counting, across all numbers from 1 to n, how many are divisible by 5, plus how many are divisible by 25 (since those contribute an extra factor of 5 beyond the first), plus how many are divisible by 125, and so on. That sum is exactly `floor(n/5) + floor(n/25) + floor(n/125) + ...`, which can be computed directly without ever touching the factorial itself: keep dividing n by 5 (integer division) and add the quotient to a running total until it hits 0.

**Time complexity:** O(log₅ n) — the loop divides by 5 each iteration.

**Space complexity:** O(1).
