# 445. Add Two Numbers II

You're given two non-empty linked lists representing two non-negative integers. The most significant digit comes first (normal reading order), and each node holds a single digit. Add the two numbers and return the sum as a linked list, again with the most significant digit first.

You may assume neither list has leading zeros, except the number 0 itself. (Follow-up: can you solve it without reversing the input lists?)

**Example 1:**
```
Input: l1 = [7,2,4,3], l2 = [5,6,4]
Output: [7,8,0,7]
Explanation: 7243 + 564 = 7807
```

**Example 2:**
```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [8,0,7]
```

**Example 3:**
```
Input: l1 = [0], l2 = [0]
Output: [0]
```

**Constraints:**
- 1 <= list length <= 100
- 0 <= Node.val <= 9

## Approach

This is the opposite layout from the original Add Two Numbers, where digits are stored least-significant-first, which makes addition trivial to do left-to-right (i.e., front-to-back) while carrying. Here the most significant digit is at the front, so adding correctly needs to start from the *ones* place, which is at the *back* of each list.

The simplest fix: **reverse both input lists**, then the problem becomes exactly the original Add Two Numbers — walk both reversed lists from their heads (now the ones digit), add digit by digit with a running carry, and build the result list by appending as you go (which naturally comes out least-significant-first, matching how you're consuming the input) — then reverse the result once at the end to restore most-significant-first order.

An equivalent, arguably cleaner way to get the same effect without physically reversing anything (relevant for the follow-up if reversing is considered off-limits) is to push every digit of each list onto a **stack**. Popping a stack naturally gives you least-significant-first order for free. Then pop from both stacks simultaneously, add with carry, and instead of appending the results (which would come out backwards), prepend each new digit to the front of the result list — since each digit produced is more significant than the last, building front-to-back with prepend gets the most-significant-first order directly without a final reversal.

Either approach is O(n + m) time; the stack version avoids mutating the input lists.

**Time complexity:** O(n + m) where n, m are the lengths of the two lists.

**Space complexity:** O(n + m) for the stacks (or O(1) extra if reversing in place, aside from the output list itself).
