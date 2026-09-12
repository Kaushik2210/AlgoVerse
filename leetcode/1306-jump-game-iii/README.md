# 1306. Jump Game III

You're given a zero-indexed array of non-negative integers `arr` and a starting index `start`. From index `i` you may jump to `i + arr[i]` or `i - arr[i]`, as long as the destination is still inside the array bounds. Return `true` if you can reach any index in the array holding the value 0.

**Example 1:**
```
Input: arr = [4,2,3,0,3,1,2], start = 5
Output: true
Explanation: 5 -> 4 -> 1 -> 3, and arr[3] == 0.
```

**Example 2:**
```
Input: arr = [4,2,3,0,3,1,2], start = 0
Output: true
Explanation: 0 -> 4 -> 1 -> 3, and arr[3] == 0.
```

**Example 3:**
```
Input: arr = [3,0,2,1,2], start = 2
Output: false
```

**Constraints:**
- 1 <= arr.length <= 5*10^4
- 0 <= arr[i] < arr.length
- 0 <= start < arr.length

## Approach

This is really just "can I reach a target node in a graph," where each index is a node with up to two outgoing edges: `i + arr[i]` and `i - arr[i]`. That's a plain reachability search — depth-first or breadth-first both work fine.

Do a DFS from `start`. At each index, first bounds-check it and make sure it hasn't been visited yet (arr[i] can be 0 while arr itself isn't all zero, and jump lengths can send you back and forth, so an unguarded search could loop forever). If the current index holds a 0, success — return true immediately. Otherwise mark it visited and recurse into both possible jumps, succeeding if either one does.

Marking indices visited before recursing is what keeps this from doing exponential redundant work or spinning in a cycle (e.g. bouncing back and forth between two indices with nonzero jump lengths).

**Time complexity:** O(n) — each index is visited and expanded at most once thanks to the visited array.

**Space complexity:** O(n) — the visited array plus recursion stack depth in the worst case.
