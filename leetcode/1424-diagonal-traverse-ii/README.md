# 1424. Diagonal Traverse II

You're given a 2D integer array `nums` where each row can be a different length (a jagged/ragged array). Return all the elements in diagonal order — same idea as diagonal traversal of a rectangular matrix, but the rows aren't all the same size.

**Example 1:**
```
Input: nums = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,4,2,7,5,3,8,6,9]
```

**Example 2:**
```
Input: nums = [[1,2,3,4,5],[6,7],[8],[9,10,11],[12,13,14,15,16]]
Output: [1,6,2,8,7,3,9,4,12,10,5,13,11,14,15,16]
```

**Constraints:**
- 1 <= nums.length <= 10^5
- 1 <= nums[i].length <= 10^5
- 1 <= sum of nums[i].length <= 10^5
- 1 <= nums[i][j] <= 10^9

## Approach

Because rows are ragged, there's no clean up-down zigzag walk like the rectangular version — you can't reliably bounce off edges when the edges are different lengths for every row. But there's a simpler invariant hiding here: every cell `(i, j)` belongs to diagonal number `i + j`, and within a fixed diagonal, the output always goes from the *largest* row index down to the smallest.

So instead of simulating a walk, just bucket. Scan the array in normal row-major order and drop each value into a bucket keyed by `i + j`. Because row-major order visits increasing `i` first within a diagonal, each bucket naturally fills up in ascending-row order — which is the exact reverse of what we want to output. So process the buckets in order of diagonal index, and reverse each bucket before appending it to the answer.

This sidesteps needing to know each row's length in advance or handling out-of-bounds walking — it's a single linear pass to bucket everything, then a linear pass to emit it.

**Time complexity:** O(n) where n is the total number of elements — every element is visited once to bucket it and once to emit it.

**Space complexity:** O(n) for the diagonal buckets and the output.
