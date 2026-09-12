# 225. Implement Stack using Queues

Implement a last-in-first-out (LIFO) stack using only one or two queues. The implemented stack should support `push`, `pop`, `top`, and `empty`, using standard queue operations (push/enqueue to back, peek/pop from front, size, is empty).

- `void push(int x)` — pushes element x to the top of the stack.
- `int pop()` — removes the element on top of the stack and returns it.
- `int top()` — returns the element on top of the stack.
- `boolean empty()` — returns whether the stack is empty.

**Example:**
```
Input:
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]

Output:
[null, null, null, 2, 2, false]

Explanation:
MyStack s = new MyStack();
s.push(1);
s.push(2);
s.top();   // return 2
s.pop();   // return 2
s.empty(); // return false
```

**Constraints:**
- 1 <= x <= 9
- At most 100 calls total to push, pop, top, and empty
- All calls to pop and top are valid

## Approach

A queue is FIFO, but a stack needs the most recently added element to come out first — the opposite order. The trick is to make `push` do a little extra work so that the queue's front *always* holds the most recently pushed element, which makes `pop`/`top` trivial single-queue operations.

Use a **single queue**. On `push(x)`:
1. Enqueue `x` at the back, same as normal.
2. Then rotate the queue: dequeue and immediately re-enqueue every element that was already there before `x` (i.e., everything except `x` itself), one at a time, `size - 1` times.

After that rotation, `x` — which started at the back — has cycled all the way around to the front, while everything else keeps its old relative order behind it. So the front of the queue is always the top of the stack, and `pop`/`top`/`empty` just delegate directly to the queue's own front-facing operations.

This pushes all the reordering cost onto `push` (O(n) per call) in exchange for making `pop`/`top` free (O(1)) — the reverse trade-off from the "implement queue using stacks" problem, where `push` was cheap and `pop` did the amortized work.

**Time complexity:** O(n) for `push` (rotating the queue), O(1) for `pop`, `top`, and `empty`.

**Space complexity:** O(n) to hold all elements in the queue.
