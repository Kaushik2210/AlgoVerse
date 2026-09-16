# 702. Search in a Sorted Array of Unknown Size

**Commonly asked at:** Google, Facebook

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against a hand-built mock of the `ArrayReader` API.

You're given an integer array sorted in ascending order, but its size isn't known to you. You can't access it directly — instead you're given a `reader` object (`ArrayReader`) with `reader.get(index)`, which returns the value at `index`, or `2^31 - 1` if `index` is out of bounds. Given a `target`, return its index in the array, or `-1` if it's not present. Your solution must run in O(log n).

**Example 1:**
```
Input: array = [-1, 0, 3, 5, 9, 12], target = 9
Output: 4
Explanation: 9 exists in array and its index is 4.
```

**Example 2:**
```
Input: array = [-1, 0, 3, 5, 9, 12], target = 2
Output: -1
Explanation: 2 does not exist in array so return -1.
```

**Constraints:**
- 1 <= array.length <= 10^4
- -10^4 <= array[i], target <= 10^4
- array is sorted in ascending order
- All values in array are unique

## Approach

Normal binary search needs to know `hi` up front, but here the array's length is hidden. Scanning linearly with `get` to find the end first would be O(n), which blows the required O(log n) bound. The fix is exponential (galloping) search: find a bound that's guaranteed to overshoot the target (or fall past the end of the array) in O(log n) steps instead of O(n).

Start with `bound = 1` and keep doubling it as long as `reader.get(bound) < target`. Doubling is what keeps this logarithmic — after `k` doublings, `bound = 2^k`, so it takes only `O(log(index of target))` steps to find a window that brackets the target. When the target isn't in the array, `reader.get` eventually returns `2^31 - 1` for an out-of-bounds index, which is never less than any valid `target` (since `target <= 10^4`), so the doubling loop always terminates.

Once doubling stops, the target (if present) must lie in `[bound / 2, bound]` — the previous bound didn't overshoot, but this one did (or hit the array's edge). Run ordinary binary search over that window.

Verified against a mock `ArrayReader` wrapping a Python list (returning `2**31 - 1` past the end): `target = 9` in `[-1,0,3,5,9,12]` -> index 4, `target = 2` (absent) -> -1, a single-element array `[5]` with `target = 5` -> 0, `target = -1` (the very first element) -> 0, `target` at index 0 of a 10-element array -> 0, and a target near index 9999 of a 10000-element array -> 9999 — all match.

**Time complexity:** O(log p) where p is the index of the target (or the array's length if absent) — O(log p) to find the bound by doubling, plus O(log p) for the binary search within it.

**Space complexity:** O(1).
