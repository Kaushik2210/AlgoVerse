# 2181. Reverse Nodes in Even Length Groups

**Commonly asked at:** Google, Meta, Bloomberg

Given the head of a linked list, split its nodes into consecutive, increasingly-sized groups: the 1st group has 1 node, the 2nd has 2 nodes, the 3rd has 3, and so on. The final group may have fewer nodes than its target size if the list runs out. Reverse the nodes in every group whose *actual* length is even, and leave groups with odd length untouched. Return the head of the resulting list.

**Example 1:**
```
Input: head = [5,2,6,3,9,1,7,3,8,4]
Output: [5,6,2,3,9,1,4,8,3,7]
Explanation: Group 1 = [5] (odd, len 1, untouched). Group 2 = [2,6] (even, reversed to [6,2]). Group 3 = [3,9,1] (odd, len 3, untouched). Group 4 would target 4 nodes but only [7,3,8,4] remain (even, len 4, reversed to [4,8,3,7]).
```

**Example 2:**
```
Input: head = [1,1,0,6]
Output: [1,0,1,6]
Explanation: Group 1 = [1] untouched. Group 2 target 2, [1,0] remain (even, reversed to [0,1]). Group 3 target 3, only [6] remains (odd len 1, untouched).
```

**Constraints:**
- The number of nodes is in the range [1, 10^5]
- 0 <= Node.val <= 10^5

## Approach

This is simulation with a twist on the group-size bookkeeping: since the last group can be truncated by running out of list, you can't decide whether to reverse a group just from its *target* size — you have to find out how many nodes are actually available first.

Track a `prev` pointer sitting on the tail of whatever group was last finalized (starting at `head`, since group 1 is always length 1 and never reversed). For each subsequent group with target size `group_len` (starting at 2, incrementing each iteration): walk forward from the group's start up to `group_len` steps, or until the list ends, counting how many nodes you actually crossed (`count`) and noting the node right after the group (`group_end`, possibly null).

If `count` is even, reverse just those `count` nodes in place — a standard bounded-length reversal where the "previous" pointer starts at `group_end` (so the reversed group's new tail correctly points past itself), then link `prev.next` to the new head of the reversed group (the old last node) and set `prev` to the group's original start (now its tail, since reversal flips the order). If `count` is odd, skip reversing — just advance `prev` by walking `count - 1` steps from the group's start to find its tail. Either way, move on to the next group starting at `group_end`.

**Time complexity:** O(n) — every node is visited a constant number of times total: once while measuring each group's actual length, and once more if that group gets reversed.

**Space complexity:** O(1) — everything is relinked in place with a handful of pointers.
