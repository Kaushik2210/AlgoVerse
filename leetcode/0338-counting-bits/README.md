# 338. Counting Bits

Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of `1`'s in the binary representation of `i`.

**Example 1:**
```
Input: n = 2
Output: [0,1,1]
Explanation: 0 --> 0, 1 --> 1, 2 --> 10
```

**Example 2:**
```
Input: n = 5
Output: [0,1,1,2,1,2]
Explanation: 0 --> 0, 1 --> 1, 2 --> 10, 3 --> 11, 4 --> 100, 5 --> 101
```

**Constraints:**
- 0 <= n <= 10^5

## Approach

The direct way is to count set bits for each number independently — either with `bin(i).count('1')`, or Brian Kernighan's trick of repeatedly clearing the lowest set bit (`i & (i-1)`) and counting how many times that takes. That's correct and O(log i) per number, giving O(n log n) overall — fine, but each number is solved from scratch with no reuse of work already done for smaller numbers.

The DP relation gets it down to O(n) by reusing previous answers. The key observation: `i & (i - 1)` clears the lowest set bit of `i`, turning it into a smaller number that's already been processed. So `ans[i] = ans[i & (i - 1)] + 1` — take the bit count of that smaller number and add back the one bit that was just cleared.

An equally clean alternative uses `i >> 1` (drop the last bit) combined with `i & 1` (the dropped bit itself): `ans[i] = ans[i >> 1] + (i & 1)`. Shifting right by one just removes the last binary digit, and whatever that last digit was (0 or 1) gets added back on top of however many 1's were already counted in the rest.

Either recurrence only depends on an index strictly smaller than `i`, so filling the array left to right in one pass is enough — no need to actually convert anything to binary.

**Time complexity:** O(n) — one constant-time lookup and update per index.

**Space complexity:** O(n) for the output array (no extra space beyond that).
