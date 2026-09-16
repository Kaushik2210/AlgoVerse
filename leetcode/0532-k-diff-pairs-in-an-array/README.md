# 532. K-diff Pairs in an Array

**Commonly asked at:** Facebook

Given an array of integers `nums` and an integer `k`, return the number of unique `(i, j)` pairs where `|nums[i] - nums[j]| == k`. A pair is counted once regardless of how many times its values repeat in `nums`.

**Example 1:**
```
Input: nums = [3, 1, 4, 1, 5], k = 2
Output: 2
Explanation: (1, 3) and (3, 5) are the 2 unique pairs.
```

**Example 2:**
```
Input: nums = [1, 2, 3, 4, 5], k = 1
Output: 4
```

**Constraints:**
- 1 <= nums.length <= 10^4
- k >= 0

## Approach

Since only *unique value pairs* matter, not index pairs, the first move is to collapse `nums` down to its distinct values along with how many times each occurs — a hash map from value to frequency handles both jobs at once.

`k` splits into two cases:
- **k == 0**: a pair needs the *same* value twice, so it only counts if that value appears more than once in the array. Count how many distinct values have frequency > 1.
- **k > 0**: for each distinct value `v`, check whether `v + k` is also present in the map. If so, `(v, v+k)` is a valid unique pair — no need to also check `v - k`, since that pair gets found when `v - k` itself is the one being iterated over.

Negative `k` can never produce a valid pair (an absolute difference can't be negative), so that's an immediate 0.

Verified against `nums = [3,1,4,1,5], k = 2` -> 2, `nums = [1,2,3,4,5], k = 1` -> 4, and `nums = [1,3,1,5,4], k = 0` -> 1 (only the value 1 repeats).

**Time complexity:** O(n) — building the frequency map and scanning its keys are both linear in the number of elements.

**Space complexity:** O(n) for the frequency map.
