# 622. Design Circular Queue

Design your own implementation of a circular queue (a.k.a. ring buffer). The queue connects the last position back to the first to make use of otherwise-wasted space when items are dequeued from the front. Implement the `MyCircularQueue` class:

- `MyCircularQueue(k)` — initializes the queue with a fixed size `k`.
- `boolean enQueue(int value)` — inserts `value` at the rear; returns `true` if successful (queue not full).
- `boolean deQueue()` — removes an item from the front; returns `true` if successful (queue not empty).
- `int Front()` — gets the front item, or -1 if the queue is empty.
- `int Rear()` — gets the last item, or -1 if the queue is empty.
- `boolean isEmpty()` — checks whether the queue is empty.
- `boolean isFull()` — checks whether the queue is full.

**Example:**
```
Input:
["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]

Output:
[null, true, true, true, false, 3, true, true, true, 4]

Explanation:
MyCircularQueue q = new MyCircularQueue(3);
q.enQueue(1);  // true
q.enQueue(2);  // true
q.enQueue(3);  // true
q.enQueue(4);  // false, queue full
q.Rear();       // 3
q.isFull();     // true
q.deQueue();    // true
q.enQueue(4);  // true
q.Rear();       // 4
```

**Constraints:**
- 1 <= k <= 1000
- 0 <= value <= 1000
- At most 3000 calls total to enQueue, deQueue, Front, Rear, isEmpty, isFull

## Approach

Back this with a fixed-size array of length `k` and two indices, `front` and `rear` (or just `front` plus a running `count`), both wrapping around via modulo `k` so the array is reused as a ring instead of shifting elements on every dequeue.

The classic gotcha with a ring buffer is telling "empty" and "full" apart when using only two index pointers, since both cases can leave `front == rear`. The cleanest fix is to just track an explicit `size` counter alongside `front`:
- `enQueue`: if `size == k`, fail. Otherwise write into slot `(front + size) % k` and increment `size`.
- `deQueue`: if `size == 0`, fail. Otherwise advance `front = (front + 1) % k` and decrement `size`.
- `Front`/`Rear`: read `queue[front]` / `queue[(front + size - 1) % k]` (guard for empty first).
- `isEmpty`/`isFull`: just compare `size` to 0 / `k`.

(An alternative that avoids the counter is to deliberately waste one array slot and use it to distinguish full from empty via `front`/`rear` positions — but the counter approach is simpler to reason about and uses exactly `k` slots.)

**Time complexity:** O(1) for every operation.

**Space complexity:** O(k) for the backing array.
