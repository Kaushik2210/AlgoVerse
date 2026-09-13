# 166. Fraction to Recurring Decimal

You're given two integers `numerator` and `denominator` representing a fraction. Return the fraction as a string in decimal form. If the decimal part is repeating, wrap the repeating part in parentheses.

**Example 1:**
```
Input: numerator = 1, denominator = 2
Output: "0.5"
```

**Example 2:**
```
Input: numerator = 2, denominator = 1
Output: "2"
```

**Example 3:**
```
Input: numerator = 4, denominator = 333
Output: "0.(012)"
```

**Constraints:**
- -2^31 <= numerator, denominator <= 2^31 - 1
- denominator != 0

## Approach

This is basically simulating long division by hand and noticing when it starts looping. Long division on a repeating fraction like 1/3 produces the same remainder over and over (1 -> 10 -> 1 -> 10 -> ...), which is exactly why the digits repeat — once a remainder reappears, every digit from that point on will repeat too, in the same cycle.

So the plan: handle the sign up front (the result is negative if exactly one of numerator/denominator is negative), then work with absolute values to avoid sign headaches during division. Compute the integer part with plain division. If there's no remainder, that's the whole answer. Otherwise start building the fractional part: at each step, multiply the current remainder by 10 and divide by the denominator to get the next digit, then update the remainder. Keep a hash map from remainder value to the position in the fractional-part string where that remainder was first seen. If a remainder ever repeats, you know a cycle has started — insert a `(` at the position recorded for that remainder and close it with `)` at the end. If the remainder ever hits 0, division terminates cleanly with no repeat.

**Time complexity:** O(d) where d is the number of digits in the denominator's period, since a remainder can only take on `denominator` distinct values before one must repeat (pigeonhole), bounding the loop length.

**Space complexity:** O(d) for the map of remainder positions and the output string.
