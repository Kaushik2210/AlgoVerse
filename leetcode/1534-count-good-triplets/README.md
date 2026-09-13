# 1534. Count Good Triplets

Given an array of integers `arr`, and three integers `a`, `b`, `c`, count the number of triplets of indices `(i, j, k)` with `i < j < k` such that `|arr[i] - arr[j]| <= a`, `|arr[j] - arr[k]| <= b`, and `|arr[i] - arr[k]| <= c`.

**Example 1:**
```
Input: arr = [3,0,1,1,9,7], a = 7, b = 2, c = 3
Output: 4
Explanation: 4 index triplets (i,j,k) with i<j<k satisfy all three distance constraints simultaneously.
```

**Example 2:**
```
Input: arr = [1,1,2,2,3], a = 0, b = 0, c = 1
Output: 0
```

**Constraints:**
- 3 <= arr.length <= 100
- 0 <= arr[i] <= 1000
- 0 <= a, b, c <= 1000

## Approach

With `arr.length` capped at 100, the brute-force O(n^3) triple-nested loop over every `i < j < k` is fully within reach — no cleverer approach is needed here. The only worthwhile optimization is pruning early: check `|arr[i] - arr[j]| <= a` right after fixing `i` and `j`, and skip the entire `k` loop if it already fails, since that condition doesn't depend on `k` at all. That avoids wasted inner iterations without changing the theoretical complexity.

For each surviving `(i, j)` pair, scan `k` from `j+1` onward and count it as a good triplet whenever both `|arr[j] - arr[k]| <= b` and `|arr[i] - arr[k]| <= c` hold.

**Time complexity:** O(n^3) in the worst case — three nested loops over indices, though the early continue trims some of the inner work in practice.

**Space complexity:** O(1) — just a running counter.
