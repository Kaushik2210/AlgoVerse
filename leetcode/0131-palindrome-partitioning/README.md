# 131. Palindrome Partitioning

Given a string `s`, partition it so that every substring in the partition is a palindrome. Return all possible partitions.

**Example 1:**
```
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
```

**Example 2:**
```
Input: s = "a"
Output: [["a"]]
```

**Constraints:**
- 1 <= s.length <= 16
- s consists of lowercase English letters only

## Approach

This is a "generate all ways to do something" problem, which is a strong signal to reach for backtracking. Think of it as deciding, one cut at a time, how far the *next* piece of the partition should extend: standing at some starting index, try every possible end point for the next piece, and for each one that happens to be a palindrome, take it, recurse on the rest of the string starting right after it, and then undo the choice before trying the next end point.

Concretely: maintain a running list `path` of pieces chosen so far. A recursive function `backtrack(start)` means "partition `s[start:]`" — if `start` has reached the end of the string, `path` is a complete valid partition, so record a copy of it. Otherwise, try every `end` from `start + 1` up to the length of the string, check whether `s[start:end]` is a palindrome, and if so append it to `path`, recurse with `backtrack(end)`, then pop it off `path` to backtrack and try the next `end`. Substrings that aren't palindromes are simply skipped — that's what prunes the search so it doesn't explore garbage partitions.

Checking a substring for being a palindrome is the usual two-pointer or slice-reversal comparison; there's no need for fancier substring-palindrome dp here given the tiny constraint (length <= 16), though it's a common enough optimization to precompute a table of `isPalindrome[i][j]` when the input is larger.

**Time complexity:** O(n * 2^n) in the worst case — there are up to 2^(n-1) ways to partition a string of length n (each gap between characters is either a cut or not), and each valid partition found takes O(n) to copy into the result, plus the palindrome checks along the way.

**Space complexity:** O(n) for the recursion stack and the `path` list, not counting the output.
