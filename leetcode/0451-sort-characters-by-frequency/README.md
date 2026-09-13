# 451. Sort Characters By Frequency

Given a string `s`, sort its characters in decreasing order by how often each one appears, and return the resulting string. If multiple valid answers exist (because of ties), any of them is accepted.

**Example 1:**
```
Input: s = "tree"
Output: "eert"
Explanation: 'e' appears twice, 'r' and 't' appear once each. "eetr" is also accepted.
```

**Example 2:**
```
Input: s = "cccaaa"
Output: "cccaaa"
Explanation: Both 'c' and 'a' appear three times, so "aaaccc" is also valid.
```

**Constraints:**
- 1 <= s.length <= 5 * 10^5
- s consists of uppercase and lowercase English letters and digits

## Approach

Count how many times each character appears, then order the distinct characters by count descending, and rebuild the string by repeating each character its count number of times.

**Time complexity:** O(n + u log u) where n is the string length and u is the number of unique characters — one pass to count, then a sort over the (small, bounded) set of unique characters, then a pass to rebuild the output string.

**Space complexity:** O(n) for the frequency map and the output string.
