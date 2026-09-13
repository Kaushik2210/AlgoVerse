# 1423. Maximum Points You Can Obtain from Cards

There are several cards arranged in a row, each with a number of points, given as `cardPoints`. In one step you can take one card from either the beginning or the end of the row. You must take exactly `k` cards total. Return the maximum total points you can get.

**Example 1:**
```
Input: cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12
Explanation: Take the last 3 cards: 1 + 6 + 5 = 12.
```

**Example 2:**
```
Input: cardPoints = [2,2,2], k = 2
Output: 4
```

**Example 3:**
```
Input: cardPoints = [9,7,7,9,7,7,9], k = 7
Output: 55
Explanation: Taking all 7 cards leaves nothing behind.
```

**Constraints:**
- 1 <= cardPoints.length <= 10^5
- 1 <= cardPoints[i] <= 10^4
- 1 <= k <= cardPoints.length

## Approach

Trying every combination of prefix-and-suffix picks directly is awkward — but flip the problem around. Whatever `k` cards you end up taking from the two ends, the cards you *leave behind* always form one single contiguous block in the middle, of size `n - k`. So maximizing the sum of the taken cards is the same as minimizing the sum of that leftover contiguous block, since the two sums always add up to the fixed total.

That turns it into a completely standard fixed-size sliding window problem: find the minimum-sum contiguous subarray of length `n - k` anywhere in `cardPoints`. Compute the sum of the first `window_size` elements, then slide one step at a time (add the incoming element, subtract the outgoing one), tracking the minimum window sum seen. The answer is `total - min_window`.

If `k == n` there's nothing left over, so the leftover window is empty and the answer is just the total.

**Time complexity:** O(n) — one pass to compute the total, one pass to slide the window.

**Space complexity:** O(1) — a running window sum and a couple of counters.
