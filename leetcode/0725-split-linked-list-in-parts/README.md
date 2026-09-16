# 725. Split Linked List in Parts

**Commonly asked at:** Amazon, Google, Meta, Microsoft, Bloomberg

Given the head of a singly linked list and an integer `k`, split the list into `k` consecutive parts. Every part's length must be as equal as possible — no two parts can differ in size by more than 1 — and earlier parts must be at least as large as later ones. If the list has fewer than `k` nodes, some parts will simply be empty (`null`). Return the parts as an array of `k` list heads.

**Example 1:**
```
Input: head = [1,2,3], k = 5
Output: [[1],[2],[3],[],[]]
```

**Example 2:**
```
Input: head = [1,2,3,4,5,6,7,8,9,10], k = 3
Output: [[1,2,3,4],[5,6,7],[8,9,10]]
```

**Constraints:**
- The number of nodes is in the range [0, 1000]
- 0 <= Node.val <= 1000
- 1 <= k <= 50

## Approach

The naive instinct is to try dividing on the fly as you walk the list — but you can't know how big each part should be without first knowing the total length, since "as equal as possible" depends on `length % k`. So the straightforward two-pass approach is the right one: first walk the whole list once just to count its length `n`, then use that to figure out exactly how big each of the `k` parts should be before cutting anything.

Every part gets `n // k` nodes at minimum, and since `n // k` leaves a remainder of `n % k` nodes unaccounted for, the first `n % k` parts each get one extra node (this is exactly what keeps earlier parts at least as large as later ones, and no two parts differing by more than 1). With each part's exact size known ahead of time, do a second pass: for each of the `k` parts, walk forward `part_size - 1` steps from the current position, cut the list there by setting that node's `next` to `None` (remembering what it pointed to first, so you can resume from there for the next part), and record the part's head. If a part's computed size is 0, its slot is just `None`.

**Time complexity:** O(n) — one pass to measure the length, one pass to cut the list into parts.

**Space complexity:** O(k) for the output array, O(1) extra beyond that — the parts reuse the original nodes.
