# 668. Kth Smallest Number in Multiplication Table

Nearly every classroom has a multiplication table. For an `m x n` multiplication table, the value at row `i`, column `j` (1-indexed) is `i * j`. Given `m`, `n`, and `k`, return the `k`-th smallest number in this table.

**Example 1:**
```
Input: m = 3, n = 3, k = 5
Output: 3
Explanation: The table is [[1,2,3],[2,4,6],[3,6,9]]. The 5th smallest number is 3.
```

**Example 2:**
```
Input: m = 2, n = 3, k = 6
Output: 6
Explanation: The table is [[1,2,3],[2,4,6]]. The 6th smallest number is 6.
```

**Constraints:**
- 1 <= m, n <= 3 * 10^4
- 1 <= k <= m * n

## Approach

The table has up to 9*10^8 entries, so materializing and sorting it is out of the question. But there's a fast way to count, for any value `x`, how many table entries are <= `x`, without building the table: for each row `i` (from 1 to `m`), the entries in that row are `i, 2i, 3i, ..., ni`, so the count of entries in row `i` that are <= `x` is `min(x // i, n)`. Summing that over all `m` rows gives the total count in O(m).

This count is monotonically non-decreasing in `x`, so binary search `x` between 1 and `m * n` for the smallest `x` such that `count_le(x) >= k`. That's exactly the `k`-th smallest value in the table — because it's guaranteed to actually be a product `i * j` that appears in the table (if it weren't, the count wouldn't have just crossed `k` right at that value; the count only changes at values that are genuine table entries).

**Time complexity:** O(m log(mn)) — each binary search step counts in O(m).

**Space complexity:** O(1) extra space.
