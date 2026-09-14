# 1803. Count Pairs With XOR in a Range

You're given an integer array `nums` and two integers `low` and `high`. Return the number of pairs `(i, j)` with `0 <= i < j < nums.length` such that `low <= (nums[i] XOR nums[j]) <= high`.

**Example 1:**
```
Input: nums = [1, 4, 2, 7], low = 2, high = 6
Output: 6
Explanation: All pairs (0,1), (0,2), (0,3), (1,2), (2,3), (1,3) have a XOR value within the range.
```

**Example 2:**
```
Input: nums = [9, 8, 4, 2, 1], low = 5, high = 14
Output: 8
```

**Constraints:**
- 1 <= nums.length <= 2 * 10^4
- 1 <= nums[i] <= 2 * 10^4
- 1 <= low <= high <= 2 * 10^4

## Approach

Checking every pair directly is O(n^2), which is too slow at n up to 2*10^4 (up to ~2*10^8 pairs). Counting "XOR in range" is awkward directly, but counting "XOR less than some limit" is a much friendlier shape and it decomposes the range trick: pairs with `low <= xor <= high` is exactly `(pairs with xor < high + 1) - (pairs with xor < low)`.

So the real subproblem is: given a growing set of numbers, count pairs with `xor < limit` efficiently. Do this by inserting numbers one at a time into a binary trie (each number's bits from most significant to least, 15 bits since values are at most 2*10^4 < 2^15), where every trie node tracks how many numbers currently pass through it. Before inserting a new number `num`, walk the trie alongside the bits of `limit`:

- At each bit position, look at `num`'s bit and `limit`'s bit.
- If `limit`'s bit is 1: taking the trie branch matching `num`'s bit makes that XOR position 0, which is already less than 1 regardless of what comes after — so every number already sitting under that branch contributes to the count immediately. Then continue walking down the *other* branch (the one that keeps the XOR bit equal to `limit`'s bit, i.e. still tied), since equality has to keep holding for the comparison to still be undecided.
- If `limit`'s bit is 0: the XOR bit must also be 0 to have any chance of staying under `limit`, so just continue down the branch matching `num`'s bit — no count is added yet since it's still tied.

After querying, insert `num` into the trie, incrementing the counter on every node along its path so later numbers see it.

Verified against `nums=[1,4,2,7], low=2, high=6` -> 6 and `nums=[9,8,4,2,1], low=5, high=14` -> 8 (both match the known expected outputs), plus 200 randomized trials comparing against a brute-force O(n^2) pair scan — all matched exactly.

**Time complexity:** O(n * B) where B = 15 is the bit width — each of the n numbers does one O(B) query walk and one O(B) insert walk.

**Space complexity:** O(n * B) for the trie in the worst case (up to one new node per bit per number).
