# 673. Number of Longest Increasing Subsequence

Given an integer array `nums`, return the number of distinct longest strictly increasing subsequences.

**Example 1:**
```
Input: nums = [1,3,5,4,7]
Output: 2
Explanation: The two longest increasing subsequences are [1,3,4,7] and [1,3,5,7], both length 4.
```

**Example 2:**
```
Input: nums = [2,2,2,2,2]
Output: 5
Explanation: The longest increasing subsequence has length 1, and there are 5 ways to pick one element.
```

**Constraints:**
- 1 <= nums.length <= 2000
- -10^6 <= nums[i] <= 10^6

## Approach

This builds directly on the classic O(n^2) longest increasing subsequence DP, just tracking one more piece of information per element.

For each index `i`, keep two arrays:
- `length[i]`: the length of the longest increasing subsequence that *ends* at index `i`.
- `count[i]`: how many distinct longest-increasing-subsequences-ending-at-`i` achieve that length.

Both start at `length[i] = 1` and `count[i] = 1` (the subsequence containing just `nums[i]` by itself).

For each `i`, look back at every earlier index `j < i` with `nums[j] < nums[i]` — `i` can extend any increasing subsequence ending at `j`:
- If `length[j] + 1 > length[i]`, this `j` gives a strictly longer subsequence than anything found so far for `i`. Reset: `length[i] = length[j] + 1` and `count[i] = count[j]` (start counting fresh from however many ways reached `j`).
- If `length[j] + 1 == length[i]`, this `j` gives an equally-long way to reach length `length[i]`, so add its count: `count[i] += count[j]`.
- If `length[j] + 1 < length[i]`, this `j` doesn't help extend the best subsequence ending at `i`, ignore it.

After filling both arrays, find `maxLen = max(length)`, then sum `count[i]` for every `i` where `length[i] == maxLen` — those are all the ways to build a subsequence of the overall maximum length.

**Time complexity:** O(n^2) — for each index, scan all earlier indices.

**Space complexity:** O(n) for the two auxiliary arrays.
