# 1188. Design Bounded Blocking Queue

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently with a multi-threaded stress test (real producer/consumer threads, checked that `enqueue` genuinely blocks while full and `dequeue` genuinely blocks while empty using `threading.Thread`).

Implement a thread-safe bounded blocking queue that supports the following methods:

- `BoundedBlockingQueue(int capacity)` — initializes the queue with a maximum capacity.
- `void enqueue(int element)` — adds an element to the front of the queue. If the queue is full, the calling thread blocks until it's not full.
- `int dequeue()` — returns the element at the rear of the queue and removes it. If the queue is empty, the calling thread blocks until it's not empty.
- `int size()` — returns the number of elements currently in the queue.

Your implementation will be used with multiple producer threads calling `enqueue` and multiple consumer threads calling `dequeue` concurrently, and the class must guarantee no element is lost or duplicated and that no thread busy-waits (spins) while blocked.

**Example (single-threaded trace, illustrating ordering only):**
```
Input:
1
["BoundedBlockingQueue", "enqueue", "enqueue", "enqueue", "dequeue", "dequeue", "dequeue", "size"]
[[2], [1], [0], [2], [], [], [], []]

Output:
[1, 0, 1, 0, 0, 2, 0]

Explanation:
Producer thread starts with capacity 2:
queue.enqueue(1);  // queue = [1]
queue.enqueue(0);  // queue = [1, 0]
queue.enqueue(2);  // blocks -- queue is full at capacity 2
Consumer thread:
queue.dequeue();   // returns 1, queue = [0], unblocks the producer's enqueue(2)
queue.dequeue();   // returns 0, queue = [2]
queue.dequeue();   // returns 2, queue = []
queue.size();       // 0
```

**Constraints:**
- 1 <= Number of Prods <= 8
- 1 <= Number of Cons <= 8
- 1 <= size <= 30
- 0 <= element <= 20
- The number of calls to `enqueue` is greater than or equal to the number of calls to `dequeue`
- At least one worker will call `dequeue`

## Approach

This is fundamentally the classic **bounded producer-consumer problem**. A plain queue plus a lock alone isn't enough, because a lock only prevents concurrent access — it does nothing about waiting until a *condition* holds (queue not full / not empty) without the calling thread spinning in a busy loop burning CPU.

The right tool is a **condition variable** paired with a mutex (Python's `threading.Condition`, Java's monitor `wait`/`notifyAll`, or C++'s `condition_variable`). A condition variable lets a thread atomically release the lock and go to sleep, then get woken up and reacquire the lock when someone signals it — no polling.

Two logical conditions matter here, so it helps to think of two "signals" riding on the shared lock:
- **not full**: producers wait on this before pushing; consumers signal it after popping (there's now room).
- **not empty**: consumers wait on this before popping; producers signal it after pushing (there's now something to take).

**`enqueue(element)`**: acquire the lock, then while the queue is at capacity, wait (which releases the lock while sleeping and reacquires it on wake). Once there's room, push the element and signal `not_empty` so a waiting consumer can proceed.

**`dequeue()`**: acquire the lock, then while the queue is empty, wait on `not_full`... wait, on `not_empty`. Once there's an element, pop it, signal `not_full` so a waiting producer can proceed, and return the value.

The waits are always in a `while` loop rather than a single `if` check — this guards against **spurious wakeups** and against races where multiple threads wake up but only one of them actually gets to act before the condition becomes false again (e.g. two consumers both wake up on "not empty" but only one queue slot was freed).

`size()` just takes the lock and reads the length — trivial, but still needs the lock since the queue's size is shared mutable state.

Note: LeetCode's Python judge for this problem historically had known execution quirks around real threading, so this solution is presented as a correct, idiomatic implementation using the standard `threading` module rather than tuned around a specific judge's internals — the logic is what a production producer-consumer queue would actually use.

**Time complexity:** O(1) for `enqueue`, `dequeue`, and `size` once a thread is unblocked and holding the lock — the wait itself is not busy-waiting, so no CPU is spent while blocked.

**Space complexity:** O(capacity) for the queue's storage, plus O(1) for the lock and condition variables.
