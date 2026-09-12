# 43. Multiply Strings

You're given two non-negative integers `num1` and `num2` represented as strings. Return the product of `num1` and `num2`, also as a string. You can't convert the inputs directly to integers or use any built-in big-integer library.

**Example 1:**
```
Input: num1 = "2", num2 = "3"
Output: "6"
```

**Example 2:**
```
Input: num1 = "123", num2 = "456"
Output: "56088"
```

**Constraints:**
- 1 <= num1.length, num2.length <= 200
- `num1` and `num2` consist of digits only
- Neither `num1` nor `num2` has a leading zero, except the number "0" itself

## Approach

The naive idea of parsing both strings into actual integers defeats the point of the problem (and would overflow in languages without bignums), so this has to be done digit by digit, the way you'd multiply on paper.

The key insight is about *where* each digit-product lands. If you multiply `num1[i]` by `num2[j]` (counting from the left), the result contributes to positions `i + j` and `i + j + 1` in the final answer array — `i + j + 1` gets the ones digit of that product, and `i + j` gets the carry. This is because a number of length `n1` times a number of length `n2` produces at most `n1 + n2` digits, and the digit at index `i` in `num1` and index `j` in `num2` sit at those fixed weight positions in the output regardless of what else is going on.

So allocate a result array of size `n1 + n2`, initialized to zero. For every pair `(i, j)`, compute the digit product, add it to whatever's already sitting at `result[i + j + 1]` (since multiple digit-products can land on the same position across different loop iterations), take `% 10` for that position, and push the `// 10` carry into `result[i + j]` immediately rather than waiting for a separate carry pass — this way overlapping contributions accumulate correctly on their own.

At the end, strip any leading zeros from the result array (there's at most one meaningful leading zero) and join the remaining digits into a string. Handle the trivial case where either input is `"0"` up front.

**Time complexity:** O(n1 * n2) — every pair of digits is multiplied exactly once.

**Space complexity:** O(n1 + n2) for the result array (aside from the output string itself).
