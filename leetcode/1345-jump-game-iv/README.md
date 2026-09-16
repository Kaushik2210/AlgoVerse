# 1345. Jump Game IV

**Commonly asked at:** Amazon

You're given an array of integers `arr`. Starting at index 0, in one step you can jump from index `i` to:
- index `i + 1`,
- index `i - 1`, or
- any index `j` where `arr[j] == arr[i]` (a same-value teleport).

Return the minimum number of steps to reach the last index of the array.

**Example 1:**
```
Input: arr = [100,-23,-23,404,100,23,23,23,3,404]
Output: 3
Explanation: One shortest path is index 0 -> 4 (jump to the other 100) -> 3 (step back one) -> 9 (jump to the other 404), 3 steps total.
```

**Example 2:**
```
Input: arr = [7]
Output: 0
Explanation: Start index is the last index, 0 steps needed.
```

**Example 3:**
```
Input: arr = [7,6,9,6,9,6,9,7]
Output: 1
```

**Constraints:**
- 1 <= arr.length <= 5 * 10^4
- -10^8 <= arr[i] <= 10^8

## Approach

This is unweighted shortest path on an implicit graph — every index is a node, and edges connect `i` to `i-1`, `i+1`, and every other index sharing the same value. BFS from index 0 finds the minimum number of steps to any target, including the last index, since BFS explores level by level (level = number of steps).

The one subtlety that makes this efficient: without care, following every same-value edge for every visited index is expensive if a value repeats many times (e.g., an array of the same number, where every step could otherwise re-explore that entire group). The fix is to group indices by value first (a hash map of value -> list of indices), and once a value's whole group has been fully expanded from *any* index in that group, clear the group from the map so it's never expanded again — every index with that value only needs to be offered as a same-value jump once across the entire BFS, since after the first time any of them is reached, all reachable ones already got enqueued.

Steps:
1. Build `value_to_indices: {value: [indices]}`.
2. Standard BFS from index 0, tracking `visited` indices and step count.
3. At each index `i`, try the three moves: `i-1`, `i+1` (if in bounds and unvisited), and all indices in `value_to_indices[arr[i]]` (if that value group hasn't already been fully consumed). After processing a value group, delete it from the map so later BFS levels don't redundantly re-scan it.
4. Return the step count the moment index `len(arr) - 1` is dequeued/reached.

**Time complexity:** O(n) — each index is visited once, and each value group is fully expanded exactly once total across the whole BFS.

**Space complexity:** O(n) for the visited set, the queue, and the value-to-indices map.
