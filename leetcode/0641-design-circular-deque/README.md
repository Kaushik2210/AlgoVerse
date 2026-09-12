# 641. Design Circular Deque

Design your own implementation of a circular double-ended queue (deque) — items can be inserted and removed from both the front and the rear. Implement the `MyCircularDeque` class:

- `MyCircularDeque(k)` — initializes the deque with a fixed size `k`.
- `boolean insertFront(int value)` — inserts `value` at the front; returns `true` if successful.
- `boolean insertLast(int value)` — inserts `value` at the rear; returns `true` if successful.
- `boolean deleteFront()` — removes an item from the front; returns `true` if successful.
- `boolean deleteLast()` — removes an item from the rear; returns `true` if successful.
- `int getFront()` — gets the front item, or -1 if empty.
- `int getRear()` — gets the last item, or -1 if empty.
- `boolean isEmpty()` — checks whether the deque is empty.
- `boolean isFull()` — checks whether the deque is full.

**Example:**
```
Input:
["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]

Output:
[null, true, true, true, false, 2, true, true, true, 4]

Explanation:
MyCircularDeque q = new MyCircularDeque(3);
q.insertLast(1);   // true
q.insertLast(2);   // true
q.insertFront(3);  // true
q.insertFront(4);  // false, full
q.getRear();        // 2
q.isFull();          // true
q.deleteLast();      // true
q.insertFront(4);   // true
q.getFront();        // 4
```

**Constraints:**
- 1 <= k <= 1000
- 0 <= value <= 1000
- At most 2000 calls total to the above operations

## Approach

This is Design Circular Queue extended to support insertion/removal from both ends, so the same fixed-array-plus-modulo ring buffer works, just with one extra index tracked. Keep `front` (index of the front element) and a `size` counter, same as the single-ended version — `size` again resolves the full-vs-empty ambiguity so no slot needs to be wasted.

- `insertFront`: if full, fail. Otherwise move `front` one slot backward (wrapping with modulo, so `(front - 1 + k) % k` to stay non-negative) and write the value there, then increment `size`.
- `insertLast`: if full, fail. Otherwise write at `(front + size) % k` (the slot right after the current last element) and increment `size`.
- `deleteFront`: if empty, fail. Otherwise just move `front` forward one slot (`(front + 1) % k`) and decrement `size` — no need to actually clear the old slot, it'll just get overwritten later.
- `deleteLast`: if empty, fail. Otherwise decrement `size` (the "rear" slot, computed as `(front + size - 1) % k`, is simply no longer counted as part of the deque).
- `getFront`/`getRear`: same index math as `deQueue`/`Rear` from the circular queue, guarded by an empty check.

Because `front` can move in either direction, indices are always kept non-negative by adding `k` before taking the modulo when stepping backward.

**Time complexity:** O(1) for every operation.

**Space complexity:** O(k) for the backing array.
