# 1405. Longest Happy String

A string is happy if it doesn't contain `"aaa"`, `"bbb"`, or `"ccc"` as a substring. Given three integers `a`, `b`, `c`, return the longest happy string you can build using at most `a` occurrences of `'a'`, `b` occurrences of `'b'`, and `c` occurrences of `'c'`. If there are multiple longest happy strings, return any of them; if none can be built, return the empty string.

**Example 1:**
```
Input: a = 1, b = 1, c = 7
Output: "ccaccbcc"
```

**Example 2:**
```
Input: a = 7, b = 1, c = 0
Output: "aabaa"
```

**Constraints:**
- 0 <= a, b, c <= 100
- a + b + c > 0

## Approach

The greedy idea: at every step, always try to place the character with the most remaining count, since hoarding a large budget for later only makes it harder to place near the end (a big leftover pool with nothing to interleave it with runs straight into `"xxx"`). Use a max-heap keyed by remaining count so "most plentiful character" is always O(log 3) to find (here effectively O(1) since there are only 3 possible characters).

At each step, pop the character with the highest remaining count. If placing it would create a third consecutive occurrence (the last two characters in the result are already this same character), it can't be placed right now — so it's temporarily set aside, and instead the *second*-most plentiful character is placed. If the heap is empty (no other character has any budget left), stop entirely — we've built the longest happy string possible. Otherwise, place that second character, decrement its count, and push both the just-placed character and the set-aside one back onto the heap (skipping if a count has hit zero).

If placing the most-plentiful character is safe (no "xxx" risk), just place it directly and decrement its count. Repeat until the heap is empty.

This greedy is correct because at every point we're using the character we can least afford to save for later, while the 2-in-a-row lookback check is the only constraint that ever forces a substitution — and substituting the next-best option is always safe because at most one character can be blocked at any time (the other two can't simultaneously be the last two characters placed).

**Time complexity:** O((a+b+c) log 3) = O(a+b+c) — one heap operation (constant-size heap) per character placed.

**Space complexity:** O(a+b+c) for the output string; O(1) for the heap itself.
