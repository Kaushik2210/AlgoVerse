# 940. Distinct Subsequences II

**Commonly asked at:** Google

Given a string `s`, return the number of distinct non-empty subsequences of `s`. Since the answer may be very large, return it modulo `10^9 + 7`.

**Example 1:**
```
Input: s = "abc"
Output: 7
Explanation: The 7 distinct subsequences are "a", "b", "c", "ab", "ac", "bc", and "abc".
```

**Example 2:**
```
Input: s = "aba"
Output: 6
Explanation: The 6 distinct subsequences are "a", "b", "ab", "ba", "aa" and "aba".
```

**Example 3:**
```
Input: s = "aaa"
Output: 3
Explanation: The 3 distinct subsequences are "a", "aa" and "aaa".
```

**Constraints:**
- 1 <= s.length <= 2000
- s consists of lowercase English letters.

## Approach

Track a running total of distinct non-empty subsequences formed so far, plus a breakdown of how many of those end in each specific character (`end_with[c]`).

When a new character `ch` arrives, every existing subsequence can be extended by appending `ch` to its end, and `ch` alone is also a new subsequence — so there are `total + 1` new subsequences that end in `ch` after this step.

The catch is duplicates: any subsequence that *already* ended in `ch` before this step would get double-counted, because extending the same-ending subsequences with the same character regenerates strings already produced by an earlier occurrence of `ch`. So instead of just adding `total + 1` to the running total, replace whatever count previously existed for `end_with[ch]` with the new count — remove the stale contribution and add the fresh one:

```
new_count = total + 1
total = total - end_with[ch] + new_count
end_with[ch] = new_count
```

This is the same trick as deduplicating in "Ugly Number" style counting problems: instead of trying to filter duplicates after the fact, track state precisely enough that the old value simply gets overwritten by the new one, since the new count for `ch` already accounts for everything the old one represented plus more.

After processing every character, `total` holds the count of all distinct non-empty subsequences, taken modulo `10^9 + 7`.

**Time complexity:** O(n), a single pass over the string with O(1) work (26-letter alphabet) per character.

**Space complexity:** O(1) extra space beyond the input, since `end_with` holds at most 26 entries.
