# 135. Candy

There are `n` children standing in a line, each with a rating value given in `ratings`. You need to give each child at least one candy. Any child with a higher rating than either of their immediate neighbors must get more candy than that neighbor. Return the minimum total candies needed.

**Example 1:**
```
Input: ratings = [1, 0, 2]
Output: 5
Explanation: candies = [2, 1, 2]
```

**Example 2:**
```
Input: ratings = [1, 2, 2]
Output: 4
Explanation: candies = [1, 2, 1]. The third child gets 1 candy because it satisfies the
above two conditions (the third child's rating is not strictly greater than the second child's).
```

**Constraints:**
- n == ratings.length
- 1 <= n <= 2 * 10^4
- 0 <= ratings[i] <= 2 * 10^4

## Approach

The constraint only ever compares a child to its immediate left and right neighbor, so it helps to break it into two separate one-directional rules: "if you rate higher than the child to your left, you get more candy than them" and "if you rate higher than the child to your right, you get more candy than them." Each rule on its own is easy to satisfy with a single greedy pass.

Start everyone at 1 candy. Sweep left to right: whenever `ratings[i] > ratings[i-1]`, set `left[i] = left[i-1] + 1`. That pass alone satisfies the left-neighbor rule everywhere. Then sweep right to left the same way for the right-neighbor rule: whenever `ratings[i] > ratings[i+1]`, set `right[i] = right[i+1] + 1`.

Neither pass alone is enough, because a child might need to beat both neighbors at once (a local peak). So the final candy count for each child has to satisfy both rules simultaneously — take `max(left[i], right[i])` for every child, and sum it up. Taking the max works because each array already independently guarantees its own direction's constraint, and using the larger of the two never violates the other constraint (it only ever increases a count that was already valid, never decreases the other one).

**Time complexity:** O(n) — two linear passes plus a final summation pass.

**Space complexity:** O(n) — for the two auxiliary candy arrays (could be reduced to O(1) extra by combining passes cleverly, but O(n) is clear and standard).
