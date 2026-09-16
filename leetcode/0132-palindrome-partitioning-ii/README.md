# 132. Palindrome Partitioning II

**Commonly asked at:** Amazon, Google

You're given a string `s`. Partition it so every substring in the partition is a palindrome, using the minimum number of cuts. Return that minimum number of cuts.

**Example 1:**
```
Input: s = "aab"
Output: 1
Explanation: One cut gives the partition ["aa","b"], both of which are palindromes.
```

**Example 2:**
```
Input: s = "a"
Output: 0
Explanation: The string is already a palindrome, no cuts needed.
```

**Example 3:**
```
Input: s = "ab"
Output: 1
```

**Constraints:**
- 1 <= s.length <= 2000
- s consists only of lowercase English letters

## Approach

This looks similar to Palindrome Partitioning I, which enumerates *every* valid partition with backtracking — but that problem only needs to list partitions, while this one needs the *minimum cut count*, and generating every possible partition just to find the shortest one would be exponential and wasteful. Minimum-cost-to-partition is a classic dynamic programming shape, not a backtracking one.

First, precompute an `is_palindrome[i][j]` table telling whether the substring `s[i..j]` (inclusive) is a palindrome, for every pair of indices. This can be built bottom-up in O(n^2): a substring `s[i..j]` is a palindrome exactly when `s[i] == s[j]` and the substring inside it, `s[i+1..j-1]`, is also a palindrome (with length-0 or length-1 inner substrings trivially true). Filling this table by increasing substring length ensures the shorter, inner substrings are already known when a longer one is being checked.

Then define `dp[i]` as the minimum number of cuts needed to partition the prefix `s[0..i]` (inclusive) into palindromes. For each `i`, if the *entire* prefix `s[0..i]` is already a palindrome, `dp[i] = 0` — no cut needed at all. Otherwise, try every possible position `j` for the last cut, where `s[j+1..i]` is a palindrome (checked via the precomputed table in O(1)): that means the prefix up to `i` can be built by taking the best partition of `s[0..j]` and adding one more cut, so `dp[i] = min(dp[i], dp[j] + 1)` over all valid `j`. The final answer is `dp[n-1]`, the minimum cuts for the whole string.

**Time complexity:** O(n^2) — building the palindrome table is O(n^2), and computing `dp[i]` for each `i` scans up to `i` earlier positions, giving O(n^2) total for the DP.

**Space complexity:** O(n^2) for the palindrome table (can be reduced, but the straightforward version keeps it), plus O(n) for the `dp` array.
