# 218. The Skyline Problem

A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return the skyline formed by these buildings collectively.

The geometric information of each building is given in the array `buildings` where `buildings[i] = [lefti, righti, heighti]`:
- `lefti` is the x coordinate of the left edge of the `i`th building.
- `righti` is the x coordinate of the right edge of the `i`th building.
- `heighti` is the height of the `i`th building.

The skyline should be represented as a list of "key points" sorted by their x-coordinate in the form `[[x1,y1],[x2,y2],...]`. Each key point is the left endpoint of some horizontal segment in the skyline except the last point in the list, which always has a y-coordinate of `0` and is used to mark the skyline's termination.

**Example 1:**
```
Input: buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
Output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
```

**Example 2:**
```
Input: buildings = [[0,2,3],[2,5,3]]
Output: [[0,3],[5,0]]
```

**Constraints:**
- 1 <= buildings.length <= 10^4
- 0 <= lefti < righti <= 2^31 - 1
- 1 <= heighti <= 2^31 - 1
- buildings is sorted by lefti in non-decreasing order.

## Approach

Sweep line, tracking the tallest active building at every x-coordinate that could matter. The skyline only changes at a building's left or right edge, so those are the only x-coordinates worth examining.

Collect every distinct left and right edge from all buildings, sorted ascending — these are the candidate "event" x-coordinates. Also sort the buildings themselves by their left edge so they can be pulled into consideration in order using a simple pointer.

Maintain a max-heap of `(-height, end)` for every building that has started but might not have ended yet. Rather than generating a separate "end" event and doing an O(log n) removal for the exact building that expired, use lazy deletion: pushed buildings just sit in the heap, and whenever the current maximum's `end` is `<= current x`, it's popped off (its right edge has passed, treating the right edge as exclusive — a building spans `[left, right)`).

For each candidate x-coordinate, in order:
1. Push every building whose left edge is `<= x` into the heap (advancing the pointer over the start-sorted list).
2. Pop from the heap any building whose right edge is `<= x` — it's no longer active.
3. The current skyline height at x is the tallest surviving building's height (or 0 if the heap is empty).
4. If that height differs from the last height recorded, `x` is a genuine key point — append `[x, height]`.

Processing starts (via the pointer sweep) *before* checking expirations at the same x ensures a building starting exactly where another ends is picked up before the old one is discarded, so a height-0 sentinel dip doesn't appear on the timeline. And because the tallest active building is always what determines the true skyline height, buildings entirely overshadowed by a taller one never contribute a key point — the heap naturally makes them invisible until the taller building expires.

**Time complexity:** O(n log n) — sorting the events and buildings is O(n log n), and each building is pushed and popped from the heap at most once, each O(log n).

**Space complexity:** O(n) for the heap, the sorted event list, and the output.
