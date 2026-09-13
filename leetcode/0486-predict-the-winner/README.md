# 486. Predict the Winner

Two players take turns picking a number from either end of an array `nums`, adding it to their own score, starting with player 1. Both play optimally to maximize their own score. Return `true` if player 1 can end with a score greater than or equal to player 2's score, `false` otherwise.

**Example 1:**
```
Input: nums = [1,5,2]
Output: false
Explanation: Player 1 can score at most 1+2=3 or start with 2 and score at most 2+1=3, while player 2 can always secure 5. Player 1 can't reach or beat player 2's score.
```

**Example 2:**
```
Input: nums = [1,5,233,7]
Output: true
Explanation: Player 1 starts with 1, and no matter what player 2 does, player 1 can secure a total of 234, beating player 2's 12.
```

**Constraints:**
- 1 <= nums.length <= 20
- 0 <= nums[i] <= 10^7

## Approach

This is the exact same shape of problem as Stone Game (#877), just without the guarantee that the array length is even or that the answer is always `true` — so the same score-differential interval DP applies directly, without any shortcut. Define `dp[i][j]` as the best (current mover's score - other player's score) achievable on the subarray `nums[i..j]` when it's that player's turn to choose from either end.

At each state, the current player takes `nums[i]` or `nums[j]`, gaining that value, and then the opponent plays optimally on what's left — whatever differential the opponent achieves works against the current player, so it's subtracted: `dp[i][j] = max(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1])`. Base case `dp[i][i] = nums[i]` for a single remaining number. Filling by increasing interval length gives `dp[0][n-1]`, the differential (player 1's score minus player 2's score) achieved by player 1 moving first on the full array with both players playing optimally.

The answer is `dp[0][n-1] >= 0` — note the `>=` rather than strictly `>`, since the problem only asks whether player 1 can tie or win, not strictly beat player 2.

**Time complexity:** O(n^2) — the dp table has O(n^2) cells, each filled in O(1).

**Space complexity:** O(n^2) for the dp table (reducible to O(n) with rolling arrays).
