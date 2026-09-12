# 155. Min Stack

Design a stack that supports push, pop, top, and retrieving the minimum element, all in **O(1)** time.

- `MinStack()` — initialize the stack object.
- `void push(int val)` — push `val` onto the stack.
- `void pop()` — remove the element on top of the stack.
- `int top()` — get the top element.
- `int getMin()` — retrieve the minimum element in the stack.

**Example:**
```
Input:
["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"]
[[], [-2], [0], [-3], [], [], [], []]

Output:
[null, null, null, null, -3, null, 0, -2]

Explanation:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

**Constraints:**
- -2^31 <= val <= 2^31 - 1
- Methods pop, top and getMin will always be called on a non-empty stack
- At most 3 * 10^4 calls will be made to push, pop, top, and getMin

## Approach

`push`, `pop`, and `top` are already O(1) for a normal stack — the hard part is `getMin`. Scanning the whole stack for the minimum every time getMin is called would be O(n), and recomputing it isn't safe either, because a pop can remove the current minimum and expose whatever was the minimum *before* that value was pushed.

The trick is to keep a second stack alongside the real one that tracks the running minimum at every point in time. Whenever you push a value onto the main stack, also push the smaller of that value and the current minimum onto the min-stack (or just push the value itself if the min-stack is empty). Whenever you pop from the main stack, pop from the min-stack too, in lockstep. That way the top of the min-stack is always exactly the minimum of whatever is currently in the main stack — popping the true minimum off automatically "uncovers" the previous minimum, because the min-stack already recorded it at that position.

- `push(val)`: push `val` onto the main stack; push `min(val, current min)` onto the min-stack (or `val` if the min-stack is empty).
- `pop()`: pop the top of both stacks.
- `top()`: return the top of the main stack.
- `getMin()`: return the top of the min-stack.

Because both stacks move together, every operation is just a peek/push/pop, all O(1).

**Time complexity:** O(1) for every operation (push, pop, top, getMin).

**Space complexity:** O(n) — the min-stack holds one entry per element of the main stack.
