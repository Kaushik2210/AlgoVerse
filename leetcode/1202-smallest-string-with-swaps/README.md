# 1202. Smallest String With Swaps

**Commonly asked at:** Amazon, Facebook

You're given a string `s` and an array `pairs`, where `pairs[i] = [a, b]` means you're allowed to swap the characters at indices `a` and `b` in `s`, any number of times, in any order. Return the lexicographically smallest string that `s` can be rearranged into using these allowed swaps.

**Example 1:**
```
Input: s = "dcab", pairs = [[0,3],[1,2]]
Output: "bacd"
Explanation: Swap s[0] and s[3] -> "bcad". Swap s[1] and s[2] -> "bacd".
```

**Example 2:**
```
Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
Output: "abcd"
Explanation: All four indices end up connected, so the whole string can be freely rearranged.
```

**Constraints:**
- 1 <= s.length <= 10^5
- 0 <= pairs.length <= 10^5
- 0 <= pairs[i][0], pairs[i][1] < s.length
- s consists of lowercase English letters

## Approach

If index `a` can swap with `b`, and `b` can swap with `c`, then (through intermediate swaps) `a`'s character can effectively end up at `c`'s position too — swappability is transitive. That means every group of indices connected (directly or indirectly) through `pairs` forms one fully interchangeable set: any permutation of the characters within that group of indices is reachable.

Use union-find to group indices: union every `[a, b]` pair. Then, for each connected component, collect the characters currently sitting at its indices, sort them, and place them back into those same indices in sorted order — but the indices themselves also need to be visited in sorted order within the group, so the smallest character goes to the smallest index, the second smallest to the second smallest index, and so on. That's what makes the result lexicographically smallest: independently minimizing each group's arrangement (sorted characters into sorted indices) is optimal since groups don't interact with each other at all.

Implementation: build the union-find over all `n` indices, union all pairs, then group indices by their root using a map from root -> list of indices. For each group, sort the indices, extract and sort the characters at those indices, and write the sorted characters back into the sorted indices.

**Time complexity:** O(n log n + p * alpha(n)) — sorting characters within each group dominates (bounded by O(n log n) total across all groups), union-find operations are near-constant.

**Space complexity:** O(n) for the union-find structure and the grouped indices/characters.
