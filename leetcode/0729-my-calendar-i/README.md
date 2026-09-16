# 729. My Calendar I

**Commonly asked at:** Google, Amazon

Design a `MyCalendar` class to book events without double-booking. An event is a half-open interval `[start, end)`. A new event can be added if it doesn't overlap with any already-booked event. Implement:

- `MyCalendar()` — initialize the calendar with no events booked.
- `boolean book(int start, int end)` — return `true` and add the event to the calendar if it can be booked without conflicting with any existing event, otherwise return `false` and don't add it.

**Example:**
```
Input:
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]

Output:
[null, true, false, true]

Explanation:
MyCalendar cal = new MyCalendar();
cal.book(10, 20); // true, calendar: [10,20)
cal.book(15, 25); // false, overlaps [10,20) between 15 and 20
cal.book(20, 30); // true, [20,30) starts exactly where [10,20) ends, no overlap
```

**Constraints:**
- 0 <= start < end <= 10^9
- At most 1000 calls to book

## Approach

Keep a simple list of booked `(start, end)` intervals. For each new booking request, check it against every existing interval: two half-open intervals `[s1, e1)` and `[s2, e2)` overlap exactly when `s1 < e2 and s2 < e1`. If none of the existing intervals overlap the new one, add it to the list and return `true`; otherwise return `false`.

With up to 1000 calls, the O(n) scan per booking (O(n^2) total) is fast enough and keeps the code simple. A faster approach would keep the intervals in a sorted structure (like a balanced BST or a `TreeMap` keyed by start time) so each booking only needs to check its immediate neighbors in O(log n), but it's not necessary at this scale — later variants (My Calendar II, III) push the requirements further and reward the extra structure.

**Time complexity:** O(n) per `book` call, O(n^2) for n total calls.

**Space complexity:** O(n) to store the booked intervals.
