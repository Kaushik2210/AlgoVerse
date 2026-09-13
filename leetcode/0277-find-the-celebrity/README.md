# 277. Find the Celebrity

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

Suppose you're at a party with `n` people, labeled 0 to `n-1`. There might be a celebrity among them, defined by two properties: the celebrity is known by everyone else, and the celebrity knows nobody else. You're given a helper API `knows(a, b)` that returns whether `a` knows `b`. Find the celebrity's label using the fewest possible calls to `knows`, or return -1 if there's no celebrity.

**Example 1:**
```
Input: graph (as an adjacency matrix, graph[i][j] = 1 means i knows j) = [[1,1,0],[0,1,0],[1,1,1]]
Output: 1
Explanation: Person 1 is known by 0 and 2 (and trivially "knows" themselves, which doesn't count), and person 1 knows nobody else.
```

**Example 2:**
```
Input: graph = [[1,0,1],[1,1,0],[0,1,1]]
Output: -1
Explanation: No celebrity exists.
```

**Constraints:**
- 2 <= n <= 100
- 0 <= graph[i][j] <= 1
- graph[i][i] == 1

## Approach

The brute force checking every pair would take O(n^2) calls to `knows`. The key insight for doing it in O(n) is that for any two people `a` and `b`, at most one of them can be the celebrity — if `a` knows `b`, then `a` isn't the celebrity (celebrities know nobody), and if `a` doesn't know `b`, then `b` isn't the celebrity (celebrities are known by everybody). Either way, one call to `knows(a, b)` eliminates exactly one candidate.

So do it in two passes:
1. **Elimination pass:** start with candidate = 0. For each other person `i` from 1 to `n-1`, call `knows(candidate, i)`. If true, `candidate` knows someone, so it can't be the celebrity — update `candidate = i`. If false, `i` isn't known by everyone (specifically not by `candidate`), so `i` can't be the celebrity — `candidate` stays. After this single pass, at most one person remains who could possibly be the celebrity.
2. **Verification pass:** the elimination process doesn't guarantee `candidate` actually *is* the celebrity, just that everyone else has been ruled out. Verify by checking `knows(candidate, i) == false` and `knows(i, candidate) == true` for every other `i`. If all checks pass, return `candidate`; otherwise return -1.

**Time complexity:** O(n) — each pass makes at most `n` calls to `knows`.

**Space complexity:** O(1) beyond the candidate tracking.
