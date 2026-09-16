# 1590. Number of Ways to Split a String

**Commonly asked at:** Microsoft

Given a binary string `s`, count the number of ways to split it into three non-empty contiguous parts `s1 + s2 + s3 = s` such that all three parts contain the same number of `'1'` characters. Return the count modulo `10^9 + 7`.

**Example 1:**
```
Input: s = "10101"
Output: 4
Explanation: There are four ways to split s: "1|010|1", "1|01|01", "10|10|1", "10|1|01".
```

**Example 2:**
```
Input: s = "0000"
Output: 3
Explanation: There are no 1's to balance, so any 2 of the 3 gaps between the 4 characters can be the cut points: "0|0|00", "0|00|0", "00|0|0".
```

**Constraints:**
- 3 <= s.length <= 10^5
- s[i] is '0' or '1'

## Approach

First count the total number of `1`s in `s`. For a valid three-way split to exist at all, this total must be divisible by 3 — otherwise it's impossible to distribute the ones evenly, so return 0 immediately.

**Special case: zero ones.** If there are no `1`s anywhere, every split is automatically balanced (0 = 0 = 0), so the answer is just "how many ways to choose 2 distinct cut points among the `n - 1` gaps between characters" — that's `C(n-1, 2) = (n-1)(n-2)/2`.

**General case:** each of the three parts must contain exactly `total/3` ones. Locate the positions of every `1` in the string. The first cut has to land strictly after the `total/3`-th one and strictly before the `(total/3 + 1)`-th one — landing anywhere in that gap keeps exactly `total/3` ones in the first part without spilling into the next one. So the number of valid positions for the first cut is simply the gap between those two ones' indices: `ones_idx[each] - ones_idx[each - 1]` (using 0-indexed positions in the list of one-locations). The second cut works the same way, between the `2*total/3`-th and `(2*total/3 + 1)`-th ones.

Since the choice of first cut and second cut are independent of each other (any valid first cut combined with any valid second cut produces a valid overall split, as long as second cut is strictly after first, which is automatically guaranteed since the "one" ranges don't overlap), the total count is just the product of the two gap sizes.

**Time complexity:** O(n) — one pass to count ones and collect their positions.

**Space complexity:** O(k) where k is the number of ones in s (O(n) worst case), for storing their positions — this can be reduced to O(1) by tracking only the needed boundary indices during a single pass instead of storing the full list.
