# 1898. Maximum Number of Removable Characters

**Commonly asked at:** Amazon

You're given strings `s` and `p` where `p` is a subsequence of `s`, and an array `removable` containing distinct indices of `s`, ordered in the sequence they'd be removed. For a `k` from `0` to `removable.length`, mark the first `k` indices in `removable` as removed from `s`; call `k` *valid* if `p` is still a subsequence of the resulting string. Return the maximum valid `k`.

**Example 1:**
```
Input: s = "abcacb", p = "ab", removable = [3,1,0]
Output: 2
Explanation: Removing indices 3 and 1 leaves "accb", and "ab" is still a subsequence (a at index 0, b at the end).
Removing indices 3, 1, and 0 as well leaves "ccb", where "ab" is no longer a subsequence. So the maximum valid k is 2.
```

**Example 2:**
```
Input: s = "abcbddddd", p = "abcd", removable = [3,2,1,4,5,6]
Output: 1
```

**Example 3:**
```
Input: s = "abcab", p = "abc", removable = [0,1,2,3,4]
Output: 0
```

**Constraints:**
- 1 <= p.length <= s.length <= 10^5
- 0 <= removable.length < s.length
- 0 <= removable[i] < s.length
- p is a subsequence of s
- s and p both consist of lowercase English letters

## Approach

The core check — "is `p` still a subsequence of `s` after removing a specific set of indices?" — is a simple O(n) two-pointer scan. The question is how many prefixes of `removable` to try before finding the answer, and trying every `k` from 0 upward one at a time could mean up to `O(n)` subsequence checks, each `O(n)`, giving `O(n^2)` — too slow for `n` up to 10^5.

The trick is that "validity" of `k` is monotonic: if removing the first `k` indices still leaves `p` as a subsequence, then removing any smaller prefix (fewer removals) also leaves `p` as a subsequence, since removing fewer characters can only help, never hurt, `p`'s chances of surviving as a subsequence. So as `k` increases from 0, validity can only go from true to false, never back — a single flip point. That's exactly the structure binary search needs.

Binary search `k` between 0 and `len(removable)`. For a candidate `k`, mark the first `k` indices of `removable` (put them in a set for O(1) lookup) as removed, then run the standard subsequence check: walk `s` left to right, skipping removed indices, advancing a pointer into `p` whenever the current character of `s` matches the next needed character of `p`; `k` is valid if that pointer reaches the end of `p`. Shrink the binary search toward the largest valid `k`.

**Time complexity:** O(n log n) — O(log n) binary search steps, each doing an O(n) subsequence check (building the removed-set and scanning `s`).

**Space complexity:** O(n) for the removed-index set.
