# 14. Longest Common Prefix

Given an array of strings `strs`, find the longest string that is a prefix of every string in the array. If there is no common prefix, return an empty string `""`.

**Example 1:**
```
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

**Example 2:**
```
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

**Constraints:**
- 1 <= strs.length <= 200
- 0 <= strs[i].length <= 200

## Approach

The simplest way to think about this: the common prefix of the whole array can never be longer than the shortest string in it, and character by character, it can only extend as far as every single string agrees.

Start by assuming the first string is the answer, then narrow it down against every other string in turn. For each subsequent string, shrink the candidate prefix (by chopping characters off the end) until it actually is a prefix of that string — either by comparing character by character and stopping at the first mismatch, or by repeatedly checking `string.startswith(candidate)` and trimming the last character each time it fails. Once the candidate becomes empty, you can stop early since no shorter prefix is possible ("" is already the answer for a mismatch that early).

An equivalent way to picture it: line the strings up vertically and scan down column by column across all of them simultaneously; stop at the first column where not every string has the same character, or where a string runs out of characters.

**Time complexity:** O(S) where S is the sum of all characters across all strings — in the worst case every character gets compared once.

**Space complexity:** O(1) extra, not counting the output string.
