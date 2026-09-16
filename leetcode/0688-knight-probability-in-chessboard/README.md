# 688. Knight Probability in Chessboard

**Commonly asked at:** Google

On an `n x n` chessboard, a knight starts at `(row, column)` and makes exactly `k` moves. Every move it picks uniformly at random among its (up to 8) legal knight moves, even if that move would take it off the board — in which case it has left the board and stops moving entirely. Return the probability that the knight is still on the board after making exactly `k` moves.

**Example 1:**
```
Input: n = 3, k = 2, row = 0, column = 0
Output: 0.0625
Explanation: There are two moves from (0,0): to (1,2) and (2,1). From each of those, only one of the 8 possible next moves lands back on the board, so the total probability of staying on for both moves is (1/8)*(1/8) + (1/8)*(1/8) = 2/64 = 1/16 = 0.0625.
```

**Example 2:**
```
Input: n = 1, k = 0, row = 0, column = 0
Output: 1.0
```

**Constraints:**
- 1 <= n <= 25
- 0 <= k <= 100
- 0 <= row, column < n

## Approach

This isn't a pathfinding problem — the knight isn't trying to get anywhere, it's just wandering, and we want the total probability mass still on the board after k steps. That maps naturally onto a DP over "probability of being at each square after t moves."

Keep a 2D table `dp[r][c]` representing the probability that the knight is currently sitting at square `(r, c)`, having stayed on the board for every move so far. Initialize it with 1.0 at the starting square and 0 everywhere else.

For each of the k moves, build a fresh table. For every square that currently holds nonzero probability, split that probability evenly across its 8 candidate knight moves (each happens with probability 1/8). Whichever of those candidate moves land back inside the board add their share into the new table at the destination square — moves that go off the board simply lose that probability share, since the knight is gone if it wanders off.

After k rounds, the answer is the sum of every value left in the table — that's exactly the total probability the knight never fell off, since dp entries only track paths that stayed on the board every step.

**Time complexity:** O(k * n^2) — k rounds, each visiting all n^2 squares and trying 8 fixed moves per square.

**Space complexity:** O(n^2) for the current and next probability tables.
