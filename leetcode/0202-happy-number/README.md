# 202. Happy Number

An integer `n` is happy if repeating this process eventually reaches 1: replace the number with the sum of the squares of its digits. If the process loops forever in a cycle that never includes 1, `n` is not happy. Return `true` if `n` is happy, `false` otherwise.

**Example 1:**
```
Input: n = 19
Output: true
Explanation: 1^2+9^2=82 -> 8^2+2^2=68 -> 6^2+8^2=100 -> 1^2+0^2+0^2=1
```

**Example 2:**
```
Input: n = 2
Output: false
```

**Constraints:**
- 1 <= n <= 2^31 - 1

## Approach

The digit-squaring process is deterministic — every number maps to exactly one next number — so repeating it from any starting point is just walking a linked list made of numbers instead of nodes, where "next" is `sumOfSquaredDigits(n)`. A sequence like that either reaches 1 (happy) or enters a cycle that excludes 1 (not happy, since digit-square sums are bounded and can't grow forever, so *something* eventually repeats).

The simplest way to detect this is with a hash set: keep computing the next value and stop as soon as you either hit 1 (happy) or see a value you've already seen before (a cycle, not happy). This uses O(cycle length) space.

To do it in O(1) space, treat it exactly like the linked-list-cycle problem and use Floyd's tortoise and hare: a slow pointer takes one step (one digit-square-sum) per iteration, a fast pointer takes two. If `n` is happy, the fast pointer reaches 1 and the loop ends there. If not, slow and fast are walking around the same cycle at different speeds and are guaranteed to eventually land on the same value, at which point you know it's not happy without ever storing anything.

**Time complexity:** O(log n) per digit-square-sum computation, and the cycle/convergence length is bounded by a small constant in practice, so effectively O(log n) overall.

**Space complexity:** O(1) with the cycle-detection approach (O(k) with a hash set, where k is the cycle length).
