# 1291. Sequential Digits

An integer has sequential digits if each digit is exactly one more than the previous digit (e.g. 123, 234, 3456). Given two positive integers `low` and `high`, return a sorted list of all integers in the range `[low, high]` that have sequential digits.

**Example 1:**
```
Input: low = 100, high = 300
Output: [123,234]
```

**Example 2:**
```
Input: low = 1000, high = 13000
Output: [1234,2345,3456,4567,5678,6789,12345]
```

**Constraints:**
- 10 <= low <= high <= 10^9

## Approach

Checking every number between `low` and `high` for the sequential-digit property would be way too slow for a range that can span up to 10^9. But there are actually very few sequential-digit numbers overall — since digits only go up to 9, a sequential number of length `k` can only start on digits 1 through `9 - k + 1`, so there are at most `10 - k` of them for each length, and lengths only range from 1 to 9. That's under 45 numbers total across all of int range — small enough to just generate them directly instead of searching.

Take the fixed string `"123456789"`. For every possible length `k` from 1 to 9, every sequential-digit number of that length is just a contiguous `k`-character substring of that string (e.g. length 3 gives "123", "234", ..., "789" by sliding a window of size 3). Generate each substring, convert it to an integer, and keep it if it falls within `[low, high]`. Restricting the length range to only what's needed (from the digit-count of `low` to the digit-count of `high`) keeps the generation tight, and because both the length loop and the starting-digit loop run in increasing order, the results come out already sorted — no separate sort needed.

**Time complexity:** O(1) — at most a small constant number of candidates (well under 50) are ever generated and checked, independent of how large `low`/`high` are.

**Space complexity:** O(1) beyond the output list itself.
