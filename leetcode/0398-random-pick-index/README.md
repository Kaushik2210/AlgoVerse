# 398. Random Pick Index

Given an integer array `nums` with possible duplicates, implement `pick(target)` which returns a random index where `nums[index] == target`, with each qualifying index equally likely to be returned.

**Example:**
```
Solution s = new Solution([1,2,3,3,3]);
s.pick(3);  // returns 2, 3, or 4, each with probability 1/3
s.pick(1);  // returns 0 (only index with value 1)
```

## Approach

The obvious approach is to precompute, for every distinct value, the list of indices where it occurs (a hash map from value to list of indices), then `pick(target)` just picks a uniformly random element from `indices[target]` — O(1) per pick after an O(n) one-time setup. That's fine when memory for storing every index isn't a concern, but the interesting version of this problem is doing it with O(1) extra space per pick call and without pre-indexing everything, using **reservoir sampling**.

Reservoir sampling picks a uniformly random element from a stream of unknown or costly-to-store length, using only O(1) space: scan through `nums`, and every time a matching index is found (the count of matches seen so far becomes `k`), replace the currently held answer with this new index with probability `1/k`. The first match is trivially kept (`1/1` probability). By induction, after processing all matches, each one has an equal `1/(total matches)` chance of being the one that's still held at the end — every earlier match had to survive being overwritten by every subsequent match's `1/k` roll, and those probabilities multiply out to the same value for every match regardless of its position in the stream.

This means `pick(target)` scans the whole array each time (no precomputed index lists), trading O(n) time per call for O(1) extra space — a fair trade when memory matters more than repeated-query speed, or when `nums` is effectively a stream that can't be fully materialized into an index map.

**Time complexity:** O(n) per `pick` call (a full scan), O(1) for construction.

**Space complexity:** O(1) extra per `pick` (besides the input array itself).
