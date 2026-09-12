# 378. Kth Smallest Element in a Sorted Matrix

You're given an `n x n` matrix where each row and each column is sorted in ascending order. Return the `k`th smallest element in the matrix (counting duplicates as separate entries).

**Example 1:**
```
Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13
Explanation: The sorted flattened list is [1,5,9,10,11,12,13,13,15], and the 8th smallest is 13.
```

**Example 2:**
```
Input: matrix = [[-5]], k = 1
Output: -5
```

**Constraints:**
- n == matrix.length == matrix[i].length
- 1 <= n <= 300
- -10^9 <= matrix[i][j] <= 10^9
- All rows and columns of matrix are sorted in ascending order
- 1 <= k <= n^2

## Approach

Flattening and sorting the whole matrix works but throws away the fact that rows *and* columns are already sorted — that structure lets us binary search directly on the **range of possible answer values**, rather than on indices.

The key operation is: given a candidate value `mid`, count how many elements in the matrix are `<= mid`. Because every row and column is sorted, that count can be computed in O(n) total (not O(n^2)) with a staircase walk starting from the **bottom-left** cell: if the current cell is `<= mid`, then every cell above it in that same column is also `<= mid` (column sorted ascending going down), so add `row + 1` to the count and step one column to the right. If the current cell is `> mid`, step one row up instead. Either way the walk moves strictly right or strictly up each step, so it touches at most `2n` cells total before falling off the matrix.

Binary search the value range `[matrix[0][0], matrix[n-1][n-1]]`: for a candidate `mid`, count elements `<= mid`. If that count is `< k`, the answer must be larger, so search the upper half; otherwise the answer is `mid` or smaller, so search the lower half (keep `mid` as a candidate since it might be an actual matrix value achieving exactly the right count). Converge until the search range collapses to a single value — that value is guaranteed to be an actual entry in the matrix and is the `k`th smallest.

**Time complexity:** O(n log(max - min)) — each binary search step does an O(n) count, and the search space (a range of integer values) shrinks logarithmically.

**Space complexity:** O(1) beyond the input.
