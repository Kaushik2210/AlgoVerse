# 287. Find the Duplicate Number

Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive, there's exactly one repeated number (it may repeat more than once). Find that repeated number, without modifying the array, and using only O(1) extra space.

**Example 1:**
```
Input: nums = [1,3,4,2,2]
Output: 2
```

**Example 2:**
```
Input: nums = [3,1,3,4,2]
Output: 3
```

**Constraints:**
- 1 <= n <= 10^5
- nums.length == n + 1
- 1 <= nums[i] <= n
- All the integers in nums appear only once except for precisely one integer which appears two or more times

## Approach

Sorting or using a hash set to spot the duplicate both work, but they either mutate the array or use O(n) extra space — the O(1) space, no-mutation constraint rules both out, and that combination is the giveaway for Floyd's cycle detection (the same trick used for Linked List Cycle and Happy Number).

The trick is to treat the array itself as a linked list without touching it: for each index `i`, `nums[i]` is treated as a "pointer" to the next index to visit, i.e. `next(i) = nums[i]`. Since values are all in `[1, n]` and there are `n+1` slots, every index-turned-value stays in bounds and this function is well-defined starting from index 0. Because two different indices contain the same duplicate value, both of them point to the same next index — that's exactly a merge point, and once a sequence has two "roads in, one road out," it has a cycle. So the duplicate value is precisely the entry point of a cycle in this implicit linked list.

Finding the cycle's entry point is the standard two-phase Floyd's algorithm:
1. Run slow (`nums[slow]`, one step) and fast (`nums[nums[fast]]`, two steps) pointers from index 0 until they meet inside the cycle.
2. Reset one pointer to the start (index 0) and advance both pointers one step at a time; the point where they meet again is the cycle's entry — mathematically guaranteed by the distances involved — and that entry point is the duplicate number.

**Time complexity:** O(n) — both phases of Floyd's algorithm take a linear number of steps.

**Space complexity:** O(1) — just a couple of pointers, and the array is never modified.
