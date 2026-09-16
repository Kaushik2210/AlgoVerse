# 274. H-Index

**Commonly asked at:** Meta

Given an array `citations` where `citations[i]` is the number of citations a researcher's i-th paper has, return their h-index. The h-index is the largest number `h` such that the researcher has at least `h` papers with at least `h` citations each (and the remaining papers have no more than `h` citations).

**Example 1:**
```
Input: citations = [3,0,6,1,5]
Output: 3
Explanation: 3 papers have >= 3 citations each (6, 5, 3), and the other two have <= 3.
```

**Example 2:**
```
Input: citations = [1,3,1]
Output: 1
```

**Constraints:**
- 1 <= citations.length <= 5000
- 0 <= citations[i] <= 1000

## Approach

Checking every possible value of `h` from 0 up to n and counting how many papers qualify for each would work but costs O(n^2). Sorting first turns this into something much cheaper to check.

Sort `citations` in descending order. Now walk through the sorted list by index `i` (0-based): at this point you know there are at least `i + 1` papers with citation counts `>= citations[i]` (all the ones at or before this position, since it's sorted descending). The h-index is the largest `i + 1` for which `citations[i] >= i + 1` still holds — once `citations[i] < i + 1`, that paper and everything after it can no longer support a bigger h, so the loop can stop and return `i`.

Equivalently: after sorting descending, find the last index where `citations[i] >= i + 1`; the answer is `i + 1`. If no such index exists (even the most-cited paper has fewer citations than 1), the answer is 0.

**Time complexity:** O(n log n) — dominated by the sort.

**Space complexity:** O(n) or O(log n) depending on the sort's overhead (O(1) extra if sorting in place).
