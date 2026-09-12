# 901. Online Stock Span

Design an algorithm that collects daily stock price quotes and returns the **span** of the stock's price for the current day. The span is the maximum number of consecutive days (starting from today and going backward) for which the price was less than or equal to today's price.

Implement the `StockSpanner` class:
- `StockSpanner()` — initializes the object.
- `int next(int price)` — gives the price of the stock on the current day, returns the span of that stock's price for the current day.

**Example:**
```
Input:
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]

Output:
[null, 1, 1, 1, 2, 1, 4, 6]

Explanation:
StockSpanner spanner = new StockSpanner();
spanner.next(100); // 1
spanner.next(80);  // 1, since 80 <= 100 didn't extend anything before it started dropping
spanner.next(60);  // 1
spanner.next(70);  // 2, 70 >= 60 (yesterday) but 70 < 80, so span covers [70, 60]
spanner.next(60);  // 1
spanner.next(75);  // 4, 75 >= 60, 70, 60, but 75 < 80, span covers [75, 60, 70, 60]
spanner.next(85);  // 6, 85 >= everything back to (but not including) 100
```

**Constraints:**
- 1 <= price <= 10^5
- At most 10^4 calls to next
- Total calls to next will be less than or equal to 10^4

## Approach

Recomputing the span from scratch on every call by scanning backward would be O(n) per call, O(n^2) overall. A **monotonic stack of (price, span) pairs** amortizes this to O(1) per call.

Keep a stack where prices are strictly decreasing from bottom to top (so the top of the stack is always the most recent day that hasn't yet been "absorbed" by a later, bigger-or-equal price). When `next(price)` is called:

- Start `span = 1` (today counts as part of its own span).
- While the stack isn't empty and its top's price is `<= price`, pop it and add its stored span to `span` — that previous day (and everything it had already absorbed) is now covered by today's price too, since today reaches at least as far back.
- Push `(price, span)` onto the stack.
- Return `span`.

The trick is that each popped entry already carries the count of everything *it* absorbed earlier, so absorbing it transfers that whole run of days in O(1) instead of re-walking them. Every day's price is pushed once and popped at most once across the object's lifetime, so the total work over all `next` calls stays linear.

**Time complexity:** O(1) amortized per `next` call (O(n) total across n calls).

**Space complexity:** O(n) for the stack in the worst case (strictly increasing prices never get popped).
