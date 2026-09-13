# 857. Minimum Cost to Hire K Workers

There are `n` workers. You are given two integer arrays `quality` and `wage` where `quality[i]` is the quality of the `i`th worker and `wage[i]` is the minimum wage expectation for the `i`th worker.

We want to hire exactly `k` workers to form a paid group. To hire a group of `k` workers, we must pay them according to the following rules:
1. Every worker in the paid group must be paid at least their minimum wage expectation.
2. In the group, each worker's pay must be directly proportional to their quality compared to other workers in the group. This means if a worker's quality is double that of another worker in the group, they must be paid twice as much as that other worker.

Given the integer array `quality`, the integer array `wage`, and an integer `k`, return the least amount of money needed to form a group satisfying the above conditions.

**Example 1:**
```
Input: quality = [10,20,5], wage = [70,50,30], k = 2
Output: 105.00000
Explanation: We pay 70 to 0th worker and 35 to 2nd worker.
```

**Example 2:**
```
Input: quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
Output: 30.66667
Explanation: We pay 4 to 0th worker, 13.33333 to 2nd and 3rd workers separately.
```

**Constraints:**
- n == quality.length == wage.length
- 1 <= k <= n <= 10^4
- 1 <= quality[i], wage[i] <= 10^4

## Approach

The proportional-pay rule means that within a chosen group, every worker's pay equals `ratio * quality[i]` for some shared `ratio` — and to satisfy everyone's minimum wage, that shared ratio must be at least the maximum of `wage[i] / quality[i]` across the group. So for a fixed group, the cheapest valid ratio is exactly the largest wage-to-quality ratio among its members, and total cost is `ratio * sum(quality in group)`.

That means: sort every worker by their own `wage[i] / quality[i]` ratio ascending, and consider each worker in turn as the one whose ratio becomes the "binding" ratio for the group (since it's the current maximum among everyone considered so far). For that fixed ratio to be achievable at minimum cost, the group should consist of the `k` workers with the smallest total quality among all workers whose ratio is <= the current one.

Walk through workers in increasing ratio order, maintaining a max-heap of the qualities of workers admitted "so far" (capped at size k). Each new worker's quality gets pushed in; if the heap exceeds size k, pop off the *largest* quality (it's the worst one to keep, since we want to minimize total quality for the given ratio) and subtract it from the running quality sum. Once the heap has exactly k workers, the current ratio times the current quality sum is a candidate total cost — track the minimum such value across the whole scan.

Because ratios only increase as we go, and every group we ever evaluate uses the *current* worker's ratio as its rate, this greedily explores every ratio-fixing choice with the cheapest possible companion set for that ratio, guaranteeing the global minimum gets found.

**Time complexity:** O(n log n) for the initial sort by ratio, plus O(n log k) for maintaining the size-k max-heap across the scan.

**Space complexity:** O(n) for the sorted order and O(k) for the heap.
