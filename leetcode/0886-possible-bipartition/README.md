# 886. Possible Bipartition

There are `n` people labeled `1` to `n`. You're given `dislikes`, a list of pairs `[ai, bi]` meaning person `ai` and person `bi` dislike each other. Split everyone into two groups such that no two people who dislike each other end up in the same group. Return `true` if it's possible.

**Example 1:**
```
Input: n = 4, dislikes = [[1,2],[1,3],[2,4]]
Output: true
Explanation: group1 = [1,4], group2 = [2,3]
```

**Example 2:**
```
Input: n = 3, dislikes = [[1,2],[1,3],[2,3]]
Output: false
Explanation: 1, 2, and 3 all mutually dislike each other, no split of 2 groups can separate all three pairs.
```

**Constraints:**
- 1 <= n <= 2000
- 0 <= dislikes.length <= 10^4
- dislikes[i].length == 2
- 1 <= ai < bi <= n
- All the pairs of dislikes are unique

## Approach

This is the exact same shape of problem as checking whether a graph is bipartite — treat each "dislike" pair as an edge in an undirected graph, and the question "can everyone be split into two groups where disliking pairs always land in different groups" is identical to "can this graph be properly 2-colored."

Build an adjacency list from the dislike pairs. Then, for every person who hasn't been assigned a group yet, start a BFS/DFS and assign them group 0 (or 1). For each neighbor (someone they dislike): if that neighbor is unassigned, give them the opposite group and continue the search from there; if the neighbor already has a group and it's the *same* as the current person's, that's two people who dislike each other stuck in the same group — an immediate contradiction, so return `false`.

Like the general bipartite-check problem, the dislike graph doesn't have to be connected — some people may have no listed dislikes at all, or the people form several separate friend clusters — so the outer loop needs to try starting fresh from every unassigned person, not just person 1.

**Time complexity:** O(n + d) where d is the number of dislike pairs — building the adjacency list and running the traversal each touch every node and edge once.

**Space complexity:** O(n + d) for the adjacency list plus O(n) for the group array and queue/stack.
