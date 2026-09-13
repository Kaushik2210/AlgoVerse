# 87. Scramble String

We can scramble a string `s` to get a string `t` using the following algorithm:
1. If the length of the string is 1, stop.
2. If the length of the string is > 1, do the following:
   - Split the string into two non-empty substrings at a random index, i.e., if the string is `s`, divide it to `x` and `y` where `s = x + y`.
   - Randomly decide to swap the two substrings or to keep them in the same order, i.e., after this step, `s` may become `s = x + y` or `s = y + x`.
   - Apply step 1 recursively on each of the two substrings `x` and `y`.

Given two strings `s1` and `s2` of the same length, return `true` if `s2` is a scrambled string of `s1`, otherwise, return `false`.

**Example 1:**
```
Input: s1 = "great", s2 = "rgeat"
Output: true
Explanation: One possible scenario is:
"great" --> "gr/eat" --> "rg/eat" (swap the two substrings) --> "rg/eat" --> "rg/eat" --> "rgeat"
```

**Example 2:**
```
Input: s1 = "abcde", s2 = "caebd"
Output: false
```

**Constraints:**
- s1.length == s2.length
- 1 <= s1.length <= 30
- s1 and s2 consist of lowercase English letters.

## Approach

Recursive divide-and-conquer with memoization. Two strings `a` and `b` (equal length) are scrambles of each other if either:
- They're already identical, or
- They have a split point `i` such that either:
  - `a[:i]` scrambles to `b[:i]` **and** `a[i:]` scrambles to `b[i:]` (no swap happened at this level), or
  - `a[:i]` scrambles to `b[n-i:]` **and** `a[i:]` scrambles to `b[:n-i]` (the two halves got swapped at this level, so a's left half has to line up with b's *right* half of matching length, and vice versa)

Before recursing into all the split points, a cheap pruning check: if `sorted(a) != sorted(b)`, the two strings don't even have the same multiset of letters, so no scrambling could ever make them equal — bail out immediately without trying any split.

Try every split index `i` from 1 to `n-1`; if any split satisfies either the no-swap or swap case, the strings are scrambles of each other.

Memoize on the pair `(a, b)` since the same substring pair recurs constantly across different split points and recursion branches — without it this blows up exponentially, with it the state space collapses to substrings of `s1` paired with substrings of `s2` of the same length.

**Time complexity:** Roughly O(n^4) — there are O(n^2) possible `(a, b)` substring pairs (bounded by their starting index and shared length), and each one does O(n) work trying every split point (plus the O(n log n) sort check, which is dominated by other factors here).

**Space complexity:** O(n^4) in the worst case for the memoization cache (bounded in practice by the number of distinct substring pairs actually visited), plus O(n) recursion depth.
