# 1721. Swapping Nodes in a Linked List

You're given the head of a singly linked list and an integer `k`. Swap the values of the `k`th node from the beginning and the `k`th node from the end (1-indexed), then return the head.

**Example 1:**
```
Input: head = [1,2,3,4,5], k = 2
Output: [1,4,3,2,5]
```

**Example 2:**
```
Input: head = [7,9,6,6,7,8,3,0,9,5], k = 5
Output: [7,9,6,6,8,7,3,0,9,5]
```

**Constraints:**
- The number of nodes is `n`
- 1 <= k <= n <= 10^5

## Approach

The naive way is to walk the list once to get its length `n`, then walk it again twice more — once to reach node `k`, once to reach node `n - k + 1` — and swap their values. That's correct but makes three passes.

You can do it in a single pass with two pointers. Walk a `first` pointer `k - 1` steps from the head, so it lands on the `k`th node. Then start a `second` pointer at the head and a `runner` pointer at `first`, and advance both `runner` and `second` one step at a time until `runner` falls off the end of the list. Since `runner` and `second` are always exactly `k - 1` nodes apart, by the time `runner` reaches the last node, `second` is sitting exactly `k - 1` nodes before the end — i.e., the `k`th node from the end. Swap `first.val` and `second.val` and you're done. (If `k` is small and near the end too, `first` and `second` can even be the same node — swapping a value with itself is harmless.)

**Time complexity:** O(n) — the list is scanned once, with only a constant number of extra steps.

**Space complexity:** O(1) — just a few pointers, no matter the list length.
