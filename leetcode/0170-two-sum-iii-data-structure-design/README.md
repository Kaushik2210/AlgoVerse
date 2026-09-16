# 170. Two Sum III - Data Structure Design

**Commonly asked at:** Amazon, Google

*Note: this is a LeetCode premium (subscriber-only) problem, so it can't be verified against the live judge, but it's implemented and tested against the interface described in the official problem statement below.*

Design a data structure that supports two operations: `add(number)` adds a number to an internal running collection, and `find(value)` returns whether any pair of numbers already added sums to `value`.

**Example:**
```
TwoSum twoSum = new TwoSum();
twoSum.add(1);
twoSum.add(3);
twoSum.add(5);
twoSum.find(4);  // true (1 + 3)
twoSum.find(7);  // false
```

**Constraints:**
- -10^5 <= number <= 10^5
- At most 10^4 calls to add and find combined

## Approach

The naive design keeps a list of every number added and, on `find`, checks every pair — O(n) per `add` (trivial) but O(n^2) worst case across many `find` calls, or O(n) per `find` with nested loops. Since `add` is called far more often than `find` typically needs raw storage, and `find` benefits from O(1) lookups, a hash map of value -> count of occurrences is the natural structure — it makes `add` O(1) and `find` O(n) (bounded by how many distinct numbers have been added), avoiding the O(n^2) blowup of checking every pair explicitly on each `find` call while keeping `add` trivially fast.

`add(number)`: increment `counts[number]` in the map (default 0 if unseen).

`find(value)`: for every distinct key `k` currently in the map, check whether `value - k` is also a key. Two cases need care: if `k != value - k`, both being present is enough. If `k == value - k` (i.e., `value` is exactly double some added number), that number needs to have been added *at least twice* for the pair to exist — hence storing counts, not just a set of seen values.

This trades doing more work per `find` (proportional to the number of distinct values seen) for extremely cheap `add` calls, which fits a workload where `add` dominates.

**Time complexity:** O(1) for `add`. O(n) for `find`, where n is the number of distinct values added.

**Space complexity:** O(n) for the map of counts.
