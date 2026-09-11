# 300. Longest Increasing Subsequence

You're given an integer array `nums`. Find the length of the longest strictly increasing subsequence — a subsequence keeps the relative order of the original array but doesn't need to be contiguous.

**Example 1:**
```
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: the longest increasing subsequence is [2,3,7,101] (or [2,3,7,18]), length 4
```

**Example 2:**
```
Input: nums = [0,1,0,3,2,3]
Output: 4
Explanation: [0,1,2,3] has length 4
```

**Example 3:**
```
Input: nums = [7,7,7,7,7,7,7]
Output: 1
Explanation: strictly increasing means repeats don't extend the subsequence
```

**Constraints:**
- 1 <= nums.length <= 2500
- -10^4 <= nums[i] <= 10^4

## Approach

The straightforward dp is: for each index `i`, let `dp[i]` be the length of the longest increasing subsequence ending exactly at `i`. For every `j < i` where `nums[j] < nums[i]`, `dp[i]` can be `dp[j] + 1`; take the best such option (or 1, just the element by itself, if nothing qualifies). The answer is the max over all `dp[i]`. That's correct but O(n^2), checking every pair.

There's a faster way based on a greedy/binary-search trick (patience sorting). Maintain an array `tails`, where `tails[k]` holds the *smallest possible tail value* among all increasing subsequences of length `k + 1` found so far. This array is always sorted, which is the key that makes it useful: for each new number `n` in `nums`, binary search `tails` for the leftmost position where `n` could sit (the first tail that is `>= n`).

- If `n` is bigger than every tail, it extends the longest subsequence found so far — append it, growing `tails` by one.
- Otherwise, `n` can replace the tail at that position, because ending an increasing subsequence of that same length on a smaller value only gives future numbers a better (easier) chance to extend it. This never shrinks the actual longest-subsequence length, it just keeps the bookkeeping array as "tight" as possible.

The final length of `tails` is the answer. It's worth noting `tails` itself isn't necessarily a real subsequence from the array — it's just tracking the best possible tail value for each achievable length — but its length is provably always equal to the true LIS length.

**Time complexity:** O(n log n) — one binary search per element.

**Space complexity:** O(n) — the tails array, worst case as long as the input.
