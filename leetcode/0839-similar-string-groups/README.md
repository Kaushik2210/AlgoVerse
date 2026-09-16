# 839. Similar String Groups

**Commonly asked at:** Google

Two strings `X` and `Y` are similar if they're equal, or if swapping exactly two letters in `X` (at any two positions) makes it equal to `Y`. Similarity forms groups: string `X` and `Y` are in the same group if `X` is similar to `Y`, or if there's some string `Z` such that `X` is similar to `Z` and `Z` is similar to `Y` (i.e. the group is the connected component under the similarity relation). Given an array `strs` of anagrams of each other (all strings are permutations of the same multiset of letters), return the number of groups.

**Example 1:**
```
Input: strs = ["tars","rats","arts","star"]
Output: 2
Explanation: "tars" and "rats" differ in exactly 2 positions (similar), and "rats" and "arts" differ in exactly 2 positions (similar),
so {"tars","rats","arts"} form one group by transitivity. "star" differs from all three in more than 2 positions, so it's its own group.
```

**Example 2:**
```
Input: strs = ["omv","ovm"]
Output: 1
```

**Constraints:**
- 1 <= strs.length <= 300
- 1 <= strs[i].length <= 300
- strs[i] consists of lowercase letters only
- All words in strs have the same length and are anagrams of each other

## Approach

This is a connected-components problem: treat each string as a node, connect two nodes with an edge if they're similar (differ in exactly 0 or 2 positions, since all strings are anagrams of each other so they always have the same letter multiset), and count the number of connected components. Union-find is the natural tool.

For each pair of strings `(strs[i], strs[j])` with `i < j`, check similarity by counting the number of positions where they differ. If that count is 0 or 2 (0 meaning literally equal, 2 meaning a single swap fixes it), union their indices. After checking all pairs, the number of distinct roots in the union-find structure is the answer.

The naive pairwise check is O(n^2 * L) where n is the number of strings and L is the string length (comparing every pair takes O(L) to count differing positions), which is fine given `n <= 300` and `L <= 300`.

**Time complexity:** O(n^2 * L) for the pairwise similarity checks, plus near-constant union-find operations.

**Space complexity:** O(n) for the union-find parent array.
