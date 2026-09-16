# 382. Linked List Random Node

**Commonly asked at:** Amazon, Google

Given the head of a singly linked list, design a data structure that returns the value of a random node in the list, where every node must have an equal probability of being chosen. Implement the `Solution` class:

- `Solution(head)` — initializes the object with the head of the list.
- `int getRandom()` — returns a random node's value, each node equally likely.

**Example:**
```
Input:
["Solution", "getRandom", "getRandom", "getRandom"]
[[[1, 2, 3]], [], [], []]

Output:
[null, 1, 3, 2]

Explanation:
Solution s = new Solution([1, 2, 3]);
s.getRandom(); // could return 1, 2, or 3, each with 1/3 probability
```

**Constraints:**
- The number of nodes is in the range [1, 10^4]
- -10^4 <= Node.val <= 10^4
- At most 10^4 calls to getRandom

## Approach

The easy way is to copy every value into an array once in the constructor, then just index randomly into it on each `getRandom()` call — O(1) per query at the cost of O(n) extra space. That's a perfectly fine solution, but the more interesting one (and what the problem is really testing) is doing it without extra storage, in case the list is too large to duplicate, or is only given as a stream you can't rewind.

That's **reservoir sampling** with a reservoir of size 1. Walk the list once. Keep a `result` initialized to the first node's value. For each subsequent node (the `i`th node overall, 1-indexed), replace `result` with that node's value with probability `1/i`. By induction this keeps every node equally likely to be the final answer: after processing `i` nodes, each has been selected with probability exactly `1/i`; when the `(i+1)`th node arrives, it's kept with probability `1/(i+1)`, and every earlier node's chance of survival gets multiplied by `i/(i+1)` (the probability it *isn't* overwritten) — working out to `1/i * i/(i+1) = 1/(i+1)` for everyone, including the new node. One pass, no auxiliary storage, and you don't even need to know the list length ahead of time.

**Time complexity:** O(n) per `getRandom()` call, where n is the list length — the tradeoff for not needing O(n) space.

**Space complexity:** O(1) beyond the input list itself.
