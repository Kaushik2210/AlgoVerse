# 1172. Dinner Plate Stacks

You have an infinite number of stacks arranged in a row, all with the same fixed `capacity`. Implement the `DinnerPlates` class:

- `DinnerPlates(capacity)` — initializes with the given per-stack capacity.
- `void push(val)` — pushes `val` onto the **leftmost** stack that isn't at capacity, creating a new stack at the end if every existing stack is full.
- `int pop()` — pops and returns the top value of the **rightmost** non-empty stack, or -1 if all stacks are empty.
- `int popAtStack(index)` — pops and returns the top value of the stack at `index`, or -1 if that stack is empty (or doesn't exist).

**Example:**
```
Input:
["DinnerPlates", "push", "push", "push", "push", "push", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "pop", "pop", "pop", "pop"]
[[2], [1], [2], [3], [4], [5], [0], [20], [21], [0], [2], [], [], [], [], []]

Output:
[null, null, null, null, null, null, 2, null, null, 20, 21, 5, 4, 3, 1, -1]

Explanation:
DinnerPlates D = DinnerPlates(2);
D.push(1); D.push(2); D.push(3); D.push(4); D.push(5); // stacks: [1,2] [3,4] [5]
D.popAtStack(0);   // returns 2, stacks: [1] [3,4] [5]
D.push(20);        // stacks: [1,20] [3,4] [5] (leftmost stack with room)
D.push(21);        // stacks: [1,20] [3,4] [5,21]
D.popAtStack(0);    // returns 20
D.popAtStack(2);    // returns 21
D.pop();           // returns 5
D.pop();           // returns 4
D.pop();           // returns 3
D.pop();           // returns 1
D.pop();           // returns -1, everything empty
```

**Constraints:**
- 1 <= capacity <= 2 * 10^4
- 1 <= val <= 2 * 10^5
- 0 <= index <= 10^5
- At most 2 * 10^5 calls total to push, pop, and popAtStack

## Approach

The obvious brute force — scanning left to right on every `push` to find the first non-full stack — is O(number of stacks) per push, and with up to 2*10^5 calls that's too slow if there end up being many stacks.

The trick is to track candidacy instead of re-deriving it every time. Keep a list of stacks (each just a small array/list bounded by `capacity`), plus a **min-heap of stack indices that might currently have room**. "Might" is the important word: an index can sit in the heap even after it's been filled up or emptied out from under it — cleanup is lazy, done only when that entry actually surfaces as the candidate. `push` peeks the smallest index in the heap, and if it turns out to be stale (index no longer exists, or that stack is already full), it's simply popped off and discarded, repeating until either a genuinely available index is found or the heap runs dry, in which case a brand new stack is appended at the end. After pushing into the chosen index, if that stack still has room, its index goes back on the heap so it can be reused.

`popAtStack(index)` pops the value if present and unconditionally pushes `index` back onto the available-heap (it now definitely has room) — no harm if it was already there or later becomes stale itself; the next `push` sorts that out. `pop()` needs the rightmost *non-empty* stack, which is handled by just trimming empty stacks off the tail of the stack list before delegating to `popAtStack` on whatever new last index remains — since a stack only grows by appending at the very end, each stack is trimmed at most once ever, so this trimming costs O(1) amortized across all calls, not O(n) per call.

**Time complexity:** O(log n) amortized per operation, where n is the number of stacks created — heap push/pop dominate; the lazy trimming and lazy heap-cleanup are each O(1) amortized since every index is added to / removed from the structures a bounded number of times overall.

**Space complexity:** O(n * capacity) for the stacks themselves, plus O(n) for the heap in the worst case (stale entries can pile up before being cleaned).
