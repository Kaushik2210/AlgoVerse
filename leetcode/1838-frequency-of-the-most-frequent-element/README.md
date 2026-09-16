# 1838. Frequency of the Most Frequent Element

**Commonly asked at:** Amazon

You're given an integer array `nums` and an integer `k`. In one operation you can choose an index of `nums` and increment its value by 1. Return the maximum possible frequency of an element after performing at most `k` operations.

**Example 1:**
```
Input: nums = [1,2,4], k = 5
Output: 3
Explanation: Increment the first element three times and the second element two times to make [4,4,4]. 3+2 = 5 operations, giving frequency 3.
```

**Example 2:**
```
Input: nums = [1,4,8,13], k = 5
Output: 2
Explanation: Turn [1] into [4] (3 ops, matching 4), or [8] into [13] (5 ops, matching 13). Either way, frequency 2.
```

**Constraints:**
- 1 <= nums.length <= 10^5
- 1 <= nums[i] <= 10^5
- 1 <= k <= 10^5

## Approach

Since we can only increment (never decrement), the cheapest way to make a group of numbers equal is to raise every one of them up to the value of the **largest** number in the group. So sort `nums` first — then any contiguous window in the sorted array becomes a candidate group, and the cost to equalize a window `[left, right]` is `nums[right] * windowLength - sum(window)`, i.e. how far every element in the window is from the window's max, summed up.

That cost only grows as the window widens (both because more elements need raising and because the target ceiling can only increase), so it's monotonic — a textbook variable-size sliding window. Expand with `right`, adding to a running window sum; whenever the cost of equalizing the current window exceeds `k`, shrink from the left until it's affordable again. At each valid state, the window length is a candidate for the answer.

**Time complexity:** O(n log n) — dominated by the sort; the sliding window itself is O(n).

**Space complexity:** O(1) extra (beyond the sort, which may use O(log n) or O(n) depending on the implementation) — just a running sum and pointers.
