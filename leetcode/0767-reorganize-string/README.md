# 767. Reorganize String

Given a string `s`, rearrange the characters of `s` so that any two adjacent characters are not the same. Return any possible rearrangement of `s` or return `""` if not possible.

**Example 1:**
```
Input: s = "aab"
Output: "aba"
```

**Example 2:**
```
Input: s = "aaab"
Output: ""
```

**Constraints:**
- 1 <= s.length <= 500
- s consists of only lowercase English letters.

## Approach

First, a quick feasibility check: if the most frequent character appears more than `(n + 1) // 2` times, it's mathematically impossible to space it out without two copies ending up adjacent (there just aren't enough "gaps" from the other characters to separate every occurrence), so return `""` immediately.

Otherwise, greedily always place the currently most frequent remaining character next — this is the same intuition as task scheduling with a cooldown: keeping the most abundant item on deck and interleaving it with anything else available minimizes the chance it ever needs to sit next to itself.

Use a max-heap (Python's heapq is a min-heap, so store negated counts) keyed by remaining count. Pop the most frequent character, append it to the result, and decrement its count. The character just placed can't be reused immediately — pushing it back into the heap right away would let it get popped again next iteration if it's still the most frequent, producing a duplicate adjacency. So instead, hold it in a "previous" slot for exactly one round; once the next character has been placed (creating one letter of separation), push the previous one back into the heap if it still has remaining occurrences.

If the heap empties out before the result reaches the original string's length, something incompatible slipped through (shouldn't happen given the upfront feasibility check, but it's a safe guard) — return `""`. Otherwise join and return the built characters.

**Time complexity:** O(n log k) where `k` is the number of distinct characters (at most 26), since every character placement does a constant number of heap operations.

**Space complexity:** O(k) for the heap and counts, plus O(n) for the output string.
