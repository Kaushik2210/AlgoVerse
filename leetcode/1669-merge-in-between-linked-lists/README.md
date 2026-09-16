# 1669. Merge In Between Linked Lists

**Commonly asked at:** Amazon, Google, Microsoft, Bloomberg, Nvidia, Oracle

You're given two linked lists, `list1` (with `n` nodes) and `list2`, and two integers `a` and `b` (0-indexed, `a < b < n - 1`). Remove nodes `a` through `b` from `list1` and replace that whole gap with `list2`. Return the head of the resulting list.

**Example 1:**
```
Input: list1 = [0,1,2,3,4,5], a = 3, b = 4, list2 = [1000000,1000001,1000002]
Output: [0,1,2,1000000,1000001,1000002,5]
```

**Example 2:**
```
Input: list1 = [0,1,2,3,4,5,6], a = 2, b = 5, list2 = [1000000,1000001,1000002,1000003,1000004]
Output: [0,1,1000000,1000001,1000002,1000003,1000004,6]
```

**Constraints:**
- 3 <= list1.length <= 10^4
- 1 <= a <= b < list1.length - 1
- 1 <= list2.length <= 10^4

## Approach

There's no reason to build a new list here — this is a pure pointer-splicing exercise on `list1`, treating `list2` as a self-contained chunk to be dropped in.

Find two boundary nodes in `list1`: `before`, the node right before index `a` (reached by walking `a - 1` steps from the head), and `after`, the node right after index `b` (reached by walking `b - a + 2` more steps from `before` — that's one step to get onto index `a`, then `b - a` more steps to reach index `b`, then one final step past it). Everything from `before.next` through the node just before `after` is the range being deleted; it's simply forgotten once `before.next` gets repointed.

Then it's three pointer assignments: point `before.next` at the head of `list2`, walk to the tail of `list2` (there's no shortcut for this — you don't have its length or a tail pointer), and point that tail's `next` at `after`. `list1`'s original head is unaffected, so it's still the correct return value.

**Time complexity:** O(a + len(list2)) — walking to the splice points in `list1` plus walking to the end of `list2`; independent of `list1`'s total length beyond that.

**Space complexity:** O(1) — everything is done in place by relinking existing nodes.
