# 528. Random Pick with Weight

Given an array of positive integers `w`, `w[i]` describes the weight of index `i`. Implement `pickIndex()` which returns a random index, where the probability of picking index `i` is `w[i] / sum(w)`.

**Example:**
```
Solution s = new Solution([1,3]);
s.pickIndex();  // returns 0 with probability 1/4, 1 with probability 3/4
```

## Approach

Picking uniformly at random and then somehow biasing by weight per call would mean redoing weight-proportional work on every `pickIndex()` call. Instead, precompute the shape of the weighted distribution once at construction time, so each call afterward is cheap.

Build a **prefix sum array** of the weights: `prefix[i] = w[0] + w[1] + ... + w[i]`. This divides the range `[1, total]` (where `total = prefix[-1]`) into consecutive segments, one per index — index `i`'s segment has length `w[i]` and runs from `prefix[i-1] + 1` to `prefix[i]`. Picking a uniformly random integer `target` in `[1, total]` and finding which segment it falls into is equivalent to picking index `i` with probability exactly `w[i] / total`, because segment `i` occupies exactly that fraction of the total range.

Finding which segment a random `target` falls into is exactly the "first index where `prefix[i] >= target`" query — a classic lower-bound binary search over the (necessarily non-decreasing) prefix sum array, done in O(log n) instead of a linear scan.

`pickIndex()`: generate a random `target` in `[1, total]`, then binary search `prefix` for the leftmost index with `prefix[index] >= target`, and return that index.

**Time complexity:** O(n) to build the prefix sums once at construction. O(log n) per `pickIndex()` call.

**Space complexity:** O(n) for the prefix sum array.
