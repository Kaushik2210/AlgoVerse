# 860. Lemonade Change

**Commonly asked at:** Amazon

Lemonade costs $5. Customers pay with a $5, $10, or $20 bill, in the order given by `bills`, and each expects exact change back (starting with no money in the till). Determine whether every customer can be given correct change.

**Example 1:**
```
Input: bills = [5,5,5,10,20]
Output: true
Explanation: change $5, $5, $5, ($5 back for the $10), then $15 back for the $20 (one $10 + one $5).
```

**Example 2:**
```
Input: bills = [5,5,10,10,20]
Output: false
Explanation: after two $5s and two $10s, there's no $5 left to make $15 change for the $20 (two $10 bills can't substitute for a $5).
```

**Constraints:**
- 1 <= bills.length <= 10^5
- bills[i] is 5, 10, or 20

## Approach

Only two denominations of change ever get handed out — $5 and $10 bills — since a $20 is never given as change and a customer's own bill isn't reusable as change for themselves. So the only state that matters is how many $5s and $10s are currently in the till; track just those two counts.

For a $5 payment, no change is needed — just add a $5 to the till. For a $10 payment, $5 change is needed, so there must be at least one $5 available; if so, use it and add the $10 to the till (a $10 can only ever be broken down as change using two $5s, never alone, so it's only useful later for a $20 payment). If no $5 is available, it's immediately impossible.

For a $20 payment, $15 change is needed, which can be made either as one $10 + one $5, or as three $5s. Prefer the first option when possible: a $10 bill is only useful for making $15 change (nothing else needs it), while $5 bills are the most flexible form of change (needed for both $10 and $20 payments) — so spending a $10 first conserves the more broadly useful $5s. Only fall back to three $5s if no $10 is available. If neither option is affordable, it's impossible.

**Time complexity:** O(n) — one pass through the bills, O(1) work per customer.

**Space complexity:** O(1) — just two counters.
