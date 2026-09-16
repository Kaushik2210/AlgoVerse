# 658. Find K Closest Elements

**Commonly asked at:** Amazon, Facebook, Google

You're given a sorted integer array `arr`, and two integers `k` and `x`. Return the `k` closest integers to `x` in the array. The result should also be sorted in ascending order. "Closest" is measured by absolute difference; if two numbers are equally close, prefer the smaller one.

**Example 1:**
```
Input: arr = [1, 2, 3, 4, 5], k = 4, x = 3
Output: [1, 2, 3, 4]
```

**Example 2:**
```
Input: arr = [1, 2, 3, 4, 5], k = 4, x = -1
Output: [1, 2, 3, 4]
```

**Constraints:**
- 1 <= k <= arr.length
- 1 <= arr.length <= 10^4
- arr is sorted in ascending order
- -10^4 <= arr[i], x <= 10^4

## Approach

The brute-force way is to sort every element of `arr` by its distance from `x` (with ties broken by value), take the first `k`, and sort those back into ascending order. That works but costs O(n log n).

Since the answer is always a *contiguous* window of `k` elements in the sorted array — the closest elements to any single point in a sorted list can never skip over a nearer one — the problem reduces to finding where that window starts. Binary search directly on the window's starting index `lo` over the range `[0, len(arr) - k]`.

At each candidate `lo`, compare the two elements sitting just outside the window: `arr[lo]` (the leftmost element, about to be dropped if we slide right) and `arr[lo + k]` (the first element just past the window, a candidate to slide into it). If `x` is strictly closer to `arr[lo + k]` than to `arr[lo]` — i.e. `x - arr[lo] > arr[lo + k] - x` — the window should slide right, since keeping `arr[lo]` over `arr[lo + k]` would be worse. Otherwise, the window shouldn't slide past this point, so shrink the search from the right. This naturally handles ties in the tie-breaking direction the problem wants, since a strict `>` keeps the smaller-valued element when distances are equal.

Once `lo` converges, `arr[lo:lo+k]` is the answer, already in sorted order since it's a slice of a sorted array.

Verified against `arr=[1,2,3,4,5], k=4, x=3` -> `[1,2,3,4]`, the same array with `x=-1` (pinned against the left edge) -> `[1,2,3,4]`, `k=1, x=3` -> `[3]`, a tie-breaking case `arr=[1,1,1,10,10,10], k=1, x=9` -> `[10]`, and the full-array edge case `k=5` -> the whole array unchanged — all match.

**Time complexity:** O(log(n - k) + k) — binary search over the window start, plus O(k) to slice out the result.

**Space complexity:** O(k) for the output (O(1) extra beyond that).
