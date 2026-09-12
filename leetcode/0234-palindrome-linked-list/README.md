# 234. Palindrome Linked List

Given the head of a singly linked list, determine whether it's a palindrome.

**Example 1:**
```
Input: head = [1,2,2,1]
Output: true
```

**Example 2:**
```
Input: head = [1,2]
Output: false
```

**Constraints:**
- The number of nodes is in the range [1, 10^5]
- 0 <= Node.val <= 9

## Approach

Copying every value into an array and checking it against its reverse works and is simple, but it costs O(n) extra space. Getting to O(1) extra space (beyond the traversal pointers) means reusing the list's own structure instead of a separate copy.

The plan: find the middle of the list with the classic slow/fast pointer trick (fast moves two steps for every one the slow pointer takes, so when fast runs out, slow is at the midpoint). Then reverse the second half of the list in place, the same way you'd reverse any linked list. Now there are two halves starting from the original head and from the new reversed-half head, both running toward the middle — walk them together and compare values; any mismatch means it's not a palindrome. Since the second half was physically reversed, walking it forward reads the original list's back half in reverse order, which is exactly what's needed to compare against the front half.

Optionally reverse the second half back afterward to restore the original list, though that's not required by the problem.

**Time complexity:** O(n) — finding the middle, reversing half the list, and comparing are each a linear pass.

**Space complexity:** O(1) — only a constant number of pointers, no extra data structure.
