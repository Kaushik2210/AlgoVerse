# 2130. Maximum Twin Sum of a Linked List

**Commonly asked at:** Amazon, Google, Meta, Microsoft, Bloomberg

You're given the head of a linked list with an even number of nodes `n`. For `0 <= i < n / 2`, the `i`th node and the `(n - 1 - i)`th node are twins. Define the twin sum as the sum of a node's value and its twin's value. Return the maximum twin sum over all pairs.

**Example 1:**
```
Input: head = [5,4,2,1]
Output: 6
Explanation: Twin pairs are (5,1) and (4,2), so sums are 6 and 6. Max is 6.
```

**Example 2:**
```
Input: head = [4,2,2,3]
Output: 7
Explanation: Twin pairs are (4,3) and (2,2), sums 7 and 4. Max is 7.
```

**Constraints:**
- The number of nodes is an even number in the range [2, 10^5]
- 1 <= Node.val <= 10^5

## Approach

The easy version is to copy every value into an array first, then just add `arr[i] + arr[n-1-i]` for each `i` up to the middle — O(n) time, but O(n) extra space for the array. The list only has forward pointers, so pairing a node with its mirror from the other end normally requires either that array or recursion depth O(n).

To do it in O(1) extra space, restructure the list itself. First, find the middle node with the classic slow/fast pointer technique (fast moves two steps for every one of slow's, so when fast reaches the end, slow is at the midpoint). Then reverse the second half of the list in place, starting from that midpoint — this is exactly the same in-place reversal as problem 206, just applied to a sublist. Once reversed, twins are no longer at mirrored ends of the list; they're sitting right next to each other in position, one node in from `head` and one node in from the reversed second half's head. Walk both halves forward together, adding corresponding values and tracking the max as you go.

**Time complexity:** O(n) — finding the middle, reversing the second half, and pairing values are each a single linear pass.

**Space complexity:** O(1) — the reversal is done in place with just a few pointers, no extra data structure.
