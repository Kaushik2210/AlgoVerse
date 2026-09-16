# 732. My Calendar III

**Commonly asked at:** Google

A `k`-booking happens when `k` events all share some point in time. Design a `MyCalendarThree` class that tracks events (each a half-open interval `[start, end)`) and, every time a new event is added, returns the maximum `k`-booking that exists across the whole calendar so far. Implement:

- `MyCalendarThree()` — initialize the calendar with no events booked.
- `int book(int start, int end)` — add the event and return the maximum `k` such that there's some point in time currently booked by `k` events.

**Example:**
```
Input:
["MyCalendarThree", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]

Output:
[null, 1, 1, 2, 3, 3, 3]

Explanation:
MyCalendarThree cal = new MyCalendarThree();
cal.book(10, 20); // 1
cal.book(50, 60); // 1
cal.book(10, 40); // 2, overlaps the first event
cal.book(5, 15);  // 3, [10,15) is now covered by 3 events
cal.book(5, 10);  // 3, doesn't raise the max
cal.book(25, 55); // 3, doesn't raise the max
```

**Constraints:**
- 0 <= start < end <= 10^9
- At most 400 calls to book

## Approach

Unlike My Calendar I and II, here we don't need to reject anything — every event is always added, and we just need to report the running maximum overlap. This is a sweep-line problem: represent every booking as two events, a `+1` at `start` and a `-1` at `end`, and keep them in a sorted map keyed by position.

Every time a new `[start, end)` comes in, add its `+1`/`-1` deltas into the map (accumulating if that position already has an entry). Then walk the map in key order, maintaining a running total of the deltas seen so far — that running total at any key is exactly how many events are active at that point in time — and track the maximum value seen during the walk. Return that maximum.

Since a sorted map (like Python's `SortedDict` or a balanced BST such as Java's `TreeMap`) keeps insertion O(log n), and each `book` call requires a full O(n) walk over all keys to recompute the max, this is O(n) per call, O(n^2) total — fine for the constraint of 400 calls. For much larger inputs, a segment tree with lazy propagation over the coordinate-compressed range would bring each query down to O(log n).

**Time complexity:** O(n log n) per `book` call (O(log n) to insert, O(n) to walk and recompute the max — dominated by the walk), O(n^2) for n total calls.

**Space complexity:** O(n) for the sorted map of delta events.
