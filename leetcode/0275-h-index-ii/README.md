# 275. H-Index II

**Commonly asked at:** Meta

Same definition as H-Index (274), but `citations` is already sorted in ascending order. Return the h-index in O(log n) time.

**Example 1:**
```
Input: citations = [0,1,3,5,6]
Output: 3
```

**Example 2:**
```
Input: citations = [1,2,100]
Output: 2
```

**Constraints:**
- 1 <= citations.length <= 10^5
- citations is sorted in ascending order
- 0 <= citations[i] <= 1000

## Approach

The regular H-Index solution sorts descending and scans for the crossover point, which is O(n log n). Here the array already comes sorted (ascending), so paying for another sort would be wasteful — and the O(log n) requirement confirms binary search is the intended tool.

With `n` papers sorted ascending, the paper at index `i` (0-based) has `n - i` papers at or after it (including itself), all with citation counts `>= citations[i]`. So `citations[i]` "supports" an h-index of `n - i` exactly when `citations[i] >= n - i`. As `i` increases, `citations[i]` is non-decreasing and `n - i` is strictly decreasing, so the condition `citations[i] >= n - i` flips from false to true at most once as `i` grows — a textbook binary-search predicate.

Binary search for the smallest index `i` where `citations[i] >= n - i`. If such an index exists, the h-index is `n - i` (the count of papers from `i` to the end). If no index satisfies it (every paper has too few citations relative to its position, i.e. the search exhausts to `n`), the h-index is 0.

**Time complexity:** O(log n) — binary search over the sorted array.

**Space complexity:** O(1).
