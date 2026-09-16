# 1109. Corporate Flight Bookings

**Commonly asked at:** Amazon

There are `n` flights numbered from 1 to `n`. You're given a list of bookings, `bookings[i] = [firsti, lasti, seatsi]`, meaning `seatsi` seats were reserved on every flight from `firsti` to `lasti` inclusive. Return an array of length `n` giving the total seats reserved on each flight.

**Example 1:**
```
Input: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
Output: [10,55,45,25,25]
```

**Example 2:**
```
Input: bookings = [[1,2,10],[2,2,15]], n = 2
Output: [10,25]
```

**Constraints:**
- 1 <= n <= 2 * 10^4
- 1 <= bookings.length <= 2 * 10^4
- bookings[i].length == 3
- 1 <= firsti <= lasti <= n
- 1 <= seatsi <= 10^4

## Approach

This is Range Addition wearing a flight-booking costume — every booking says "add `seats` to every flight in this inclusive range," which is exactly what a difference array is built for.

Flight numbers are 1-indexed, so convert `firsti` to a 0-indexed position by subtracting 1. Add `seats` at `diff[first - 1]` (the reservation count steps up starting here) and subtract `seats` at `diff[last]` (it steps back down right after the range ends — note `last` is already the correct 0-indexed "one past the end" position since flights are 1-indexed).

Each booking is recorded in O(1). After processing every booking, one prefix-sum pass over `diff` reconstructs the actual seat count on each flight — the running sum at index `i` reflects exactly the bookings whose ranges still cover flight `i+1`.

**Time complexity:** O(n + bookings.length) — O(1) per booking to record, then one linear pass to reconstruct.

**Space complexity:** O(n) for the diff array (result array not counted as extra).
