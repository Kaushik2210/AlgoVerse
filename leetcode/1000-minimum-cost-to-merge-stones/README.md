# 1000. Minimum Cost to Merge Stones

There are `n` piles of stones arranged in a row, with the `i`-th pile holding `stones[i]` stones. In one move you pick exactly `k` **consecutive** piles and merge them into a single new pile, and the cost of that move equals the total number of stones across those `k` piles (the merged pile's size is added to your running cost, and those piles are replaced by one pile holding the sum). Return the minimum total cost to merge all piles into one pile, or `-1` if it's impossible.

**Example 1:**
```
Input: stones = [3, 2, 4, 1], k = 2
Output: 20
Explanation: merge [3,2] -> [5,4,1] (cost 5), merge [4,1] -> [5,5] (cost 5), merge [5,5] -> [10] (cost 10). Total 5+5+10 = 20.
```

**Example 2:**
```
Input: stones = [3, 2, 4, 1], k = 3
Output: -1
Explanation: there's no way to merge these 4 piles down to 1 pile taking exactly 3 at a time.
```

**Example 3:**
```
Input: stones = [3, 5, 1, 2, 6], k = 3
Output: 25
```

**Constraints:**
- 1 <= n <= 30
- 2 <= k <= 30
- 1 <= stones[i] <= 100

## Approach

Start with the question the examples are hinting at: why is example 2 impossible? Every merge takes exactly `k` piles and turns them into 1, so each merge shrinks the total pile count by exactly `k - 1`. Starting from `n` piles, after `m` merges you have `n - m*(k-1)` piles. To ever reach exactly 1 pile, `n - 1` has to be reachable as a multiple of `k - 1`. With `n = 4, k = 3`, `n - 1 = 3` isn't a multiple of `k - 1 = 2`, so it's a hard `-1` no matter how you order the merges — this check has to happen up front, both for the whole array and for every sub-range the DP considers.

That gives the shape of the DP: `dp[i][j]` is the minimum cost to merge the sub-range `stones[i..j]` down as far as it can go. A range of length `L = j - i + 1` can only ever collapse all the way to **one** pile if `(L - 1) % (k - 1) == 0`; otherwise the best it can do is shrink down to `((L - 1) % (k - 1)) + 1` piles and stop there, because any leftover piles can't be merged with anything outside the range on their own. This is the extra wrinkle beyond a normal interval DP — `dp[i][j]` doesn't represent "cost to make one pile," it represents "cost to shrink this range as far as it can go without needing stones outside it," and only sometimes is that one pile.

To compute `dp[i][j]`, split the range at every point `mid` such that the left part `[i, mid]` can be fully collapsed to a single pile (walking `mid` in steps of `k - 1` starting at `i` guarantees this), and combine with `dp[mid+1][j]` for the rest:
```
dp[i][j] = min over mid of dp[i][mid] + dp[mid+1][j]
```
This finds the cheapest way to reduce `[i, j]` down to its minimal pile count. Then, separately, check whether the *whole* range `[i, j]` qualifies to become one final pile — if `(j - i) % (k - 1) == 0`, add the sum of the entire range as one more merge on top, since at that point all the remaining piles inside `[i, j]` (however many the split step left them shrunk down to — exactly `k` of them by construction) get folded into a single pile in one move.

Iterate by increasing range length so smaller sub-ranges are always ready before larger ones need them. The final answer is `dp[0][n-1]`, or `-1` if the range-level feasibility check already ruled it out.

**Time complexity:** O(n^3 / k) — O(n^2) sub-ranges, each trying O(n/k) split points.

**Space complexity:** O(n^2) for the DP table (plus O(n) for prefix sums).
