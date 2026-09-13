# 491. Increasing Subsequences

Given an integer array (which can contain duplicates), return all non-decreasing subsequences of length at least 2, with no duplicate subsequences in the result. The array itself is not sorted, and subsequences don't need to be contiguous, but elements must keep their original relative order.

**Example 1:**
```
Input: nums = [4,6,7,7]
Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
```

**Example 2:**
```
Input: nums = [4,4,3,2,1]
Output: [[4,4]]
```

**Constraints:**
- 1 <= nums.length <= 15
- -100 <= nums[i] <= 100

## Approach

Since the array isn't sorted, we can't just skip adjacent duplicates the way a normal "unique subsets" backtracking problem would (sorting is off the table because it would break the required relative order). Instead, at every branch point in the backtracking, only skip a value if it has already been tried *at this exact recursion level* — track that with a small `set` that gets reset fresh each time `backtrack` is called.

The backtracking itself explores every index from `start` onward as the next element to add: skip it if it would break the non-decreasing property (`nums[i] < path[-1]`), skip it if an identical value already branched from this same position earlier in the loop (that would just regenerate a subsequence already produced), otherwise add it to the current path, recurse from `i + 1`, then backtrack by removing it. Any time the path reaches length 2 or more, record a copy of it — every valid extension point along the way is a new valid subsequence, not just the maximal ones.

Because the "seen at this level" set only tracks duplicates among siblings sharing the same parent path, it correctly allows `[4,4]` (both 4's are picked at different recursion depths, not as siblings) while blocking a second identical branch like re-picking the same 7 value from two different positions with the same current path.

**Time complexity:** O(2^n * n) in the worst case — every subsequence corresponds to a distinct subset choice (up to duplicate pruning), and copying each valid one into the result costs O(n).

**Space complexity:** O(n) for the recursion stack and current path, not counting the output.
