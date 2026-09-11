# 141. Linked List Cycle

Given the head of a linked list, determine whether the list has a cycle in it — meaning some node's `next` pointer eventually loops back to a node earlier in the list instead of ending in `null`.

**Example 1:**
```
Input: head = [3,2,0,-4], with a cycle where the tail connects back to node index 1
Output: true
```

**Example 2:**
```
Input: head = [1], no cycle
Output: false
```

**Constraints:**
- The number of nodes is in the range [0, 10^4]

## Approach

The straightforward way is to keep a hash set of every node you've visited, and if you ever land on a node that's already in the set, there's a cycle. That works and is O(n), but it also costs O(n) extra memory — which is avoidable here.

The classic space-efficient trick is **Floyd's cycle detection**, also known as the "tortoise and hare." Use two pointers that both start at the head, but move at different speeds: `slow` advances one node at a time, `fast` advances two nodes at a time. If there's no cycle, `fast` will simply reach the end (`null`) first, since it's covering ground twice as fast. But if there *is* a cycle, `fast` and `slow` are both stuck looping inside it forever — and because `fast` gains on `slow` by one extra step every iteration, it's guaranteed to eventually catch up and land on the exact same node as `slow`. That meeting is proof of a cycle.

So: move both pointers each iteration (checking that `fast` and `fast.next` aren't `null` first, so you don't crash trying to step off the end). If they ever point at the same node, there's a cycle — return true. If `fast` runs off the end, there's no cycle — return false.

**Time complexity:** O(n) — in the worst case the fast pointer covers the list (and any cycle) a small constant number of times before meeting `slow` or hitting the end.

**Space complexity:** O(1) — just two pointers, regardless of list length.
