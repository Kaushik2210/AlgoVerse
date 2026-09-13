# 629. K Inverse Pairs Array

For an integer `n`, consider all permutations of the numbers `1` to `n`. An inverse pair is a pair of indices `(i, j)` with `i < j` where `nums[i] > nums[j]`. Given `n` and `k`, return the number of permutations of `1` to `n` that have exactly `k` inverse pairs, modulo `10^9 + 7`.

**Example 1:**
```
Input: n = 3, k = 0
Output: 1
Explanation: Only the permutation [1,2,3] has 0 inverse pairs.
```

**Example 2:**
```
Input: n = 3, k = 1
Output: 2
Explanation: [1,3,2] and [2,1,3] each have exactly 1 inverse pair.
```

**Constraints:**
- 1 <= n <= 1000
- 0 <= k <= 1000

## Approach

Build permutations of `1..n` incrementally by inserting the value `i` into every permutation already built for `1..i-1`. Inserting `i` into a permutation of length `i-1` at one of its `i` possible positions adds anywhere from `0` new inversions (inserting at the very end, since `i` is the largest value so far and creates no inversion with anything after it) up to `i-1` new inversions (inserting at the very front, where it's now greater than all `i-1` elements after it).

So if `dp[i][j]` is the number of permutations of `1..i` with exactly `j` inverse pairs, then:

```
dp[i][j] = dp[i-1][j] + dp[i-1][j-1] + ... + dp[i-1][j-(i-1)]
```

— summing over how many of the `i-1` possible "new inversions from inserting i" we picked. Computed naively this sum is O(i) per cell, giving O(n * k * n) overall, too slow for n, k up to 1000 each combined with the sum.

Turn the sum into a running prefix sum instead. Since `dp[i][j]` and `dp[i][j-1]` differ by adding one new term (`dp[i-1][j]`) at the front of the window and dropping one term (`dp[i-1][j-i]`) that's fallen out of the trailing edge:

```
dp[i][j] = dp[i][j-1] + dp[i-1][j] - dp[i-1][j-i]   (the last term only applies once j >= i)
```

This computes each row in O(k) instead of O(k * i), for O(n * k) overall. Roll the DP forward using only the previous row to keep space down to O(k). All additions and subtractions are taken modulo `10^9 + 7`, adding the modulus back before taking the remainder to avoid negative values.

**Time complexity:** O(n * k).

**Space complexity:** O(k), keeping only the current and previous row.
