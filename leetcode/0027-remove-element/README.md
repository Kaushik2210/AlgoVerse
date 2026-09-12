# 27. Remove Element

Given an array `nums` and a value `val`, remove all occurrences of `val` in-place. The order of the remaining elements doesn't matter. Return `k`, the number of elements not equal to `val`, after arranging them at the front of `nums` (the rest of the array beyond `k` doesn't matter).

**Example 1:**
```
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
```

**Example 2:**
```
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
```

**Constraints:**
- 0 <= nums.length <= 100
- Order of the returned elements can be arbitrary

## Approach

Since order doesn't matter, this doesn't need a stable "shift everything left" approach — a simpler two-pointer trick works. Keep a `k` pointer marking the boundary of the "kept so far" region at the front of the array. Walk through `nums` with a second pointer; whenever the current element isn't `val`, write it into position `k` and advance `k`. Elements equal to `val` are just skipped over — they get silently overwritten later or left in the discarded tail.

Since we're overwriting in place and `k` never runs ahead of the read pointer, this never clobbers an element before it's been read. By the end, the first `k` slots hold exactly the elements that weren't `val`, in whatever order they were encountered, which is all the problem asks for.

**Time complexity:** O(n) — one pass through the array.

**Space complexity:** O(1) — everything happens in place with a single extra index.
