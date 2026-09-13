# 1707. Maximum XOR With an Element From Array

You're given an array `nums` and a list of queries `queries`, where `queries[i] = [xi, mi]`. For each query, find the maximum value of `xi XOR nums[j]` over every `nums[j]` that is `<= mi`. If no element of `nums` is `<= mi`, the answer for that query is `-1`. Return the answers in the same order as the queries.

**Example 1:**
```
Input: nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
Output: [3,3,7]
Explanation: query 0 (x=3, m=1): nums <= 1 are [0,1], best is 3^0=3. query 1 (x=1, m=3): nums <= 3 are [0,1,2,3], best is 1^2=3. query 2 (x=5, m=6): all of nums qualifies, best is 5^2=7.
```

**Example 2:**
```
Input: nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]
Output: [15,-1,5]
Explanation: query 1 has no nums <= 1, so its answer is -1.
```

**Constraints:**
- 1 <= nums.length, queries.length <= 10^5
- queries[i].length == 2
- 0 <= nums[j], xi, mi <= 10^9

## Approach

Answering one query with a single scan is O(n), and doing that for every query is O(n * q) — too slow at 10^5 each. The usual trick for "max XOR with something in a set" is a binary trie over bit representations: insert numbers bit by bit from the most significant bit down, and to find the best XOR partner for `x`, walk the trie greedily always preferring the branch that's the *opposite* bit of `x` at each level (since XOR wants mismatched bits to maximize the result), falling back to the same-bit branch only if the opposite one doesn't exist.

The wrinkle here is the `<= mi` constraint — every query only "sees" a filtered subset of `nums`. Handling that per query with a fresh trie build would be wasteful, so instead process queries offline: sort `nums` ascending, sort the queries by their limit `mi` ascending too, then walk through the queries in that order while incrementally inserting every number `<= mi` into the trie as `mi` grows. Because `mi` only increases as we advance through the sorted query order, once a number has been inserted it stays valid for every later query — nothing ever needs to be removed. If the trie is still empty when a query comes up (no `nums[j] <= mi` yet), its answer is `-1`; otherwise query the trie for the max XOR with `xi` and record the answer at the query's original index before moving on.

**Time complexity:** O((n + q) log(maxVal)) — sorting nums and queries is O(n log n + q log q), and each number is inserted once (O(30) bits) while each query does one O(30)-bit trie walk.

**Space complexity:** O(n * 30) in the worst case for the trie nodes, plus O(q) for the sorted query order and answer array.
