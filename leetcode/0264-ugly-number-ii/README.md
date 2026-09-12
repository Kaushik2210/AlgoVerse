# 264. Ugly Number II

An **ugly number** is a positive integer whose only prime factors are 2, 3, and 5. Given an integer `n`, return the `n`th ugly number. By convention, 1 is the first ugly number.

**Example 1:**
```
Input: n = 10
Output: 12
Explanation: The sequence of the first 10 ugly numbers is [1,2,3,4,5,6,8,9,10,12].
```

**Example 2:**
```
Input: n = 1
Output: 1
```

**Constraints:**
- 1 <= n <= 1690

## Approach

Every ugly number after the first is built by multiplying some earlier ugly number by 2, 3, or 5 — there's no other way to stay restricted to only those prime factors. So instead of testing candidate numbers one at a time for ugliness (slow, and awkward to know when to stop), *generate* the sequence directly by always producing the next smallest ugly number from the ones already found.

Keep a growing list `ugly` starting with `[1]`, and three pointers `p2, p3, p5`, all starting at index 0 — each pointer tracks "which already-found ugly number should be multiplied by 2 (or 3, or 5) to produce this factor's next not-yet-used candidate." At each step, the next ugly number is `min(ugly[p2] * 2, ugly[p3] * 3, ugly[p5] * 5)` — the smallest of the three candidates. Append that minimum to the list, then **advance every pointer whose candidate equaled that minimum** (not just one) — this is the detail that avoids duplicates: if, say, `2 * 3 = 6` and `3 * 2 = 6` would both produce 6, advancing both the 2-pointer and 3-pointer when the value 6 is chosen ensures 6 is only ever added to the list once, since both paths that could have produced it move past it together.

Repeat until the list holds `n` ugly numbers; the last one is the answer.

**Time complexity:** O(n) — one O(1) step (three comparisons, appends, and at most three pointer bumps) per ugly number generated.

**Space complexity:** O(n) for the list of generated ugly numbers.
