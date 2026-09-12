# 387. First Unique Character in a String

Given a string `s`, find the first non-repeating character in it and return its index. If it doesn't exist, return `-1`.

**Example 1:**
```
Input: s = "leetcode"
Output: 0
Explanation: 'l' is the first character that appears exactly once.
```

**Example 2:**
```
Input: s = "loveleetcode"
Output: 2
```

**Example 3:**
```
Input: s = "aabb"
Output: -1
```

**Constraints:**
- 1 <= s.length <= 10^5
- `s` consists of only lowercase English letters

## Approach

The brute-force way — for each character, scan the rest of the string to see if it repeats — is O(n^2), redoing work for every position.

Two passes fixes that. First, walk the string once and build a frequency count of every character (a hash map, or since the alphabet is just lowercase English letters, a fixed 26-slot array indexed by `ch - 'a'`, which is both simpler and avoids hashing overhead). Then walk the string a second time, in order, and return the index of the first character whose count is exactly 1 — that's the first character that never repeats anywhere in the string. If nothing has count 1 by the end, return -1.

The second pass has to go in the original left-to-right order (not, say, iterate over the frequency map, which wouldn't preserve position), since "first" refers to position in the string, not to insertion order into the map.

**Time complexity:** O(n) — two linear passes over the string; building the frequency table is O(n) and so is the second scan.

**Space complexity:** O(1) — the frequency table has a fixed size of 26 (bounded by the lowercase alphabet), independent of the input length.
