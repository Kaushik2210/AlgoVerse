# 410. Split Array Largest Sum

Given an integer array `nums` and an integer `m`, split `nums` into `m` non-empty contiguous subarrays. The "cost" of a split is the largest sum among its `m` subarrays. Minimize that cost and return it.

**Example 1:**
```
Input: nums = [7,2,5,10,8], m = 2
Output: 18
Explanation: The best split is [7,2,5] and [10,8], with sums 14 and 18. The largest is 18, and no split does better.
```

**Example 2:**
```
Input: nums = [1,2,3,4,5], m = 2
Output: 9
```

**Constraints:**
- 1 <= nums.length <= 1000
- 0 <= nums[i] <= 10^6
- 1 <= m <= min(50, nums.length)

## Approach

This looks like a partition DP problem, and it can be solved that way (`dp[i][k]` = min possible largest-subarray-sum using the first `i` elements split into `k` parts), but there's a much lighter way in: binary search on the answer itself.

Think about what we're really asking: "what's the smallest possible value of the largest subarray sum?" Call any candidate value `cap` a valid capacity if we can greedily chop `nums` into contiguous pieces, each summing to at most `cap`, using at most `m` pieces. This feasibility check is easy and greedy: walk through `nums`, keep adding to the current subarray, and whenever adding the next element would exceed `cap`, start a new subarray there instead. Count how many subarrays that takes; if it's <= `m`, `cap` is feasible.

The key insight is that feasibility is monotonic in `cap`: if some capacity `cap` is feasible (achievable with <= `m` pieces), then any larger capacity is also feasible (you can only need equal or fewer pieces as the cap grows), and if `cap` is infeasible, every smaller capacity is also infeasible. That monotonic structure is exactly what binary search needs — so instead of enumerating splits, binary search directly over possible answer values.

The search range is bounded naturally: the capacity can never be smaller than `max(nums)` (a single huge element must fit in some subarray by itself) and never needs to be larger than `sum(nums)` (the trivial one-subarray split). Binary search that range: for each `mid`, run the greedy feasibility check; if feasible, the true answer might be `mid` or smaller, so shrink `hi = mid`; if not feasible, `mid` is too tight, so `lo = mid + 1`. This converges to the smallest feasible capacity.

**Time complexity:** O(n log(sum(nums) - max(nums))) — each binary search step does an O(n) feasibility scan, and the range roughly halves each time.

**Space complexity:** O(1) extra space.
