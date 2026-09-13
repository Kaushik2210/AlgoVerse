# 1052. Grumpy Bookstore Owner

There's a bookstore where `customers[i]` customers arrive during the `i`-th minute, and `grumpy[i]` is 1 if the owner is grumpy during that minute (those customers leave unsatisfied) or 0 if the owner is not grumpy (those customers are satisfied). The owner has one special technique that keeps them from being grumpy for `minutes` consecutive minutes, but it can only be used once. Return the maximum number of customers that can be satisfied throughout the day.

**Example 1:**
```
Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
Output: 16
Explanation: The already-satisfied customers total 1+1+1+7 = 10 (minutes 0, 2, 4, 6). Using the technique on the last 3 minutes additionally wins over customers[5]=1 and customers[7]=5, for 10+1+5 = 16.
```

**Example 2:**
```
Input: customers = [4,10,10], grumpy = [1,1,0], minutes = 2
Output: 24
Explanation: Use the technique on the first 2 minutes, satisfying everyone: 4+10+10 = 24.
```

**Constraints:**
- n == customers.length == grumpy.length
- 1 <= minutes <= n <= 2 * 10^4
- 0 <= customers[i] <= 1000
- grumpy[i] is 0 or 1

## Approach

Split the customers into two groups: the ones who are already satisfied no matter what (those arriving during non-grumpy minutes), and the ones who are only satisfied if the special technique happens to cover their minute (those arriving during grumpy minutes). The already-satisfied total is a fixed baseline you can compute in one pass — it doesn't depend on where the technique is used.

The only decision is which `minutes`-length window to apply the technique to, and the best choice is whichever window recovers the most otherwise-lost customers — i.e. the window covering the grumpy minutes with the largest sum of `customers[i]`. That's a fixed-size sliding window: sum up the "would-be-lost" customers (customers[i] where grumpy[i] == 1) in the first `minutes` minutes, then slide one step at a time — add the incoming grumpy-minute customers, remove the outgoing grumpy-minute customers — tracking the best sum seen.

The answer is just the fixed baseline plus the best recoverable window, since a non-grumpy minute contributes 0 to the recoverable sum anyway and doesn't affect what gets added by sliding through it.

**Time complexity:** O(n) — one pass for the baseline, one pass for the sliding window.

**Space complexity:** O(1) — a running sum and a couple of counters.
