# 232. Implement Queue using Stacks

Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support `push`, `pop`, `peek`, and `empty`, all using standard stack operations (push, pop, top/peek, size, is empty).

- `void push(int x)` — pushes element x to the back of the queue.
- `int pop()` — removes the element from the front of the queue and returns it.
- `int peek()` — returns the element at the front of the queue.
- `boolean empty()` — returns whether the queue is empty.

**Example:**
```
Input:
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]

Output:
[null, null, null, 1, 1, false]

Explanation:
MyQueue q = new MyQueue();
q.push(1);
q.push(2);
q.peek();  // return 1
q.pop();   // return 1
q.empty(); // return false
```

**Constraints:**
- 1 <= x <= 9
- At most 100 calls total to push, pop, peek, and empty
- All calls to pop and peek are valid

## Approach

A single stack reverses order (LIFO); to get FIFO behavior out of stacks, use two of them with different roles: an **`in`** stack that absorbs everything pushed, and an **`out`** stack that serves everything popped/peeked.

- `push(x)`: just push onto `in` — O(1), no reordering needed yet.
- `pop`/`peek`: if `out` is empty, dump all of `in` onto `out` by repeatedly popping `in` and pushing onto `out`. Since `in` has the most recently pushed element on top, transferring it to `out` reverses the order, putting the *oldest* pushed element on top of `out` — exactly the FIFO front. Then just pop/peek `out` as normal.
- If `out` isn't empty, it already holds elements in the correct front-to-back order (top-of-`out` = front-of-queue), so just use it directly without touching `in`.

The key insight for the complexity is **amortized cost**: each element is pushed onto `in` once, and moved from `in` to `out` at most once over its lifetime, so even though a single "dump" operation can be O(n) in the worst case, the total work across a sequence of n operations is still O(n) — each element only gets transferred once no matter how many `pop`/`peek` calls happen while it sits in `out`.

**Time complexity:** O(1) amortized for `push`, `pop`, `peek`, `empty` (a `pop`/`peek` can be O(n) in a single worst-case call, but O(1) amortized across all calls).

**Space complexity:** O(n) to hold all elements across the two stacks.
