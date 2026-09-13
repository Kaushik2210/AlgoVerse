# 752. Open the Lock

You have a lock with 4 circular wheels, each showing a digit from `0` to `9`. Each wheel can be turned one click up or down (`9` wraps to `0` and `0` wraps to `9`). The lock starts at `"0000"`.

You're given a list `deadends` — combinations that, if the lock ever displays one, it locks permanently and can't be turned any further. You're also given a `target` combination. Return the minimum number of turns needed to reach `target` from `"0000"`, or `-1` if it's impossible.

**Example 1:**
```
Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6
Explanation: 0000 -> 1000 -> 1100 -> 1200 -> 1201 -> 1202 -> 0202
```

**Example 2:**
```
Input: deadends = ["8888"], target = "0009"
Output: 1
Explanation: turn the last wheel down once to go from 0000 to 0009.
```

**Example 3:**
```
Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
Explanation: every combination reachable in one turn from 0000 that could lead toward 8888 is blocked off.
```

**Constraints:**
- `1 <= deadends.length <= 500`
- `deadends[i].length == 4`
- `target.length == 4`
- `target` is not in `deadends`
- `target` and every value in `deadends` consist of digits only

## Approach

Every combination is just a 4-digit string, and turning any one wheel one click gives exactly 8 neighboring combinations (each of the 4 positions can go up or down by one, with wraparound between `9` and `0`). That's a graph with at most 10,000 nodes where edges connect states one turn apart — and "minimum number of turns" is just shortest path in an unweighted graph, which is BFS.

Start a BFS from `"0000"`, treating any state in `deadends` as a wall you're not allowed to step on (skip it entirely, don't even mark it visited beyond that). At each state, generate its 8 neighbors by incrementing/decrementing each of the 4 digits mod 10, and enqueue any neighbor that isn't a deadend and hasn't been visited yet. The first time `target` is produced this way, the current BFS depth + 1 is the answer.

Two edge cases matter: if `"0000"` itself is in `deadends`, the lock is dead on arrival and the answer is `-1` before doing any work. If `target` is `"0000"`, zero turns are needed.

**Time complexity:** O(1) in the worst case, technically — the state space is bounded by 10^4 combinations regardless of input, and each state does O(1) work generating its 8 neighbors, so it's O(10^4 * 8), a constant.

**Space complexity:** O(10^4) for the visited set and BFS queue in the worst case.
