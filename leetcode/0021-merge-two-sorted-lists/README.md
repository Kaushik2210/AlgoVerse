# 21. Merge Two Sorted Lists

You're given the heads of two singly linked lists, `list1` and `list2`, and both are already sorted in non-decreasing order. Merge them into a single sorted linked list and return its head. You should reuse the existing nodes — don't build new ones.

**Example 1:**
```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

**Example 2:**
```
Input: list1 = [], list2 = []
Output: []
```

**Example 3:**
```
Input: list1 = [], list2 = [0]
Output: [0]
```

**Constraints:**
- The number of nodes in both lists is in the range [0, 50]
- Both lists are sorted in non-decreasing order

## Approach

A brute-force way would be to dump every value from both lists into an array, sort the array, and rebuild a linked list from it — that works but it's wasteful: you're throwing away the fact that both inputs are already sorted, and paying an O(n log n) sort for something that should be linear.

Since both lists are already sorted, you can merge them the same way you'd merge two sorted piles of cards — always take the smaller of the two current top cards. Keep a pointer into each list, and a dummy "placeholder" node to build the result off of (this avoids annoying special-casing for the very first node). At each step, compare the current nodes of `list1` and `list2`, attach whichever is smaller to the tail of the result, and advance that list's pointer. Once one list runs out, just attach whatever's left of the other one — it's already sorted, so no more comparisons are needed.

**Time complexity:** O(n + m) — where n and m are the lengths of the two lists; each node is visited exactly once.

**Space complexity:** O(1) — we're just relinking existing nodes, not allocating new ones (aside from the throwaway dummy node).
