# 715. Range Module

**Commonly asked at:** Google

A **Range Module** tracks ranges of numbers and tells you whether a queried range is fully "tracked." Implement:

- `RangeModule()` — initializes with no ranges tracked.
- `void addRange(int left, int right)` — marks the half-open interval `[left, right)` as tracked, merging with any existing tracked ranges it overlaps or touches.
- `boolean queryRange(int left, int right)` — returns whether every real number in `[left, right)` is currently being tracked.
- `void removeRange(int left, int right)` — stops tracking every real number in `[left, right)` that was previously tracked, splitting an existing tracked interval into two pieces if `[left, right)` falls strictly inside it.

**Example:**
```
Input:
["RangeModule", "addRange", "queryRange", "removeRange", "queryRange", "queryRange"]
[[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]

Output:
[null, null, true, null, false, true]

Explanation:
RangeModule rm = new RangeModule();
rm.addRange(10, 20);      // tracked: [10, 20)
rm.queryRange(14, 16);    // true, [14,16) is fully inside [10,20)
rm.removeRange(10, 14);   // tracked: [14, 20)
rm.queryRange(13, 15);    // false, 13 is no longer tracked
rm.queryRange(16, 17);    // true, [16,17) is fully inside [14,20)
```

**Constraints:**
- 1 <= left < right <= 10^9
- At most 10^4 calls total will be made to `addRange`, `queryRange`, and `removeRange`

## Approach

The state that matters here is exactly a set of disjoint, non-adjacent intervals — kept sorted by start — representing everything currently tracked. "Non-adjacent" matters: two intervals that just touch (`[1,5)` and `[5,10)`) represent one contiguous tracked region and should be merged into `[1,10)`, otherwise `queryRange(1, 10)` would wrongly fail at the seam.

**`addRange(left, right)`**: walk through the existing sorted intervals in one pass, splitting them into three groups —
1. Intervals ending strictly before `left` (`end < left`, a real gap): copy them over unchanged.
2. Intervals that overlap or touch `[left, right]` (`start <= right`): absorb every one of them by expanding `left`/`right` to also cover their bounds — this is the merge step, handling both overlapping and touching ranges in one condition.
3. Intervals starting strictly after the (possibly now-expanded) `right`: copy them over unchanged.

The merged `[left, right]` from step 2 gets inserted between groups 1 and 3, producing a new sorted, still-disjoint list.

**`queryRange(left, right)`**: since the intervals are sorted and disjoint, a queried range can only be fully covered by a single interval (if it spanned two, there'd be an untracked gap between them by definition). Scan until finding an interval whose start is `<= left` — if that interval also reaches at least `right`, the query range is fully tracked; otherwise it's not, and once an interval's start passes `left` there's no point scanning further since intervals only get later from there.

**`removeRange(left, right)`**: walk every existing interval and compare it against `[left, right)`. If there's no overlap at all (the interval is fully before or fully after), keep it unchanged. Otherwise, whatever part of the interval sticks out on the left of the removed range survives as `[s, left)`, and whatever sticks out on the right survives as `[right, e)` — either, both, or neither can apply depending on how much of the interval the removed range actually eats. This naturally handles the case of an interval getting split into two pieces when the removed range falls strictly inside it.

Given the modest constraint (at most 10^4 calls), rebuilding the interval list with a single O(n) pass per operation is simple and fast enough — no need for a self-balancing tree or a segment-tree-over-coordinates approach that a much higher call volume might justify.

**Time complexity:** O(n) per call for `addRange` and `removeRange`, where n is the current number of tracked intervals (each does a single linear pass). O(n) worst case for `queryRange`, though it exits as soon as it passes `left`.

**Space complexity:** O(n) for the interval list, where n is at most the number of `addRange`/`removeRange` calls made so far.
