# 503. Next Greater Element II

Given a **circular** integer array `nums` (the last element's next element is the first element), return the next greater element for every element. The next greater element of `x` is the first element greater than `x` that you'd encounter traversing the array in order, wrapping around once if needed. If it doesn't exist, output -1 for that number.

**Example 1:**
```
Input: nums = [1,2,1]
Output: [2,-1,2]
Explanation:
- The first 1's next greater element is 2.
- 2's next greater element doesn't exist, so -1.
- The second 1's next greater is search circularly, and the next greater is also 2.
```

**Example 2:**
```
Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]
```

**Constraints:**
- 1 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9

## Approach

Same monotonic-stack idea as Next Greater Element I, but now an element might need to look *past the end of the array and wrap around* to find its answer (e.g. the last element's next greater could be near the front).

Simulate the wraparound without physically doubling the array: iterate `i` from `0` to `2n - 1`, but always index into `nums` with `i % n`. Push/pop **indices** (not values) onto a monotonic stack the same way as before — while `nums[i % n]` beats the value at the index on top of the stack, pop it and record `answer[popped] = nums[i % n]`. Only push `i % n` itself while `i < n`, so each index enters the stack exactly once, during its "real" first pass; the second lap over indices `n..2n-1` exists purely to give indices still stuck on the stack a chance to see the wrapped-around portion of the array and get resolved, without re-pushing anything.

Anything left on the stack after the full 2n-step pass genuinely has no greater element anywhere in the circle, so its answer stays -1.

**Time complexity:** O(n) — each index is pushed once and popped at most once, even though the loop runs 2n times.

**Space complexity:** O(n) for the stack and the answer array.
