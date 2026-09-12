# 17. Letter Combinations of a Phone Number

Given a string of digits from 2-9, return every possible letter combination that the number could represent, using the same letter mapping as an old phone keypad (2 -> "abc", 3 -> "def", ..., 9 -> "wxyz"). Return the combinations in any order.

**Example 1:**
```
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

**Example 2:**
```
Input: digits = ""
Output: []
```

**Example 3:**
```
Input: digits = "2"
Output: ["a","b","c"]
```

**Constraints:**
- 0 <= digits.length <= 4
- digits[i] is a digit in the range ['2', '9']

## Approach

Each digit expands the set of partial results by however many letters it maps to, so this is a straightforward backtracking / cartesian-product problem. Handle the empty string up front as a special case since it should return an empty list, not a list containing an empty string.

Keep a running path of letters chosen so far. At each recursive step, look at the digit at the current index, loop over its mapped letters, append one, recurse on the next index, then pop it off before trying the next letter (the usual backtrack pattern). When the path length equals the number of digits, it's a complete combination — record a copy of it.

**Time complexity:** O(4^n * n) where n is the number of digits — at most 4 letters per digit (7 and 9 map to 4 letters each), and building/copying each string of length n takes O(n).

**Space complexity:** O(n) for the recursion depth and the current path, not counting the output.
