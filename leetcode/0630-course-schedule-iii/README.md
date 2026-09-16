# 630. Course Schedule III

**Commonly asked at:** Google

You're given a list of courses `courses` where `courses[i] = [durationi, lastDayi]`. You can only take one course at a time, and course `i` must be completed (started and finished, back to back with no gaps unless you skip a course) entirely before or exactly on day `lastDayi`. Return the maximum number of courses you can take.

**Example 1:**
```
Input: courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]
Output: 3
Explanation: take course 0 (finish day 100), course 1 (finish day 300), course 3 (finish day 2300). Skip course 2 since it can't fit.
```

**Example 2:**
```
Input: courses = [[1,2]]
Output: 1
```

**Constraints:**
- 1 <= courses.length <= 10^4
- 1 <= durationi, lastDayi <= 10^4

## Approach

Sort courses by deadline (`lastDayi`) ascending, and consider them one at a time in that order — this matches the intuition that courses due sooner should generally be handled first. Greedily *tentatively take every course*, keeping a running total of time spent so far and pushing each course's duration onto a max-heap.

The trick is what happens when the running total exceeds the current course's deadline: rather than necessarily dropping the course that was just added, drop whichever course *taken so far* has the largest duration — pop the max off the heap and subtract it from the running total. That's always at least as good as dropping the current course, because:
- If the course just added happens to be the longest one taken so far, popping the max drops exactly it, no different from rejecting it outright.
- If some earlier course is longer, swapping it out for the current one keeps the *same number* of courses scheduled but frees up more slack (since we removed a bigger duration than we might otherwise have), which can only help future courses fit.

Either way, the heap size (representing the count of courses currently kept) only ever grows or stays the same as time proceeds — it never decreases below what it was before considering the current course, except by exactly one when an overflow forces a swap. At the end, the heap's size is the answer.

**Time complexity:** O(n log n) — sorting is O(n log n), and each of the n courses does one O(log n) heap push and at most one O(log n) heap pop.

**Space complexity:** O(n) for the max-heap in the worst case (all courses taken).
