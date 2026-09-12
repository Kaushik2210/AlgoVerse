# 162. Find Peak Element

A peak element is one that's strictly greater than both of its neighbors. You're given an array `nums` where `nums[i] != nums[i+1]` for all valid `i`. Find any peak and return its index — if the array has multiple peaks, returning the index of any one of them is fine. Imagine `nums[-1]` and `nums[n]` are both `-infinity`, so an element at either end just needs to beat its single real neighbor.

**Example 1:**
```
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak, and its index is 2
```

**Example 2:**
```
Input: nums = [1,2,1,3,5,6,4]
Output: 1 or 5
Explanation: index 1 (value 2) and index 5 (value 6) are both valid peaks
```

**Constraints:**
- 1 <= nums.length <= 1000
- -2^31 <= nums[i] <= 2^31 - 1
- nums[i] != nums[i + 1]

## Approach

Scanning left to right for the first element bigger than both neighbors works in O(n), but the problem is really asking for O(log n), which is a strong hint to binary search on the answer even though the array isn't sorted.

The key insight is that you don't need the array sorted — you just need a way to decide which half to throw away, and the "no equal neighbors" guarantee gives you exactly that. Compare `nums[mid]` to `nums[mid+1]`:

- If `nums[mid] < nums[mid+1]`, the slope is going up at `mid`. Somewhere to the right there has to be a peak — either the values keep climbing until they hit the end of the array (and the last element is automatically a peak since the boundary counts as `-infinity`), or they climb and then fall, which means a peak exists at the turning point. Either way, discard the left half including `mid` and search `[mid+1, right]`.
- If `nums[mid] > nums[mid+1]`, the slope is going down, so `mid` is bigger than its right neighbor. `mid` might already be a peak (if it also beats its left neighbor), or the actual peak is somewhere to its left, but never to the right. Discard everything from `mid+1` onward and search `[left, mid]`.

Because one direction always guarantees a peak exists in the kept half, this converges correctly, and the loop ends with `left == right` sitting on a peak.

**Time complexity:** O(log n) — binary search halves the search space each step.

**Space complexity:** O(1) — just a few pointers.
