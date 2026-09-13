# 282. Expression Add Operators

You're given a string `num` that contains only digits, and an integer `target`. Return every way of inserting the binary operators `+`, `-`, and `*` between the digits of `num` (without reordering them, and without adding leading zeros to any multi-digit operand) so that the resulting expression evaluates to `target`. Order of results doesn't matter.

**Example 1:**
```
Input: num = "123", target = 6
Output: ["1*2*3","1+2+3"]
```

**Example 2:**
```
Input: num = "232", target = 8
Output: ["2*3+2","2+3*2"]
```

**Example 3:**
```
Input: num = "105", target = 5
Output: ["1*0+5","10-5"]
Explanation: 1*0+5 = 0+5 = 5, and 10-5 = 5. "0" by itself is a valid single-digit operand; "05" as a two-digit operand would not be, since it has a leading zero.
```

**Constraints:**
- `1 <= num.length <= 10`
- `num` consists of only digits
- `-2^31 <= target <= 2^31 - 1`

## Approach

This is backtracking over every way to split `num` into operands and glue an operator in front of each one (except the first). At each position, try every possible length for the next operand, and for each length, try appending it with `+`, `-`, or `*`.

The one real wrinkle is `*`, because of operator precedence: `a + b * c` isn't `(a + b) * c`. Plain left-to-right accumulation breaks for multiplication, so the backtracking needs to track not just the running evaluated `value`, but also `last_operand` — the value of the most recently applied term (with its sign already folded in). When the next operator is `*`, the fix is to first subtract out `last_operand`'s contribution from `value`, then add back `last_operand * new_operand`. That correctly retroactively "redoes" the last term as part of a bigger multiplied term, which is exactly what precedence requires. For `+` and `-`, `last_operand` is simply reset to the new operand (positive or negated) since those operators don't reach back and change anything already committed.

Leading zeros are rejected up front: if a candidate operand has length > 1 and starts with `'0'`, that split (and every longer split starting at the same index) is invalid, so the inner loop can `break` immediately rather than just `continue`.

The first operand (starting at index 0) is special-cased — it has no operator in front of it, it just seeds `expr`, `value`, and `last_operand`.

When the recursion reaches the end of `num`, the accumulated `value` is checked against `target`, and if it matches, the built expression string is added to the results.

**Time complexity:** O(4^n) in the worst case — at each of the n digit positions there are up to 3 operator choices times operand-length choices, so the branching factor is bounded by a small constant per digit, giving exponential but tightly bounded search space (n <= 10 keeps this fast in practice).

**Space complexity:** O(n) for the recursion depth and the expression string being built, plus the space for the output list itself.
