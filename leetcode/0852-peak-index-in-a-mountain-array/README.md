# 852. Peak Index in a Mountain Array

**Commonly asked at:** Amazon, Google

An array is a "mountain" if it strictly increases up to some peak index and then strictly decreases after it (there's at least one element on each side of the peak). Given such a mountain array `arr`, return the peak index.

**Example 1:**
```
Input: arr = [0,1,0]
Output: 1
```

**Example 2:**
```
Input: arr = [0,2,1,0]
Output: 1
```

**Example 3:**
```
Input: arr = [0,10,5,2]
Output: 1
```

**Constraints:**
- 3 <= arr.length <= 10^5
- It's guaranteed to be a valid mountain array

## Approach

Scanning left to right and stopping at the first element that's bigger than the next one finds the peak in O(n), but the strictly-increasing-then-strictly-decreasing shape means there's a sharper tool available: at any index, comparing it to its neighbor tells you unambiguously which half of the array the peak is in, so binary search applies directly.

At each midpoint `mid`, compare `arr[mid]` to `arr[mid + 1]`:
- If `arr[mid] < arr[mid + 1]`, you're still on the increasing slope (or at a point before the peak), so the peak must be strictly to the right — move `lo = mid + 1`.
- If `arr[mid] > arr[mid + 1]`, you're on the decreasing slope or sitting on the peak itself, so the peak is at `mid` or to its left — move `hi = mid`.

Keep narrowing `[lo, hi]` until they meet; that index is the peak. Because the array is guaranteed to be a strict mountain (no plateaus), every comparison is decisive and the search converges cleanly.

**Time complexity:** O(log n) — binary search.

**Space complexity:** O(1).
