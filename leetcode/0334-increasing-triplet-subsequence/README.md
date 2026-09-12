# 334. Increasing Triplet Subsequence

Given an integer array `nums`, return `true` if there exists a triple of indices `i < j < k` such that `nums[i] < nums[j] < nums[k]`. Otherwise return `false`. You need to do this in O(n) time and O(1) space.

**Example 1:**
```
Input: nums = [1,2,3,4,5]
Output: true
```

**Example 2:**
```
Input: nums = [5,4,3,2,1]
Output: false
```

**Example 3:**
```
Input: nums = [2,1,5,0,4,6]
Output: true
Explanation: the triplet (1,4,6) at indices (1,3,5) works: 1 < 4 < 6
```

**Constraints:**
- 1 <= nums.length <= 5*10^5
- -2^31 <= nums[i] <= 2^31 - 1

## Approach

The naive approach checks every triple, which is O(n^3), or with some precomputed "smallest to the left" / "largest to the right" arrays gets down to O(n) time but O(n) space. The O(1) space trick is to only track the two candidate values that matter: the smallest "first element of a potential triplet" seen so far, and the smallest "second element of a potential triplet" seen so far (where a valid second element must be greater than some valid first element).

Keep two running values, `first` and `second`, both initialized to infinity. Scan left to right:
- If the current number is less than or equal to `first`, it's a new best (smallest) candidate for the first element of a triplet — update `first`.
- Otherwise, if the current number is less than or equal to `second`, it becomes the best candidate second element (it's bigger than some earlier `first`, but as small as possible for future comparisons) — update `second`.
- Otherwise — the current number is strictly greater than both `first` and `second` — that means there really was some earlier index with a smaller value that itself came after an even earlier, smaller value. Return true immediately.

The subtlety that makes this correct (not just "looks like it works"): even though updating `first` might overwrite it with a later, unrelated value, `second` — once set — is guaranteed to have been assigned only after some valid smaller `first` existed at that point in the scan. So finding any number bigger than the current `second` guarantees a real, three-index increasing subsequence exists, even though we don't bother tracking which exact index `first` came from.

**Time complexity:** O(n) — one linear pass.

**Space complexity:** O(1) — two variables regardless of input size.
