# 1911. Maximum Alternating Subsequence Sum

**Commonly asked at:** Google, Meta

The alternating sum of a subsequence with elements `x0, x1, x2, ...` (in the order they appear) is `x0 - x1 + x2 - x3 + ...`. Given an integer array `nums`, return the maximum alternating sum of any subsequence of `nums` (the empty subsequence has alternating sum 0).

**Example 1:**
```
Input: nums = [4,2,5,3]
Output: 7
Explanation: The subsequence [4,2,5] has alternating sum 4 - 2 + 5 = 7, which is the largest possible.
```

**Example 2:**
```
Input: nums = [5,6,7,8]
Output: 8
Explanation: The best is to take a subsequence of just one element: [8].
```

**Example 3:**
```
Input: nums = [6,2,1,2,4,5]
Output: 10
Explanation: The subsequence [6,1,5] gives 6 - 1 + 5 = 10.
```

**Constraints:**
- 1 <= nums.length <= 10^5
- 1 <= nums[i] <= 10^5

## Approach

Track two running quantities as we scan left to right, each representing the best alternating sum achievable so far under a constraint on what kind of term would come *next*:
- `even`: the best alternating sum so far, assuming the *next* chosen element (if any) would be added (i.e., we're currently at an "even" position in the subsequence, 0-indexed — including the state of having chosen nothing yet).
- `odd`: the best alternating sum so far, assuming the *next* chosen element (if any) would be subtracted.

For each new number `x`, both states get a chance to improve, computed from the *old* `even`/`odd` values (not chained onto each other):
- `new_even = max(even, odd + x)` — either skip `x` and stay in the same state, or we were in the "next is added" state (`odd`, meaning our previous pick was a subtraction) and now add `x`, advancing us back to the "next is subtracted" state.
- `new_odd = max(odd, even - x)` — either skip `x`, or we were in the "next is subtracted" state (`even`) and now subtract `x`.

Both `even` and `odd` start at 0. Starting in the `even` state with value 0 represents having picked nothing yet and being free to add the very next element for free (0 + x0), which correctly captures that the first chosen element is always added.

At the end, `even` holds the answer, since the empty subsequence (sum 0) is a valid baseline and any subsequence that ends after an "add" step also lands in the `even`-tracked state (the state that permits stopping cleanly, since a subsequence can be of any length and doesn't need to end on a subtracted term).

**Time complexity:** O(n) — one pass, constant work per element.

**Space complexity:** O(1) extra space — just the two running values.
