# 1419. Minimum Number of Frogs Croaking

Each frog makes exactly one full "croak" sound, which comes out letter by letter as `c`, `r`, `o`, `a`, `k` in that order, and different frogs can interleave their letters arbitrarily. Given the string of interleaved letters, return the minimum number of frogs needed to produce it, or `-1` if the string could never have come from any set of frogs croaking correctly.

**Example 1:**
```
Input: croakOfFrogs = "croakcroak"
Output: 1
Explanation: One frog croaks "croak" then croaks "croak" again.
```

**Example 2:**
```
Input: croakOfFrogs = "crcoakroak"
Output: 2
Explanation: The minimum needed is two frogs croaking at the same time.
```

**Example 3:**
```
Input: croakOfFrogs = "croakcrook"
Output: -1
Explanation: The letters "crook" cannot form "croak" for a frog.
```

**Constraints:**
- 1 <= croakOfFrogs.length <= 10^5
- croakOfFrogs consists of the characters 'c', 'r', 'o', 'a', 'k' only

## Approach

Think of each frog as sitting at one of five "stages" of its croak: after seeing `c` it's at stage 0, after `r` stage 1, and so on up through `k` at stage 4. Track `count[i]` = how many frogs are currently parked at stage `i`, waiting for the next letter of their own croak.

Process the string one character at a time:
- A `c` always starts a *new* frog (or reuses a free one, but for validity/counting purposes it's simplest to just say a `c` bumps `count[0]` and increases the number of "busy" frogs). Track the running total of busy frogs and record the peak — that peak is exactly the answer, since it's the maximum number of frogs that ever had to be active simultaneously.
- Any other letter must advance some frog that's sitting at the previous stage: if `count[i-1]` is zero, there's no frog available to make that sound next, so the string is invalid and we return -1. Otherwise move one frog from stage `i-1` to stage `i`.
- When a frog reaches `k` (stage 4), its croak is complete — it becomes free again, so it no longer counts toward "busy," though logically it can be reused as the next `c`.

At the end, every frog must have finished its croak: if any of stages 0 through 3 (`c`, `r`, `o`, `a`) still has frogs parked in it, some croaks were left incomplete, so return -1.

The minimum number of frogs needed is simply the highest number of frogs that were ever simultaneously mid-croak, which is exactly the peak of the "busy" counter tracked above — you never need more frogs than the largest number active at once, and you can't get away with fewer.

**Time complexity:** O(n) — a single linear pass over the string.

**Space complexity:** O(1) — a fixed-size array of 5 stage counters.
