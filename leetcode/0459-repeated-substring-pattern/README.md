# 459. Repeated Substring Pattern

You're given a string `s`. Return `true` if it can be built by taking some substring of it and repeating that substring two or more times, one after another.

**Example 1:**
```
Input: s = "abab"
Output: true
Explanation: "ab" repeated twice.
```

**Example 2:**
```
Input: s = "aba"
Output: false
```

**Example 3:**
```
Input: s = "abcabcabcabc"
Output: true
Explanation: "abc" repeated four times (or "abcabc" repeated twice).
```

**Constraints:**
- 1 <= s.length <= 10^4
- `s` consists of lowercase English letters

## Approach

The brute-force way is to try every possible length `L` that evenly divides `len(s)`, take the first `L` characters as a candidate unit, and check whether repeating that unit `len(s) / L` times reproduces `s`. That works, but there's a much slicker trick that avoids reasoning about divisors at all.

Glue `s` to itself: `s + s`. Then strip off the very first and very last character of that doubled string. If `s` is genuinely built from some repeating unit, the copy of `s` sitting in the middle of `s + s` survives having its outer edges shaved off — because a repeating pattern still lines up with itself one period to the left or right. So the whole question becomes: does `s` show up as a substring of `(s + s)` with the first and last characters removed? If it does not, `s` has no repeating structure at all.

**Time complexity:** O(n^2) worst case for the substring search (or O(n) with a linear-time string matching algorithm), where n is the length of `s`.

**Space complexity:** O(n) for the doubled, trimmed string.
