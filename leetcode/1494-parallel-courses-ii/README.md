# 1494. Parallel Courses II

**Note:** this problem is LeetCode premium (subscriber-only) — no live link to test against, but the statement and expected behavior below are well documented, and the solution here is checked against known example outputs.

You have `n` courses labeled `1` to `n`. `relations[i] = [prevCourse, nextCourse]` means `prevCourse` must be completed before `nextCourse`. You can take at most `k` courses in a single semester, but only courses whose prerequisites are all already completed. Return the minimum number of semesters needed to complete all courses.

**Example 1:**
```
Input: n = 4, relations = [[2,1],[3,1],[1,4]], k = 2
Output: 3
Explanation: Semester 1: courses 2 and 3 (no prereqs). Semester 2: course 1 (needs 2 and 3, both done). Semester 3: course 4 (needs 1).
```

**Example 2:**
```
Input: n = 5, relations = [[2,1],[3,1],[4,1],[1,5]], k = 2
Output: 4
Explanation: Only 2 of {2,3,4} can be taken per semester even though all three are simultaneously available, so it takes two semesters to clear them before starting on 1.
```

**Constraints:**
- 1 <= n <= 15
- 0 <= relations.length <= n * (n-1) / 2
- relations[i].length == 2
- 1 <= prevCourse, nextCourse <= n
- prevCourse != nextCourse
- All pairs [prevCourse, nextCourse] are unique
- The given graph is a DAG
- 1 <= k <= n

## Approach

n is capped at 15, which is the giveaway that this wants a bitmask over the set of completed courses — there are only 2^15 = 32768 possible "which courses are done" states, small enough to hold a DP value for every one of them.

First, represent each course's prerequisites as a bitmask: `prereq[c]` has bit `p` set if course `p` must be completed before course `c`.

`dp[mask]` is the minimum number of semesters needed to reach the state where exactly the courses in `mask` are completed. `dp[0] = 0` (nothing done yet, no semesters spent). Process masks in increasing numeric order — any transition only ever adds new bits, so `dp[mask]` is fully determined before it's used as a source.

For a given `mask`, compute which not-yet-taken courses have every prerequisite already inside `mask` — that's this semester's `available` set. Then the real question is: which subset of `available`, of size at most `k`, should be taken this semester? Rather than reasoning about which subset is "best," just try all of them: enumerate every non-empty submask of `available` using the standard submask-enumeration trick (`sub = (sub - 1) & available`), and for each one with at most `k` bits set, treat it as "take exactly these courses this semester" and relax `dp[mask | sub] = min(dp[mask | sub], dp[mask] + 1)`.

It's always safe to try every submask rather than reasoning about which is optimal up front, since the DP takes the minimum over all of them anyway — the subtlety this problem is known for is exactly forgetting to also try taking *fewer* than the maximum `min(k, |available|)` courses in a semester, which can occasionally lead to a better overall path by leaving certain courses to combine more efficiently with others later. Trying every submask sidesteps that trap entirely.

The answer is `dp[(1 << n) - 1]`, the minimum semesters to reach the state where every course is completed.

**Time complexity:** O(2^n * n) to identify available courses per mask, plus O(3^n) in the worst case for the submask enumeration across all masks (each element independently is in a mask, out of it and in the submask being enumerated, or out of the submask — a standard bound for total submask-of-submask work) — well within reach for n <= 15.

**Space complexity:** O(2^n) for the dp array.
