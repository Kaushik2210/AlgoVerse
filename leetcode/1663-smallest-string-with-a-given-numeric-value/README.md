# 1663. Smallest String With A Given Numeric Value

The numeric value of a lowercase letter is its position in the alphabet ('a' = 1, ..., 'z' = 26), and the numeric value of a string is the sum of its letters' values. Given two integers `n` and `k`, return the lexicographically smallest string of length `n` whose numeric value is exactly `k`. It's guaranteed a valid answer exists.

**Example 1:**
```
Input: n = 3, k = 27
Output: "aay"
Explanation: value = 1 + 1 + 25 = 27. "aay" is the smallest such string.
```

**Example 2:**
```
Input: n = 5, k = 73
Output: "aaszz"
```

**Constraints:**
- 1 <= n <= 10^5
- n <= k <= 26 * n

## Approach

To make a string lexicographically smallest, earlier characters should be as small as possible, with any "extra" weight pushed as far toward the end as it can go. Since every character must contribute at least 1 (an 'a'), start with a baseline of `n` (all 'a's, contributing `n` total) and figure out how much extra value — `remaining = k - n` — still needs to be distributed.

Walk from the *last* character back to the first. At each position, greedily dump as much of the remaining extra as that single character can hold: up to 25 extra (since a character caps out at 'z', value 26, which is 'a' + 25 extra). Set that character to `'a' + min(25, remaining)`, subtract what was used from `remaining`, and continue leftward. Once `remaining` hits 0, every character further left stays 'a', which is exactly what's wanted since leaving early positions as small as possible is what makes the whole string lexicographically minimal.

This greedy works because pushing weight to the rightmost possible positions first never costs anything — a character further right being larger doesn't affect the string's lexicographic order nearly as much as a character further left being larger, so any surplus should always be absorbed by the rightmost positions before it ever touches an earlier one.

**Time complexity:** O(n) — one pass building the result, with each character assignment O(1).

**Space complexity:** O(n) for the output string (excluding the space needed to hold the answer itself, this is O(1) extra).
