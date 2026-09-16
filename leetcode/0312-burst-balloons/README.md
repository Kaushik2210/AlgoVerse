# 312. Burst Balloons

**Commonly asked at:** Google, LinkedIn

You're given `n` balloons in a row, indexed 0 to n-1, each with a number on it given by array `nums`. Bursting balloon `i` earns `nums[left] * nums[i] * nums[right]` coins, where `left` and `right` are the balloons currently adjacent to `i` (after previously burst balloons, treat out-of-bounds neighbors as a balloon with value 1). Return the maximum coins obtainable by bursting all the balloons in some order.

**Example 1:**
```
Input: nums = [3,1,5,8]
Output: 167
Explanation: Burst 1 (3*1*5=15), then 5 (3*5*8=120), then 3 (1*3*8=24), then 8 (1*8*1=8). Total: 15+120+24+8=167.
```

**Example 2:**
```
Input: nums = [1,5]
Output: 10
Explanation: Burst 1 (1*1*5=5), then 5 (1*5*1=5). Total: 5+5=10.
```

**Constraints:**
- n == nums.length
- 1 <= n <= 300
- 0 <= nums[i] <= 100

## Approach

The obvious trap is trying to decide which balloon to burst *first* — but that's a nightmare, because bursting a balloon changes who its neighbors are for every future burst, so the subproblems after a first choice aren't independent of each other in any clean way.

The reframe that unlocks this: instead of asking "which balloon bursts first in this range," ask "which balloon bursts *last* in this range." If balloon `k` is the last one standing (before it too gets burst) within some open interval `(i, j)` — meaning every other balloon strictly between `i` and `j` has already been cleared out by the time `k` goes — then at the moment `k` finally bursts, its only two remaining neighbors are exactly `nums[i]` and `nums[j]`, the fixed boundary balloons of the interval, regardless of what order everything else inside was burst in. That's what makes the multiplier `nums[i] * nums[k] * nums[j]` predictable and independent of the burst order used to clear out the rest of the interval — bursting `k` last means the interval hasn't touched its boundaries yet.

So pad `nums` with a 1 on each end (to represent the implicit boundary value when there's no real neighbor), and define `dp[i][j]` as the max coins obtainable from bursting every balloon strictly between padded indices `i` and `j` (exclusive on both ends), leaving `i` and `j` themselves untouched. For every `k` strictly between `i` and `j`, treat `k` as the last balloon burst in that interval: `dp[i][j] = max over k of dp[i][k] + dp[k][j] + nums[i]*nums[k]*nums[j]`. The two recursive terms `dp[i][k]` and `dp[k][j]` cover everything else inside the interval, already fully resolved on either side of `k`, before `k` itself is burst. Fill by increasing interval width; the answer is `dp[0][n+1]` on the padded array.

**Time complexity:** O(n^3) — O(n^2) intervals, each trying O(n) choices of last-burst balloon.

**Space complexity:** O(n^2) for the dp table.
