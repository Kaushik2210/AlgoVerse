# 5. Longest Palindromic Substring

You're given a string `s`. Find the longest substring of `s` that reads the same forwards and backwards.

**Example 1:**
```
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
```

**Example 2:**
```
Input: s = "cbbd"
Output: "bb"
```

**Constraints:**
- 1 <= s.length <= 1000
- `s` consists of digits and English letters

## Approach

The brute-force way is to check every possible substring and test whether it's a palindrome, which is O(n^3) — O(n^2) substrings, each taking O(n) to verify. That's way more work than needed.

The key insight is that every palindrome has a center, and you can grow outward from it. A palindrome of odd length has a single character as its center (like the `g` in `"racecar"`), while one of even length has two characters as its center (like the `bb` in `"abba"`). So instead of checking every substring, walk through the string and treat every position as a potential center — for each index `i`, expand outward once treating `i` as an odd-length center, and once treating `(i, i+1)` as an even-length center. Keep expanding left and right as long as the characters on both sides match, and track the widest palindrome found across all centers.

There are only `2n - 1` possible centers, and each expansion is O(n) in the worst case, so this beats brute force even though it's still technically O(n^2) — it never re-checks a substring, it just grows outward and stops the moment a mismatch appears.

**Time complexity:** O(n^2) — n centers, each expansion can walk up to n steps.

**Space complexity:** O(1) — just a few pointers, no extra data structures.
