# 72. Edit Distance

Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` into `word2`. The allowed operations, each counting as one step, are: insert a character, delete a character, or replace a character.

**Example 1:**
```
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: horse -> rorse (replace 'h' with 'r')
             rorse -> rose (remove 'r')
             rose -> ros (remove 'e')
```

**Example 2:**
```
Input: word1 = "intention", word2 = "execution"
Output: 5
```

**Constraints:**
- 0 <= word1.length, word2.length <= 500
- word1 and word2 consist of lowercase English letters

## Approach

This is the classic Levenshtein distance problem. Define `dp[i][j]` as the minimum number of operations to convert the first `i` characters of `word1` into the first `j` characters of `word2`.

**Base cases:** converting an empty prefix of `word1` into a `j`-length prefix of `word2` takes `j` insertions, so `dp[0][j] = j`. Symmetrically, `dp[i][0] = i` (delete all `i` characters).

**Transition:** for `dp[i][j]` with `i, j >= 1`, look at the last characters `word1[i-1]` and `word2[j-1]`:
- If they match, no operation is needed for this pair — `dp[i][j] = dp[i-1][j-1]`.
- If they don't match, take the best of three choices, each costing 1 plus the result of a smaller subproblem:
  - **Replace** `word1[i-1]` with `word2[j-1]`: `1 + dp[i-1][j-1]`
  - **Delete** `word1[i-1]`: `1 + dp[i-1][j]`
  - **Insert** `word2[j-1]` into `word1`: `1 + dp[i][j-1]`
  - `dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])`

The answer is `dp[len(word1)][len(word2)]`.

Since each row only depends on the row above and the current row so far, this can be rolled down to O(min(m, n)) space with a 1D array, but the straightforward 2D table is clear and well within the 500x500 constraint.

**Time complexity:** O(m * n) where m, n are the lengths of `word1` and `word2` — one entry computed per cell.

**Space complexity:** O(m * n) for the table (O(min(m, n)) if rolled down to one row).
