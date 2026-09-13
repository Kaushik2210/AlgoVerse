# 1396. Design Underground System

*Note: this problem is LeetCode Premium — the description below is reconstructed from the public problem statement for reference.*

Design an underground railway system that tracks customer travel times between stations. Implement `UndergroundSystem` with:
- `checkIn(id, stationName, t)`: a customer with a given card `id` checks in at `stationName` at time `t`.
- `checkOut(id, stationName, t)`: the same customer checks out at `stationName` at time `t`.
- `getAverageTime(startStation, endStation)`: returns the average time it takes to travel from `startStation` to `endStation`, averaged across every completed trip recorded between that specific pair, in the order the trips happened.

It's guaranteed that a customer checks in and out in valid pairs (no double check-ins), and `getAverageTime` is only called for a station pair that has at least one completed trip.

**Example:**
```
checkIn(45, "Leyton", 3)
checkIn(32, "Paradise", 8)
checkIn(27, "Leyton", 10)
checkOut(45, "Waterloo", 15)   // 45 traveled Leyton -> Waterloo in 15 - 3 = 12
checkOut(27, "Waterloo", 20)   // 27 traveled Leyton -> Waterloo in 20 - 10 = 10
checkOut(32, "Cambridge", 22)  // 32 traveled Paradise -> Cambridge in 22 - 8 = 14
getAverageTime("Leyton", "Waterloo")   // (12 + 10) / 2 = 11.0
getAverageTime("Paradise", "Cambridge") // 14 / 1 = 14.0
checkIn(10, "Leyton", 24)
getAverageTime("Leyton", "Waterloo")   // still 11.0, the new check-in hasn't checked out yet
checkOut(10, "Waterloo", 38)           // 10 traveled Leyton -> Waterloo in 38 - 24 = 14
getAverageTime("Leyton", "Waterloo")   // (12 + 10 + 14) / 3 = 12.0
```

**Constraints:**
- 1 <= id, t <= 10^6
- 1 <= stationName.length, startStation.length, endStation.length <= 10
- All strings consist of uppercase, lowercase letters, and digit characters
- At most 2 * 10^4 calls total to checkIn, checkOut, and getAverageTime

## Approach

This is a pure bookkeeping problem — two hash maps do all the work.

The first map tracks in-progress trips: customer `id` -> `(stationName, t)` recorded at check-in. When that same customer checks out, look up and remove their check-in record to recover the start station and start time, compute the elapsed time as `checkOutTime - checkInTime`, and file it away.

The second map aggregates completed trips by route: the key is the `(startStation, endStation)` pair, and the value is a running `(totalTime, count)`. On every checkout, add the elapsed time to the pair's running total and bump its count. `getAverageTime` then just divides the stored total by the stored count for the requested pair — no need to keep a list of every individual trip time, since only the average is ever asked for, and totals/counts are enough to compute that incrementally.

**Time complexity:** O(1) average per operation — all three methods do a constant number of hash map lookups/updates.

**Space complexity:** O(c + r) where c is the number of concurrently checked-in customers (bounded by in-progress check-ins) and r is the number of distinct station-pair routes seen so far.
