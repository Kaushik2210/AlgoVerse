# 1593. Split a String Into the Max Number of Unique Substrings

Given a string, split it into the maximum number of substrings that, when concatenated back together in order, reproduce the original string, with the constraint that all resulting substrings must be unique (no two pieces are identical). Return that maximum count.

**Example 1:**
```
Input: s = "ababccc"
Output: 5
Explanation: One optimal split is ["a","b","ab","c","cc"] — 5 unique pieces.
```

**Example 2:**
```
Input: s = "aba"
Output: 2
Explanation: One optimal split is ["a","ba"].
```

**Example 3:**
```
Input: s = "aa"
Output: 1
Explanation: The best possible split is ["aa"], since ["a","a"] would repeat "a".
```

**Constraints:**
- 1 <= s.length <= 16
- s contains only lowercase English letters

## Approach

Since `s.length <= 16`, this is small enough for straightforward backtracking over every possible way to cut the string. At each position `start`, try every possible next piece `s[start:end]` for every `end` from `start+1` to the string's length. If that piece hasn't been used yet, add it to a "seen" set, recurse on the remainder starting at `end`, then remove it when backtracking to try other options — classic choose/explore/unchoose.

Whenever the recursion reaches the end of the string, the current set of pieces represents one complete valid split, so record its size as a candidate for the best answer.

One pruning trick keeps this fast: if the number of pieces already chosen plus the number of characters remaining (the absolute best case, where every remaining character became its own single-character piece) can't beat the current best, there's no point continuing down this branch — cut it off early with `len(seen) + (n - start) <= best`.

**Time complexity:** O(2^n * n) in the worst case — there are roughly 2^(n-1) ways to place cut points in a string of length n, and each candidate split costs O(n) to build and hash its substrings, though the pruning meaningfully cuts down the explored branches in practice.

**Space complexity:** O(n) for the recursion depth and the set of pieces along the current path.
