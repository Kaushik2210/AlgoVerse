# 241. Different Ways to Add Parentheses

Given a string `expression` of numbers and operators (`+`, `-`, `*`), return all possible results from computing all the different ways you could group numbers and operators using parentheses. Results may be returned in any order.

**Example 1:**
```
Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0
(2-(1-1)) = 2
```

**Example 2:**
```
Input: expression = "2*3-4*5"
Output: [-34,-14,-10,-10,10]
Explanation:
(2*(3-(4*5))) = -34
((2*3)-(4*5)) = -14
((2*(3-4))*5) = -10
(2*((3-4)*5)) = -10
(((2*3)-4)*5) = 10
```

**Constraints:**
- 1 <= expression.length <= 20
- expression consists of digits and `+`, `-`, `*`
- All integer values in the input are in the range [0, 99]

## Approach

The phrase "all the different ways to group with parentheses" is a strong hint to think recursively: any fully parenthesized expression has some operator that's applied *last* — the one at the outermost level — and everything to its left and right are themselves smaller expressions that got fully parenthesized first.

So for a given substring of the expression, try treating every operator in it as that "last" operator in turn. For each operator found at some position, recursively compute all possible results of the left substring and all possible results of the right substring, then combine every left result with every right result using that operator. Collect all of those combined values across every operator choice — that's the full answer for this substring.

The base case is a substring with no operators at all, meaning it's just a single number — its only possible result is itself.

Since the same substring can get recomputed many times across different recursive branches (e.g., splitting on different outer operators can both ask for the same inner substring), memoize by substring to avoid redundant work — this turns an otherwise exponential blow-up into something much more manageable given the small input size (at most 20 characters).

**Time complexity:** Exponential in the number of operators in the worst case (this is a Catalan-number-shaped problem — the number of ways to parenthesize n operators grows combinatorially), though memoization avoids recomputing identical substrings. Given the constraint of at most 20 characters, this stays fast in practice.

**Space complexity:** Proportional to the number of distinct substrings memoized, plus the recursion stack.
