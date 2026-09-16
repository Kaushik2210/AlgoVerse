# 1381. Design a Stack With Increment Operation

**Commonly asked at:** Amazon, Bloomberg

Design a stack that supports a fixed maximum size and an increment operation. Implement the `CustomStack` class:

- `CustomStack(maxSize)` — initializes the stack with maximum size `maxSize`.
- `void push(x)` — pushes `x` onto the stack, if it hasn't reached `maxSize`.
- `int pop()` — pops and returns the top element, or -1 if the stack is empty.
- `void increment(k, val)` — adds `val` to the bottom `min(k, size)` elements of the stack.

**Example:**
```
Input:
["CustomStack", "push", "push", "pop", "push", "push", "push", "increment", "increment", "pop", "pop", "pop", "pop"]
[[3], [1], [2], [], [2], [3], [4], [5, 100], [2, 100], [], [], [], []]

Output:
[null, null, null, 2, null, null, null, null, null, 103, 202, 201, -1]

Explanation:
CustomStack s = new CustomStack(3);
s.push(1); s.push(2);       // stack: [1, 2]
s.pop();                     // returns 2, stack: [1]
s.push(2); s.push(3); s.push(4); // stack: [1, 2, 3] (4 is rejected, maxSize reached)
s.increment(5, 100);         // stack: [101, 102, 103]
s.increment(2, 100);         // stack: [201, 202, 103]
s.pop(); s.pop(); s.pop(); s.pop(); // 103, 202, 201, -1
```

**Constraints:**
- 1 <= maxSize <= 1000
- 1 <= x, k <= 1000
- 0 <= val <= 100
- At most 1000 calls total to push, pop, and increment

## Approach

Back the stack with a plain resizable array, where the array's front (index 0) is the bottom of the stack and the array's back is the top — that's the natural fit since `push`/`pop` only touch the top (append/remove from the end, O(1) amortized) while `increment` only touches a prefix from the bottom.

`push` just appends, guarded by checking the current size against `maxSize` first. `pop` removes and returns the last element, or -1 if the array is empty. `increment(k, val)` adds `val` to indices `0` through `min(k, size) - 1` — the `min` handles the case where `k` is larger than however many elements are actually on the stack, so it just increments everything available instead of going out of bounds.

Given the tight constraints (array size and call count both capped at 1000), a plain O(k) loop per increment is more than fast enough — no need for the fancier "lazy increment" trick (storing pending increments and only applying them on pop) that would matter if increments or the stack size were much larger.

**Time complexity:** O(1) amortized for `push`/`pop`, O(k) for `increment`.

**Space complexity:** O(maxSize) for the backing array.
