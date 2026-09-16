# 455. Assign Cookies

**Commonly asked at:** Amazon

Each child `i` has a greed factor `g[i]` — the minimum cookie size needed to satisfy them. Each cookie `j` has a size `s[j]`. A cookie can satisfy a child only if its size is at least the child's greed factor, and each child gets at most one cookie. Maximize the number of content children.

**Example 1:**
```
Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: only one cookie is big enough for the least greedy child (greed 1).
```

**Example 2:**
```
Input: g = [1,2], s = [1,2,3]
Output: 2
Explanation: give the size-1 cookie to the child with greed 1, and the size-2 (or 3) cookie to the child with greed 2.
```

**Constraints:**
- 1 <= g.length <= 3 * 10^4
- 0 <= s.length <= 3 * 10^4
- 1 <= g[i], s[j] <= 2^31 - 1

## Approach

To satisfy as many children as possible, it's wasteful to hand a large cookie to an easily-satisfied child when a smaller cookie could have done the job just as well — that large cookie might have been the only one big enough for a greedier child. So the greedy strategy is to always try satisfying the *least* greedy remaining child with the *smallest* cookie that could possibly work.

Sort both arrays ascending. Walk through cookies from smallest to largest with one pointer, and children from least to most greedy with another. For each cookie, check whether it's large enough for the current least-greedy unsatisfied child. If it is, that child is now satisfied — advance to the next child. Either way (satisfied or not), move to the next cookie, since a cookie that couldn't satisfy the least greedy remaining child certainly can't satisfy anyone greedier, and a cookie that did satisfy someone has been used up.

This greedy is optimal because giving the smallest sufficient cookie to the least greedy child never costs anything — any other cookie that could satisfy that child could equally satisfy the child that's about to receive a larger cookie, or fail to satisfy that greedier child anyway, so reserving bigger cookies for greedier children only helps.

**Time complexity:** O(n log n + m log m) for sorting both arrays, dominating the O(n + m) merge-style scan.

**Space complexity:** O(1) extra (ignoring the sort's own space).
