# 1319. Number of Operations to Make Network Connected

There are `n` computers labeled 0 to `n-1`, connected by ethernet cables given as `connections`, where `connections[i] = [a, b]` is a cable directly connecting computers `a` and `b`. Any computer can reach any other through a chain of cables. You can remove a cable between any two directly connected computers and use it to connect any two computers that currently aren't connected. Return the minimum number of such operations needed to make the whole network connected (every computer reachable from every other), or -1 if it's impossible.

**Example 1:**
```
Input: n = 4, connections = [[0,1],[0,2],[1,2]]
Output: 1
Explanation: Remove the redundant cable between 1 and 2, use it to connect computer 3.
```

**Example 2:**
```
Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
Output: -1
Explanation: Only 4 cables for 6 computers — at least n - 1 = 5 are required just to have a chance, so it's impossible.
```

**Constraints:**
- 1 <= n <= 10^5
- 1 <= connections.length <= min(n * (n - 1) / 2, 10^5)
- connections[i].length == 2
- 0 <= a_i, b_i < n
- a_i != b_i
- No repeated connections

## Approach

Two things determine the answer: whether there are even enough cables to do the job, and how many separate connected components the computers currently form.

**Enough cables check:** connecting `n` computers into a single tree requires at least `n - 1` cables. If `connections.length < n - 1`, it's impossible no matter how cables are rearranged, so return -1 immediately.

**Counting components:** use union-find over the `n` computers, unioning every pair in `connections`. Every "redundant" cable — one that connects two computers already in the same component (a cycle edge) — becomes a free cable available to relocate. After processing all connections, count the number of distinct roots, i.e. the number of separate connected components, `k`. To merge `k` components into 1, exactly `k - 1` cables need to be moved (each operation reduces the component count by exactly 1, connecting two previously separate components). Since we already know there are at least `n - 1` cables total and at most `n - k` of them are needed just to keep the current components internally connected (a tree on the current edges would need only `n - k`), the excess is guaranteed to be enough to supply the `k - 1` relocations needed.

Return `k - 1`.

**Time complexity:** O(n + e * alpha(n)) where e is the number of connections — near-linear thanks to union-find.

**Space complexity:** O(n) for the union-find parent array.
