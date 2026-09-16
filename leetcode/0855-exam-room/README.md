# 855. Exam Room

**Commonly asked at:** Google, Amazon

There are `n` seats numbered `0` to `n - 1` in a row. Implement `ExamRoom`:
- `ExamRoom(int n)` initializes the room with `n` seats, all empty.
- `int seat()` a student enters and sits in the seat that maximizes the distance to the closest occupied seat (if there are multiple such seats, pick the one with the smallest number; if the room is empty, seat 0). Returns the seat number they sat in.
- `void leave(int p)` the student sitting at seat `p` leaves.

**Example:**
```
Input:
["ExamRoom", "seat", "seat", "seat", "seat", "leave", "seat"]
[[10], [], [], [], [], [4], []]
Output:
[null, 0, 9, 4, 2, null, 5]
Explanation:
ExamRoom(10) -> room of 10 seats, all empty
seat() -> 0 (empty room, sit at seat 0)
seat() -> 9 (farthest from seat 0 is the last seat)
seat() -> 4 (the midpoint of the gap between seats 0 and 9)
seat() -> 2 (the midpoint of the gap between seats 0 and 4)
leave(4) -> seat 4 becomes empty
seat() -> 5 (the midpoint of the gap between seats 2 and 9)
```

**Constraints:**
- 1 <= n <= 10^9
- It's guaranteed there's at least one empty seat when seat() is called
- p will be an integer that's currently occupied when leave(p) is called
- At most 10^4 calls total will be made to seat() and leave()

## Approach

The key insight is that the best next seat is always in the middle of the *largest gap* between two occupied seats — a candidate spot's "distance to the nearest neighbor" is exactly half the gap it sits inside. The two ends of the row are special cases: seat 0 only has one neighbor (the first occupied seat), so its effective distance is the full gap rather than half of it — same for the last seat relative to the last occupied one. Treating the two ends as if they were "gaps of double width" makes them naturally fold into the same reasoning as the middle gaps.

Maintain the occupied seats in a sorted list (Python's `bisect` module keeps insertions and removals ordered without a full re-sort each time). For `seat()`: check the gap from the row's start to the first occupied seat, check the gap from the last occupied seat to the row's end, and check every gap between two consecutive occupied seats, computing the resulting distance and candidate seat for each. Take whichever candidate has the largest distance (the "check from the start first" ordering naturally breaks ties toward the smallest seat number, since equal-or-worse gaps found later never overwrite the current best). Insert the chosen seat into the sorted list.

For `leave(p)`: binary search for `p` in the sorted list and remove it.

**Time complexity:** O(k) per `seat()` call, where k is the number of currently occupied seats (scanning all gaps), plus O(log k) for the sorted insert. O(log k) per `leave()` call for the binary search removal (the removal itself is O(k) due to list shifting, but this is fine given the 10^4 call cap).

**Space complexity:** O(k) for the sorted list of occupied seats.
