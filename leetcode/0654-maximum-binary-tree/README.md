# 654. Maximum Binary Tree

**Commonly asked at:** Google, Meta, Microsoft, Bloomberg

Given an integer array `nums` with distinct values, build a "maximum binary tree" recursively: the root is the maximum value in `nums`, its left subtree is built the same way from the elements to the left of that maximum, and its right subtree is built the same way from the elements to the right of it. Return the root.

**Example 1:**
```
Input: nums = [3,2,1,6,0,5]
Output: [6,3,5,null,2,0,null,null,null,null,1]
Explanation: 6 is the max, so it's the root. Left of 6 is [3,2,1], right of 6 is [0,5]; each side recurses the same way.
```

**Example 2:**
```
Input: nums = [3,2,1]
Output: [3,null,2,null,1]
```

**Constraints:**
- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`
- All values in `nums` are distinct

## Approach

The construction rule is already a direct recursive definition — find the maximum in the current range, make it the root, then recurse on the sub-ranges to its left and right for the two subtrees. So the implementation is exactly that, done over index ranges into the original array rather than slicing new arrays each time (slicing works but costs extra copying; using `lo`/`hi` bounds avoids it).

`build(lo, hi)`: if `lo > hi`, the range is empty, return `None`. Otherwise scan `nums[lo..hi]` for the index of the maximum value, create a node with that value, then recursively build the left subtree from `(lo, max_idx - 1)` and the right subtree from `(max_idx + 1, hi)`.

**Time complexity:** O(n^2) in the worst case — a strictly increasing or decreasing array makes every recursive call scan a range that's only one shorter than the last, giving the same skewed-recursion pattern as an unbalanced binary search tree build.

**Space complexity:** O(n) for the recursion stack in the worst (skewed) case, plus O(n) for the output tree itself.
