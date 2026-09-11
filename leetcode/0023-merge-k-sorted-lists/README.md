# 23. Merge k Sorted Lists

You're given an array of `k` linked lists, each already sorted in ascending order. Merge all of them into one sorted linked list and return its head.

**Example 1:**
```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
```

**Example 2:**
```
Input: lists = []
Output: []
```

**Example 3:**
```
Input: lists = [[]]
Output: []
```

**Constraints:**
- k == lists.length
- 0 <= k <= 10^4
- 0 <= lists[i].length <= 500
- -10^4 <= lists[i][j] <= 10^4
- lists[i] is sorted in ascending order
- The sum of lists[i].length will not exceed 10^4

## Approach

The brute-force option is to dump every node's value into one big array, sort it, and rebuild a list — O(N log N) where N is the total node count, plus it throws away the fact that each individual list is already sorted.

A cleaner way to use that structure: this is just "merge two sorted lists" generalized to k lists, and at any moment the next smallest value overall is the smallest of the k lists' current heads. A min-heap is exactly the tool for "give me the smallest of several candidates, repeatedly." Push the head of every non-empty list into the heap (keyed by value), then repeatedly pop the smallest, attach it to the output, and if that node had a `next`, push that into the heap too. This keeps the heap size at most k at all times, so each of the N total nodes costs O(log k) to push/pop.

An alternative with the same complexity is divide-and-conquer pairwise merging (merge lists 2 at a time, then merge those results 2 at a time, and so on — like the merge step of merge sort) — it avoids needing a heap but visits nodes O(log k) times too.

**Time complexity:** O(N log k) — where N is the total number of nodes across all lists and k is the number of lists; every node is pushed/popped from a heap of size at most k.

**Space complexity:** O(k) — for the heap (not counting the output list).
