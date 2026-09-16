# 946. Validate Stack Sequences

**Commonly asked at:** Amazon, Google

Given two integer arrays `pushed` and `popped`, both permutations of the same set of distinct values, return whether this could be the result of a valid sequence of push and pop operations on an initially empty stack.

**Example 1:**
```
Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
Output: true
Explanation: push 1,2,3,4, pop -> 4, push 5, pop -> 5,3,2,1
```

**Example 2:**
```
Input: pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
Output: false
Explanation: 1 cannot be popped before 2.
```

**Constraints:**
- 1 <= pushed.length <= 1000
- popped is a permutation of pushed

## Approach

Rather than searching over every possible interleaving of pushes and pops (which would blow up combinatorially), just simulate it greedily — there's only one sensible strategy at each step, so there's nothing to backtrack over.

Use an actual stack and walk through `pushed` in order, pushing each value. After every push, check whether the stack's current top matches the next value still needed from `popped` (tracked with an index into `popped`); if it does, pop it and advance that index, and keep popping as long as the top keeps matching the next expected value (a single push can be immediately followed by several matching pops). This greedy check is always safe: if the top of the stack equals the next required pop, there's no reason to *not* pop it now — delaying can only ever get in the way later, never help. Once every value in `pushed` has been pushed (with all the eager popping happening along the way), the sequence was valid exactly when the stack ends up empty — anything left over means some value could never be popped in the required order.

**Time complexity:** O(n) — each value is pushed once and popped at most once across the whole simulation.

**Space complexity:** O(n) for the stack in the worst case (e.g. everything gets pushed before anything is popped).
