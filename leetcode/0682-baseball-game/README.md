# 682. Baseball Game

**Commonly asked at:** Amazon, Google, Meta, Microsoft, Bloomberg

You're keeping score of a baseball game with unusual rules, given as a list of operations `ops`, one per round:
- An integer `x`: record a new score of `x`.
- `"+"`: record a score that's the sum of the previous two scores.
- `"D"`: record a score that's double the previous score.
- `"C"`: invalidate and remove the previous score.

Return the sum of all the scores on the record after applying all operations.

**Example 1:**
```
Input: ops = ["5","2","C","D","+"]
Output: 30
Explanation:
"5" -> record 5, scores = [5]
"2" -> record 2, scores = [5, 2]
"C" -> invalidate previous, scores = [5]
"D" -> record 2*5=10, scores = [5, 10]
"+" -> record 5+10=15, scores = [5, 10, 15]
Total = 5+10+15 = 30
```

**Example 2:**
```
Input: ops = ["1","C"]
Output: 0
```

**Constraints:**
- 1 <= ops.length <= 1000
- ops[i] is "C", "D", "+", or a string representing an integer in [-3 * 10^4, 3 * 10^4]
- For "+", there are at least two previous scores on the record
- For "C" and "D", there is at least one previous score on the record

## Approach

Every operation only ever looks at the most recent one or two scores, which is exactly what a stack is for. Process `ops` in order:
- If it's an integer, push it.
- If it's `"+"`, push the sum of the top two scores currently on the stack (without removing them — they stay on the record).
- If it's `"D"`, push double the top score.
- If it's `"C"`, pop the top score (it's invalidated and no longer on the record).

At the end, the sum of everything remaining on the stack is the answer.

**Time complexity:** O(n) — one pass over ops, O(1) work per operation.

**Space complexity:** O(n) for the stack.
