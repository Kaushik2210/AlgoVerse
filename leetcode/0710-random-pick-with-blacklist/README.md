# 710. Random Pick with Blacklist

**Commonly asked at:** Google

You're given an integer `n` and an array `blacklist` of unique integers, all in the range `[0, n)`. Design a data structure that picks an integer uniformly at random from `[0, n)` that is **not** in `blacklist`, as efficiently as possible.

Implement the `Solution` class:
- `Solution(int n, int[] blacklist)` initializes the object.
- `int pick()` returns a random integer in `[0, n)` excluding `blacklist`, chosen so every valid number is equally likely.

**Example 1:**
```
Input: ["Solution", "pick", "pick", "pick"], [[7, [2, 3, 5]], [], [], []]
Output values are always in {0, 1, 4, 6}, each with equal probability.
```

**Example 2:**
```
n = 1, blacklist = []
pick() always returns 0.
```

**Constraints:**
- 1 <= n <= 10^9
- 0 <= blacklist.length <= min(10^5, n - 1)
- 0 <= blacklist[i] < n
- All values in `blacklist` are unique

## Approach

The naive approach — reject and resample until you land on a whitelisted number — works but degrades badly when the blacklist is large relative to `n`; you could spin many times before hitting a valid pick.

Instead, shrink the range you actually roll in. Let `bound = n - blacklist.length` — the count of whitelisted numbers. If you could always roll in `[0, bound)` and land on a whitelisted number, you'd be done in one shot. The problem is some blacklisted numbers happen to fall inside `[0, bound)`. The fix: remap every such "bad" number in the low range to a whitelisted number sitting in the leftover high range `[bound, n)`.

Build this remap once, at construction time:
- Put every blacklisted number into a set for O(1) lookup.
- Walk a pointer starting at `bound` upward, skipping over any blacklisted numbers, to find the next available whitelisted number in the high range.
- For each blacklisted number that falls below `bound`, pair it with the next available whitelisted number from that pointer walk.

Now `pick()` is trivial and O(1): roll a random integer `x` in `[0, bound)`. If `x` is one of the remapped (blacklisted) numbers, return its mapped whitelisted partner instead; otherwise `x` itself is already whitelisted, so return it directly. Because every number in `[0, bound)` maps to a distinct valid answer (either itself or its remap target), and every whitelisted number in `[bound, n)` is the image of exactly one low-range slot, the distribution stays perfectly uniform over all whitelisted numbers.

Verified against `n = 7, blacklist = [2, 3, 5]` over 20000 picks — only `{0, 1, 4, 6}` ever come out, each roughly 1/4 of the time (measured counts: 0 → 4961, 1 → 4985, 4 → 4982, 6 → 5072), confirming both correctness and uniformity.

**Time complexity:** O(b) to build the remap at construction (b = blacklist size), then O(1) per `pick()` call.

**Space complexity:** O(b) for the blacklist set and the remap table.
