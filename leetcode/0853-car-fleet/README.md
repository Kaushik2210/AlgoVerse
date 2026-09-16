# 853. Car Fleet

**Commonly asked at:** Google, Uber

`n` cars are heading to the same destination `target` along a single-lane road. Each car has a starting `position` and constant `speed`. A car catches up to the car ahead of it, it can't pass — it just slows down and drives at the same speed as that car from then on, forming a "fleet" that stays together for the rest of the trip. Return the number of distinct fleets that will arrive at the destination.

**Example 1:**
```
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
Explanation: The cars starting at 10 and 8 become a fleet, meeting at 12. The car starting at 0 doesn't catch up to anyone. The cars starting at 5 and 3 become a fleet, meeting each other at 6.
```

**Example 2:**
```
Input: target = 10, position = [3], speed = [3]
Output: 1
```

**Constraints:**
- n == position.length == speed.length
- 1 <= n <= 10^5
- 0 <= target <= 10^6
- 0 <= position[i] < target
- All values of position are unique
- 0 < speed[i] <= 10^6

## Approach

Sort the cars by position, closest to the target first — this is the order in which they'll each finish the race if nothing slows them down. For each car (processed from closest to farthest), compute how long it would take to reach `target` on its own: `(target - position) / speed`.

Walk through the cars in that sorted order, keeping track of the arrival time of the fleet currently "in the lead" (the most recent car that couldn't be caught, or was itself the leader of a new fleet). For the next car (farther back): if its own solo arrival time is *greater* than the current leading fleet's arrival time, it's slower — it will never catch up, no matter how the road plays out, since anything ahead of it that's already committed to an earlier arrival time only gets there sooner. So it forms its own new fleet, and becomes the new "leader" reference point for everyone farther back.

If instead its solo time is *less than or equal to* the leading fleet's time, it would reach the target before (or at the same time as) the fleet ahead — but it can't pass, so it's forced to slow down and merge into that fleet, arriving at the same time as the leader instead. No new fleet is counted, and the leading time doesn't change.

Because cars are processed strictly from closest-to-target to farthest, each car only ever needs to compare itself against the fleet immediately "ahead" in this virtual sense — merges cascade backward for free without needing to explicitly track fleet membership.

**Time complexity:** O(n log n) for sorting by position; the single pass afterward is O(n).

**Space complexity:** O(n) for the sorted order (O(log n) if sorting in place is allowed to use less).
