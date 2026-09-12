# 502. IPO

A company wants to pick at most `k` distinct projects to maximize its capital before an IPO. You're given `profits[i]` and `capital[i]` for each project — you need at least `capital[i]` on hand to *start* project `i`, and completing it adds `profits[i]` to your capital. Starting with `w` capital, pick up to `k` projects (each at most once) to maximize the final capital. Return the maximum capital achievable.

**Example 1:**
```
Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
Output: 4
Explanation: With w=0, only project 0 is affordable, raising capital to 0+1=1. Now projects 1 and 2 are both affordable; pick project 2 (profit 3) for a total of 1+3=4.
```

**Example 2:**
```
Input: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
Output: 6
```

**Constraints:**
- 1 <= k <= 10^5
- 0 <= w <= 10^9
- n == profits.length == capital.length
- 1 <= n <= 10^5
- 0 <= profits[i] <= 10^4
- 0 <= capital[i] <= 10^9

## Approach

At every step, the greedy move is: among all the projects currently affordable with the capital on hand, do the single most profitable one. That greedy choice is provably optimal here — since capital only ever grows (profits are non-negative), any project affordable now stays affordable forever, so there's never a reason to save it for later or to pick a less profitable affordable project over a more profitable one; taking the best available option now can never close off a better option later.

To make "the most profitable currently-affordable project" fast to find repeatedly, use two structures: sort all projects by required capital ascending, and maintain a **max-heap keyed by profit** for the projects that have become affordable. Repeat up to `k` times: first, pour every project whose capital requirement is <= current `w` into the max-heap (advancing a pointer through the capital-sorted list so each project enters the heap exactly once, whenever it first becomes affordable); then pop the heap's top (the most profitable affordable project) and add its profit to `w`. If the heap is ever empty when it's time to pick, no more projects are affordable at all, so stop early.

**Time complexity:** O(n log n) — sorting by capital is O(n log n), and each of the n projects is pushed/popped from the heap at most once across the whole run, each operation O(log n).

**Space complexity:** O(n) for the sorted list and the heap.
