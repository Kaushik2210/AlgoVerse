# 2. Add Two Numbers

You're given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order (the head holds the ones digit), and each node holds a single digit. Add the two numbers and return the sum as a linked list, in the same reverse-digit format.

**Example 1:**
```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807
```

**Example 2:**
```
Input: l1 = [0], l2 = [0]
Output: [0]
```

**Example 3:**
```
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
```

**Constraints:**
- The number of nodes in each list is in the range [1, 100]
- 0 <= Node.val <= 9
- It is guaranteed that the list represents a number that does not have leading zeros (unless the number itself is 0)

## Approach

You could convert each list into an actual integer, add them, and build a new list from the result — but that's fighting the problem's own setup. Reverse order is a gift: it means the digits are already lined up the same way you add numbers by hand, ones place first.

So just simulate grade-school addition. Walk both lists at the same time, adding the two digits at each position plus whatever carry came from the previous position. The new digit is `sum % 10`, and the new carry is `sum // 10`. Keep going as long as either list still has nodes, or there's a leftover carry — that last part is what handles the 999...+1 case, where the result ends up one digit longer than either input. A dummy head node keeps the code from special-casing the first digit.

**Time complexity:** O(max(n, m)) — where n and m are the lengths of the two lists; every digit position is visited once.

**Space complexity:** O(max(n, m)) — for the output list (not counting the output, this is O(1) extra space).
