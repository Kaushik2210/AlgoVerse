# 740. Delete and Earn

**Commonly asked at:** Amazon

You're given an array of integers `nums`. In one operation, pick any `nums[i]`, delete it, and earn `nums[i]` points — but doing so also forces you to delete every element in the array equal to `nums[i] - 1` and every element equal to `nums[i] + 1` (they're removed without earning points). Repeat until the array is empty. Return the maximum number of points you can earn.

**Example 1:**
```
Input: nums = [3,4,2]
Output: 6
Explanation: Delete 4 (earn 4), which also deletes the 3. Then delete 2 (earn 2). Total: 6.
```

**Example 2:**
```
Input: nums = [2,2,3,3,3,4]
Output: 9
Explanation: Delete a 3 (earn 3, this also deletes all 2s and all 4s). Delete another 3 (earn 3, nothing left to delete alongside it). Delete the last 3 (earn 3). Total: 9.
```

**Constraints:**
- 1 <= nums.length <= 2 * 10^4
- 1 <= nums[i] <= 10^4

## Approach

The value-adjacency rule (taking a number forces you to give up its immediate neighbors *by value*, not by index) is the same shape as House Robber's "can't take two adjacent houses" — it just needs a translation step first. Bucket the input by value: sum up all the points available at each distinct value (an entry of value `v` appearing `k` times is worth `k * v` if you choose to take it at all, since taking any one copy forces the same neighbor-deletion regardless, so you might as well take every copy). That produces an array `points[v]` indexed by value from 1 up to the max value in `nums`, where taking `points[v]` forbids also taking `points[v-1]` or `points[v+1]` — exactly House Robber on that array.

So run House Robber's classic DP over `points`: track `take` (best total including this value) and `skip` (best total excluding it) as you scan values from smallest to largest, where `take = skip_prev + points[v]` and `skip = max(skip_prev, take_prev)`. The final answer is `max(take, skip)` after the last value.

**Time complexity:** O(n + m) where n is the length of `nums` and m is the range of values, since bucketing is linear in n and the House-Robber-style scan is linear in m.

**Space complexity:** O(m) for the bucketed points array (reducible to O(1) extra beyond it since the DP only needs the previous two states).
