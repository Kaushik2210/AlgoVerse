# 12. Integer to Roman

Given an integer `num`, convert it to a Roman numeral string. Roman numerals use `I`=1, `V`=5, `X`=10, `L`=50, `C`=100, `D`=500, `M`=1000, plus six subtractive pairs: `IV`=4, `IX`=9, `XL`=40, `XC`=90, `CD`=400, `CM`=900.

**Example 1:**
```
Input: num = 3749
Output: "MMMDCCXLIX"
Explanation: M=1000 (x3) + D=500 + CC=200 + XL=40 + IX=9
```

**Example 2:**
```
Input: num = 58
Output: "LVIII"
```

**Example 3:**
```
Input: num = 1994
Output: "MCMXCIV"
```

**Constraints:**
- 1 <= num <= 3999

## Approach

The naive way is to think about the number digit by digit (thousands, hundreds, tens, ones) and figure out what Roman chunk each digit position maps to. That works but means juggling place value.

A simpler way to think about it: lay out every value that can appear as a single Roman "unit" — including the six subtractive combos — in descending order: 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1, paired with their symbols (`M`, `CM`, `D`, `CD`, `C`, `XC`, `L`, `XL`, `X`, `IX`, `V`, `IV`, `I`). Then greedily consume the number: walk down this list, and for each value, while `num` is still at least that value, append the matching symbol and subtract the value from `num`. Move to the next (smaller) value once it no longer fits.

This works because Roman numerals are inherently a greedy representation — always using the largest chunk that fits produces the canonical, valid Roman numeral, and including the subtractive pairs as first-class "digits" means the algorithm never has to reason about subtraction explicitly; it just always picks the biggest matching unit.

**Time complexity:** O(1) — the value list has a fixed size (13 entries) and `num` is bounded by 3999, so the loop runs a constant number of times regardless of input.

**Space complexity:** O(1) — aside from the fixed-size value table, the output string length is bounded by a constant (at most 15 characters for numbers up to 3999).
