# 1244. Design A Leaderboard

Design a leaderboard for a game that supports:

- `Leaderboard()` — initializes an empty leaderboard.
- `void addScore(int playerId, int score)` — adds `score` to the given player's current score. If the player doesn't have a score yet, start them at 0 first.
- `int top(int K)` — returns the sum of the top `K` scores currently in the leaderboard.
- `void reset(int playerId)` — resets the given player's score to the empty state, as if they never scored anything. It's guaranteed the player exists before this method is called.

**Example:**
```
Input:
["Leaderboard", "addScore", "addScore", "addScore", "addScore", "addScore", "top", "top", "reset", "addScore", "top"]
[[], [1, 73], [2, 56], [3, 39], [4, 51], [5, 4], [1], [3], [1], [2, 51], [1]]

Output:
[null, null, null, null, null, null, 73, 180, null, null, 107]

Explanation:
Leaderboard lb = new Leaderboard();
lb.addScore(1, 73);   // scores: {1: 73}
lb.addScore(2, 56);   // scores: {1: 73, 2: 56}
lb.addScore(3, 39);   // scores: {1: 73, 2: 56, 3: 39}
lb.addScore(4, 51);   // scores: {1: 73, 2: 56, 3: 39, 4: 51}
lb.addScore(5, 4);    // scores: {1: 73, 2: 56, 3: 39, 4: 51, 5: 4}
lb.top(1);            // 73, the single highest score
lb.top(3);            // 73 + 56 + 51 = 180, the three highest scores
lb.reset(1);          // scores: {2: 56, 3: 39, 4: 51, 5: 4}
lb.addScore(2, 51);   // scores: {2: 107, 3: 39, 4: 51, 5: 4}
lb.top(1);            // 107, player 2's new total
```

**Constraints:**
- 1 <= playerId, K <= 10^4
- It's guaranteed that K is less than or equal to the current number of players.
- 1 <= score <= 100
- There will be at most 1000 function calls
- `reset` will only be called on a `playerId` that is currently in the leaderboard

## Approach

The simplest correct approach: keep a hashmap of `playerId -> total score` for O(1) `addScore` and O(1) `reset`. The only question is how to answer `top(K)` efficiently, since scores keep changing between calls and there's no cheap way to keep them fully sorted after every single update without paying for it somewhere.

Given the constraints here are tiny (at most 1000 calls total, so at most ~1000 players), the cleanest approach is to **not try to maintain a sorted structure incrementally at all** and instead compute `top(K)` on demand: use a min-heap of size K, streaming through all current scores and keeping only the K largest seen so far (classic "top K" pattern — push each value, and if the heap grows past K, pop the smallest). Whatever remains in the heap after processing every player are exactly the K largest scores; sum them.

This keeps `addScore` and `reset` at true O(1) (just a hashmap write/delete), and pushes all the cost into `top(K)`, which only runs when actually queried. For larger constraints where `top` is called far more often than players change, a self-balancing BST or an ordered multiset keyed by score would let `top(K)` be answered faster by walking the highest K entries directly — but for this problem's scale, streaming through a min-heap of size K per query is simple, correct, and fast enough.

**Time complexity:** O(1) for `addScore` and `reset`. O(n log K) for `top(K)`, where n is the number of players — each of n scores does one heap push, with an occasional pop, and the heap never holds more than K elements.

**Space complexity:** O(n) for the scores hashmap, plus O(K) for the temporary heap used inside `top`.
