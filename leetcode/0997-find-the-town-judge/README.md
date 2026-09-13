# 997. Find the Town Judge

In a town of `n` people labeled 1 to `n`, there might be a judge, defined by two properties: the judge trusts nobody, and everybody else (all `n - 1` other people) trusts the judge. You're given `trust`, a list of pairs `[a, b]` meaning person `a` trusts person `b`. Return the judge's label if such a person exists and can be identified uniquely, otherwise return -1.

**Example 1:**
```
Input: n = 2, trust = [[1,2]]
Output: 2
```

**Example 2:**
```
Input: n = 3, trust = [[1,3],[2,3],[3,1]]
Output: -1
Explanation: Person 3 trusts someone (person 1), so person 3 can't be the judge.
```

**Example 3:**
```
Input: n = 3, trust = [[1,3],[2,3]]
Output: 3
```

**Constraints:**
- 1 <= n <= 1000
- 0 <= trust.length <= 10^4
- trust[i].length == 2
- All pairs of trust are distinct
- a_i != b_i
- 1 <= a_i, b_i <= n

## Approach

This is a net-degree trick on a directed "trusts" graph. For every person, track a single score: `score[person] = (number of people who trust them) - (number of people they trust)`. Each `[a, b]` pair decrements `score[a]` by 1 (a trusts someone, so a can't be the judge) and increments `score[b]` by 1 (someone trusts b).

The judge, if one exists, is exactly the person whose final score equals `n - 1` — trusted by everyone else (contributing `+1` from each of the other `n - 1` people) and trusting nobody (contributing 0 decrements). No other person can reach that score: anyone who trusts even one person gets at least one `-1`, capping their score below `n - 1`, and nobody can be trusted by more than `n - 1` people.

Scan all `n` scores after processing every trust pair; if exactly one person's score is `n - 1`, return them, otherwise return -1 (covers both "no judge" and, since the problem guarantees uniqueness when trust relationships are consistent, the case where nobody qualifies).

**Time complexity:** O(n + t) where t is the number of trust pairs — one pass to build scores, one pass to scan them.

**Space complexity:** O(n) for the score array.
