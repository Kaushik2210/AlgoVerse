# 990. Satisfiability of Equality Equations

**Commonly asked at:** Google, Amazon

You're given an array of strings `equations`, each of the form `"xi==yi"` or `"xi!=yi"` where `xi` and `yi` are single lowercase letters. Return `true` if it's possible to assign integer values to the variables satisfying all the equations simultaneously.

**Example 1:**
```
Input: equations = ["a==b","b!=a"]
Output: false
Explanation: if a==b then a!=b can never hold.
```

**Example 2:**
```
Input: equations = ["b==a","a==b"]
Output: true
```

**Example 3:**
```
Input: equations = ["a==b","b==c","a==c"]
Output: true
```

**Constraints:**
- 1 <= equations.length <= 500
- equations[i].length == 4
- equations[i][0] and equations[i][3] are lowercase letters
- equations[i][1] is either '=' or '!'
- equations[i][2] is '='

## Approach

Equality is transitive — if `a==b` and `b==c` are both asserted, then `a==c` is forced too, whether or not it's explicitly written. That transitivity is exactly what union-find groups (equivalence classes) model directly: two variables in the same group must be equal.

Process the equations in two passes:
1. **All the `==` equations first**: for each one, union the two variables' groups together. After this pass, every variable's group represents the full set of variables forced to be equal to it by the chain of `==` assertions.
2. **Then all the `!=` equations**: for each one, check whether the two variables ended up in the *same* group. If they did, the constraints are contradictory — some chain of `==` equations forces them equal, but this equation demands they differ, which is impossible. Return false immediately. If none of the `!=` equations trip this check, every constraint can be satisfied (just assign a distinct fresh integer to each remaining group), so return true.

Doing the `==` pass fully before checking any `!=` equation matters: equality groups can only be discovered by processing `==` equations, and a `!=` check needs the *complete* picture of who's forced equal to whom, not a partial one built up equation-by-equation in the original mixed order.

With only 26 lowercase letters possible, the union-find can be sized as a fixed 26-element array rather than dynamically per input.

**Time complexity:** O(n * α(26)) where n is the number of equations — each union/find operation is effectively O(1) with path compression, since the domain size (26) is a constant.

**Space complexity:** O(26) = O(1) for the union-find parent array.
