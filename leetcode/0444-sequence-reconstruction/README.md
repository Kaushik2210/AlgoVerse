# 444. Sequence Reconstruction

**Note:** this problem is LeetCode premium (subscriber-only) — no live link to test against, but the statement and expected behavior below are well documented.

You're given an array `nums`, which is a permutation of `1` to `n`, and a list `sequences` of smaller subsequences. Determine whether `nums` is the unique shortest common supersequence of all the arrays in `sequences` — meaning it's the only sequence of length `n` that every array in `sequences` is a subsequence of.

**Example 1:**
```
Input: nums = [1,2,3], sequences = [[1,2],[1,3]]
Output: false
Explanation: [1,2,3] and [1,3,2] are both valid common supersequences built from [1,2] and [1,3], so the reconstruction isn't unique.
```

**Example 2:**
```
Input: nums = [1,2,3], sequences = [[1,2]]
Output: false
Explanation: 3 never appears in any sequence, so there's no way to place it — [1,2,3] can't actually be reconstructed.
```

**Example 3:**
```
Input: nums = [1,2,3], sequences = [[1,2],[2,3]]
Output: true
```

**Constraints:**
- n == nums.length
- 1 <= n <= 10^4
- nums is a permutation of the integers 1 to n
- 1 <= sequences.length <= 10^4
- 1 <= sequences[i].length <= 10^4
- All the arrays of sequences are unique
- 1 <= sequences[i][j] <= n

## Approach

Each subsequence in `sequences` only tells us relative order between consecutive elements — `a` must come directly before `b` in the final ordering. That's exactly a directed edge `a -> b` in a graph over the values `1..n`. If we build that graph from every consecutive pair across every array in `sequences`, then any valid reconstruction is a topological sort of that graph, and `nums` matches the *unique* correct reconstruction only if the topological sort itself is forced at every step — never a tie between two available next values.

So: build the graph with an edge for every adjacent pair in each sequence (dedupe edges so in-degrees aren't double counted), and compute in-degree per node. Run Kahn's algorithm with a queue of zero-in-degree nodes. At each step, check that the queue holds exactly one node — if it ever holds zero or more than one, there's no unique topological order at that point, so return false immediately. Pop that one node, append it to the built order, and decrement the in-degree of its neighbors, queuing any that drop to zero.

There's one more requirement: every value from `1` to `n` must actually appear somewhere in `sequences`, otherwise there's no way to place it in any reconstruction at all — check this before doing the topological sort.

At the end, the built order has to equal `nums` exactly — matching lengths (all n nodes got processed, meaning no cycle) and matching values in order.

**Time complexity:** O(V + E), where V = n and E is the total number of consecutive pairs across all of `sequences` — each edge and node is processed a constant number of times.

**Space complexity:** O(V + E) for the graph, in-degree array, and queue.
