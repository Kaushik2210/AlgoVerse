# 383. Ransom Note

You're given two strings `ransomNote` and `magazine`. Return `true` if `ransomNote` can be built using the letters from `magazine`, where each letter in `magazine` can only be used once.

**Example 1:**
```
Input: ransomNote = "a", magazine = "b"
Output: false
```

**Example 2:**
```
Input: ransomNote = "aa", magazine = "ab"
Output: false
```

**Example 3:**
```
Input: ransomNote = "aa", magazine = "aab"
Output: true
```

**Constraints:**
- 1 <= ransomNote.length, magazine.length <= 10^5
- `ransomNote` and `magazine` consist of lowercase English letters

## Approach

The brute-force way is, for each letter needed in `ransomNote`, to scan through `magazine` looking for an unused copy of it — but that's wasteful when you can just count letters up front.

Count how many of each letter appear in `magazine` into a frequency table (26 lowercase letters fits nicely into a fixed-size array). Then walk through `ransomNote` and, for each letter, decrement its count in the table. If a letter's count ever drops below zero, `magazine` didn't have enough copies of it, so the answer is `false`. If you make it through the whole note without going negative anywhere, it's `true`.

**Time complexity:** O(m + r) where m and r are the lengths of `magazine` and `ransomNote` — one pass to build the counts, one pass to consume them.

**Space complexity:** O(1) — the frequency table has a fixed size of 26.
