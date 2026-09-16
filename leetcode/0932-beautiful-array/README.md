# 932. Beautiful Array

**Commonly asked at:** Google

Call an array `nums` (containing each integer from 1 to `n` exactly once) beautiful if there is no triple of indices `i < k < j` such that `nums[k] * 2 == nums[i] + nums[j]` (i.e. no element is exactly the average of some earlier and some later element). Given `n`, return any beautiful array of length `n`.

**Example 1:**
```
Input: n = 4
Output: [1,3,2,4] (one valid beautiful arrangement)
```

**Example 2:**
```
Input: n = 5
Output: [1,5,3,2,4] (one valid beautiful arrangement)
```

**Constraints:**
- 1 <= n <= 1000

## Approach

Randomized shuffling with a validity check would be far too slow to reliably pass for n close to 1000. The way in is a **divide-and-conquer construction** built on two observations:

1. If `nums` is beautiful, then any array obtained from it by a consistent affine transform (like `x -> 2x` or `x -> 2x - 1`) is also beautiful — scaling and shifting preserves the "no exact average" property, since `2*(a*k+b) == (a*i+b) + (a*j+b)` iff `2k == i+j` in the original.
2. If you take one beautiful sequence transformed so every value is **odd**, and another transformed so every value is **even**, and concatenate them (odds first, evens second, or any order), the combined array is still beautiful — because a violation `2*nums[k] == nums[i] + nums[j]` would require `nums[i]` and `nums[j]` to have the same parity (their sum has to be even), so any triple straddling the odd/even split can never violate the condition; the only triples that could ever violate it live entirely within one already-beautiful half.

So build it recursively: to get a beautiful array of numbers 1..n, first recursively build a beautiful array of 1..ceil(n/2) and transform it via `x -> 2x - 1` (mapping it onto the odd numbers up to n), then recursively build a beautiful array of 1..floor(n/2) and transform it via `x -> 2x` (mapping onto the evens up to n), then concatenate odds-then-evens. The base case is n = 1 (`[1]`, trivially beautiful). Memoize by `n` since the same sub-sizes recur across the recursion tree.

**Time complexity:** O(n log n) — the recursion halves the problem size at each level (O(log n) levels), and each level does O(n) total work building and concatenating arrays.

**Space complexity:** O(n log n) for the memoized sub-arrays at every distinct size encountered (O(n) for the final answer alone, with the memo table adding the rest).
