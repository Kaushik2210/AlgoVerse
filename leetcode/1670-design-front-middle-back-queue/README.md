# 1670. Design Front Middle Back Queue

Design a queue that supports push and pop from the front, the middle, and the back. Implement the `FrontMiddleBackQueue` class:

- `FrontMiddleBackQueue()` — initializes the queue.
- `void pushFront(val)` / `void pushMiddle(val)` / `void pushBack(val)` — insert `val` at the front / middle / back.
- `int popFront()` / `int popMiddle()` / `int popBack()` — remove and return the value at the front / middle / back, or -1 if the queue is empty.

If there are two middle positions (even length), `pushMiddle` inserts before the left one, and `popMiddle` removes the left one.

**Example:**
```
Input:
["FrontMiddleBackQueue", "pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"]
[[], [1], [2], [3], [4], [], [], [], [], []]

Output:
[null, null, null, null, null, 1, 3, 4, 2, -1]

Explanation:
FrontMiddleBackQueue q = new FrontMiddleBackQueue();
q.pushFront(1);   // [1]
q.pushBack(2);    // [1, 2]
q.pushMiddle(3);  // [1, 3, 2]
q.pushMiddle(4);  // [1, 4, 3, 2]
q.popFront();     // returns 1 -> [4, 3, 2]
q.popMiddle();    // returns 3 -> [4, 2]
q.popMiddle();    // returns 4 -> [2]
q.popBack();      // returns 2 -> []
q.popFront();     // returns -1
```

**Constraints:**
- 1 <= val <= 10^9
- At most 1000 calls total to the six operations

## Approach

An array-backed list would make front/middle inserts and removes O(n) each due to shifting elements. The trick to getting O(1) (well, O(sqrt(n)) amortized in the worst case, but effectively O(1) here) is to keep **two deques**, `left` and `right`, that together represent the queue front-to-back as `left` followed by `right` — and maintain the invariant that `len(left)` is always either equal to `len(right)` or exactly one more. That invariant is exactly what pins "the middle" to the boundary between the two deques: if `left` is one longer, its last element is the unique middle; if they're equal, the true middle-left element is still the last element of `left` (the boundary splits an even-length queue evenly).

Every operation reduces to a deque push/pop at one end, followed by a rebalancing step that moves at most one element across the boundary to restore the invariant:
- `pushFront`/`pushBack` just push at the outer end of `left`/`right`, then rebalance.
- `pushMiddle` needs the new value to land as the last element of `left` (the left-of-two-middles rule) — if `left` is currently strictly longer than `right`, first shift `left`'s last element over to `right`'s front to make room, then append the new value onto `left`, then rebalance.
- `popFront`/`popBack` pop from the outer end of whichever deque is non-empty at that side, then rebalance.
- `popMiddle` removes from the last of `left` when `len(left) >= len(right)` (that's where the true middle sits by the invariant above), otherwise from the front of `right`, then rebalances.

Rebalancing itself is just: if `left` got too long, move its last element to the front of `right`; if `right` got longer than `left`, move its first element to the back of `left`. Each call moves at most one element, so it's O(1).

**Time complexity:** O(1) for every operation — each push/pop touches a deque end plus at most one rebalancing move.

**Space complexity:** O(n) to hold the n stored elements across the two deques.
