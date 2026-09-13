# 784. Letter Case Permutation

You're given a string `s`. For every letter in `s`, it can be transformed to either lowercase or uppercase; digits stay as they are. Return all possible strings that can be created this way, in any order.

**Example 1:**
```
Input: s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]
```

**Example 2:**
```
Input: s = "3z4"
Output: ["3z4","3Z4"]
```

**Constraints:**
- 1 <= s.length <= 12
- s consists of lowercase English letters, uppercase English letters, and digits
- s.length <= 12 (each of the possible 2^s.length combinations, up to 4096, is guaranteed to fit)

## Approach

Every letter independently doubles the number of possible outputs (lowercase or uppercase), while digits contribute no branching at all — that's a clean signal to backtrack character by character, branching only where there's an actual decision to make.

Build the result one character position at a time with a recursive helper that takes the string built so far. At position `i`:
- If `s[i]` is a digit, there's no choice — just append it as-is and recurse to position `i + 1`.
- If `s[i]` is a letter, branch into two recursive calls: one appending the lowercase version, one appending the uppercase version, both advancing to position `i + 1`.

When the position reaches the end of the string, the string built so far is one complete valid combination — add it to the results.

This visits exactly one call per output string (since every recursive step either adds one fixed character or forks into two paths), so there's no wasted work generating invalid combinations to discard.

**Time complexity:** O(2^L * L) where L is the number of letters in `s` — there are up to 2^L distinct outputs, each of length up to n, and building/copying each string costs O(n).

**Space complexity:** O(2^L * n) for storing all output strings; O(n) additional for the recursion stack.
