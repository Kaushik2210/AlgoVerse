# 31. Next Permutation

A permutation of an array of integers is just some arrangement of its members into a sequence. Given an array `nums`, rearrange it into the lexicographically next greater permutation — the next one you'd hit if you listed every permutation of the array in sorted order. If `nums` is already the largest possible permutation, rearrange it into the smallest one (sorted ascending) instead. You must do this in place, using only constant extra space.

**Example 1:**
```
Input: nums = [1,2,3]
Output: [1,3,2]
```

**Example 2:**
```
Input: nums = [3,2,1]
Output: [1,2,3]
```

**Example 3:**
```
Input: nums = [1,1,5]
Output: [1,5,1]
```

**Constraints:**
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 100

## Approach

Brute force would be generating every permutation, sorting them, and finding the one right after the current arrangement — wildly expensive (factorial time) and not what "in place, constant space" is asking for.

Think about how you'd count up in permutations by hand. To get the *next* arrangement, you want to change the smallest possible suffix of the array, and change it by the smallest possible amount. Concretely:

1. Scan from the right and find the first index `i` where `nums[i] < nums[i + 1]` — this is the first place (from the right) where the sequence stops being non-increasing. Everything to the right of `i` is already the largest arrangement of that suffix (strictly decreasing), so it can't be bumped up further on its own — `i` is the "pivot" that needs to grow.
2. If no such `i` exists, the whole array is strictly decreasing — it's the last permutation, so just reverse it to get the first one and stop.
3. Otherwise, scan from the right again to find the smallest value in the suffix that's still greater than `nums[i]` (there's guaranteed to be one, since `nums[i+1] > nums[i]`), and swap it with `nums[i]`. This bumps the pivot up to the next possible value.
4. The suffix after index `i` is still in decreasing order (swapping didn't change that), but we want the *smallest* arrangement of it to keep the overall increase minimal — so reverse that suffix to make it ascending.

**Time complexity:** O(n) — each step is a single linear scan or reversal over the array.

**Space complexity:** O(1) — everything is done in place with a few index variables.
