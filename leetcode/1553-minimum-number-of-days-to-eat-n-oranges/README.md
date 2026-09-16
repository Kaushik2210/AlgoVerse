# 1553. Minimum Number of Days to Eat N Oranges

**Commonly asked at:** Google

There are `n` oranges. Each day you either eat one orange, or — if `n` is divisible by 2 — eat `n/2` oranges, or — if `n` is divisible by 3 — eat `2*n/3` oranges. Return the minimum number of days needed to eat all `n` oranges.

**Example 1:**
```
Input: n = 10
Output: 4
Explanation: One optimal sequence: eat 1 orange (9 left), eat 2n/3 = 6 oranges (3 left), eat 2n/3 = 2 oranges (1 left), eat the last orange. That's 4 days.
```

**Example 2:**
```
Input: n = 6
Output: 3
Explanation: One optimal sequence: eat n/2 = 3 oranges (3 left), eat 2n/3 = 2 oranges (1 left), eat the last orange. That's 3 days.
```

**Constraints:**
- 1 <= n <= 2 * 10^9

## Approach

`n` can be up to 2*10^9, so a straightforward DP over every integer from 0 to `n` is far too much memory and time. But the "eat half" and "eat two-thirds" moves only ever land on `n // 2` or `n // 3` — leftover remainders (`n % 2` or `n % 3`) have to be eaten one at a time first to make the division exact — so the set of values that ever actually get recursed into is tiny: starting from `n`, repeatedly dividing by 2 or 3 shrinks the value exponentially, visiting only O(log n) distinct "big" values along any one path, and O((log n)^2) distinct values overall across both branches (since each step is a mix of dividing by 2s and 3s). That makes memoized recursion on just those visited values both correct and fast.

Define `f(n)` = minimum days to eat down from `n` oranges to 0. Base cases: `f(0) = 0`, `f(1) = 1`. For larger `n`, two options:
- Eat oranges one at a time until `n` is divisible by 2, then take the halving move: costs `n % 2` single-eating days plus 1 halving day, landing at `f(n // 2)`.
- Same idea for 3: `n % 3` single-eating days plus 1 thirding day, landing at `f(n // 3)`.

So `f(n) = 1 + min(n % 2 + f(n // 2), n % 3 + f(n // 3))`. Memoize `f` (a hash map keyed by `n`, since `n` can be large and sparse — a plain array won't work) so each distinct value encountered is only computed once.

**Time complexity:** O((log n)^2) — the recursion only ever touches O((log n)^2) distinct values because each call roughly halves or thirds `n`.

**Space complexity:** O((log n)^2) for the memo table and recursion stack.
