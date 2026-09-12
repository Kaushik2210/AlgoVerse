# 13. Roman to Integer

Given a Roman numeral string `s`, convert it to an integer. Roman numerals use these symbol values: `I`=1, `V`=5, `X`=10, `L`=50, `C`=100, `D`=500, `M`=1000. Normally symbols are added left to right (`VI` = 6), but six specific cases use subtractive notation where a smaller symbol placed before a bigger one is subtracted (`IV`=4, `IX`=9, `XL`=40, `XC`=90, `CD`=400, `CM`=900).

**Example 1:**
```
Input: s = "III"
Output: 3
```

**Example 2:**
```
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V = 5, III = 3
```

**Example 3:**
```
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90, IV = 4
```

**Constraints:**
- 1 <= s.length <= 15
- `s` is a valid Roman numeral in the range [1, 3999]

## Approach

Map each symbol to its value, then walk the string left to right, looking at each symbol and the one right after it. The subtractive cases all share one property: the smaller-valued symbol comes immediately before a bigger one. So for each position, if the current symbol's value is less than the next symbol's value, subtract it instead of adding it; otherwise add it.

That single comparison handles all six subtractive pairs (IV, IX, XL, XC, CD, CM) without needing to special-case any of them by name — `I` before `V` or `X` gets subtracted, `X` before `L` or `C` gets subtracted, `C` before `D` or `M` gets subtracted, and everything else just accumulates normally.

**Time complexity:** O(n) — one pass over the string, comparing each symbol to its neighbor.

**Space complexity:** O(1) — the symbol-to-value map has a fixed, constant size.
