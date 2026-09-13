# 967. Numbers With Same Consecutive Differences

Return all non-negative integers of length `n` such that the absolute difference between every pair of consecutive digits is `k`. Numbers may not have leading zeros unless the number itself is 0 (irrelevant here since `n >= 1`). Any order is acceptable, and there should be no duplicates.

**Example 1:**
```
Input: n = 3, k = 7
Output: [181,292,707,818,929]
```

**Example 2:**
```
Input: n = 2, k = 1
Output: [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]
```

**Constraints:**
- 2 <= n <= 9
- 0 <= k <= 9

## Approach

This is a natural fit for **BFS by digit-length**, building numbers one digit at a time and only ever keeping paths that stay valid, rather than generating all `10^n` numbers and filtering.

Start with the set of valid 1-digit numbers: 1 through 9 (0 is excluded as a leading digit, matching the no-leading-zeros rule). Then repeat `n - 1` times: for every number currently in the set, look at its last digit, and try appending a new digit that's exactly `k` away from it in either direction (`last_digit + k` and `last_digit - k`) — keep only the digits that land in the valid range 0-9, appending each as a new candidate number. Using a set for `{k, -k}` naturally avoids trying to append the same digit twice when `k == 0` (both directions give the same digit). After `n - 1` extension rounds, every number remaining is exactly `n` digits long and satisfies the constraint at every consecutive pair, since each step only kept digits that were valid extensions.

**Time complexity:** O(2^n) in the worst case — each of the up to n-1 extension rounds can roughly double the candidate count (branching factor of 2 for the ±k choices, minus whatever falls outside 0-9).

**Space complexity:** O(2^n) to hold the candidates at the widest level of the expansion.
