# 731. My Calendar II

Design a `MyCalendarTwo` class that can book events without ever allowing a **triple booking**. A double booking (two events overlapping) is fine, but if adding a new event would make any point in time overlap with three or more already-booked events, it must be rejected. An event is a half-open interval `[start, end)`. Implement:

- `MyCalendarTwo()` — initialize the calendar with no events booked.
- `boolean book(int start, int end)` — return `true` and add the event if it doesn't cause a triple booking, otherwise return `false` and don't add it.

**Example:**
```
Input:
["MyCalendarTwo", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]

Output:
[null, true, true, true, false, true, true]

Explanation:
MyCalendarTwo cal = new MyCalendarTwo();
cal.book(10, 20); // true
cal.book(50, 60); // true
cal.book(10, 40); // true, double books [10,20) with the first event, still fine
cal.book(5, 15);  // false, would triple book [10,15) (events 1, 3, and this one)
cal.book(5, 10);  // true, [5,10) doesn't overlap [10,20) since intervals are half-open
cal.book(25, 55); // true, double books [25,40) and [50,55) but never a triple
```

**Constraints:**
- 0 <= start < end <= 10^9
- At most 1000 calls to book

## Approach

Track two lists: `bookings` (every event that's been accepted) and `overlaps` (every region that's currently double-booked). When a new `[start, end)` request comes in:

1. Check it against `overlaps`. If it intersects any existing double-booked region, accepting it would push that region to a triple booking, so reject it (`return false`).
2. Otherwise, it's safe. For every existing booking in `bookings` that this new interval overlaps, add their intersection to `overlaps` — those regions are now double-booked because of this new event.
3. Add the new interval to `bookings` and return `true`.

The insight is that we don't need to track the exact overlap count everywhere, just where the count hits exactly 2, since anything trying to land inside an already-double-booked region is the only thing that can create a triple booking. New events that only single-book (or double-book fresh territory) are always safe to add.

**Time complexity:** O(n) per `book` call, O(n^2) for n total calls.

**Space complexity:** O(n) for the bookings and overlaps lists.
