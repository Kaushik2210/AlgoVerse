# 362. Design Hit Counter

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway because "sliding window over a stream of timestamps" is a very common systems-flavored interview question.*

Design a hit counter that counts the number of hits received in the past 5 minutes (300 seconds).

- `HitCounter()` — initializes the object.
- `void hit(int timestamp)` — records a hit at `timestamp` (in seconds). Several hits may happen at the same timestamp.
- `int getHits(int timestamp)` — returns the number of hits in the past 5 minutes, i.e. the window `[timestamp - 300 + 1, timestamp]`.

Calls to `hit` and `getHits` are made with `timestamp` monotonically increasing (never decreasing) across all calls.

**Example:**
```
Input:
["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]
[[], [1], [2], [3], [4], [300], [300], [301]]

Output:
[null, null, null, null, 3, null, 4, 3]

Explanation:
HitCounter counter = new HitCounter();
counter.hit(1);         // hit at timestamp 1
counter.hit(2);         // hit at timestamp 2
counter.hit(3);         // hit at timestamp 3
counter.getHits(4);     // get hits at timestamp 4, return 3 (hits at 1,2,3 all within [1,300]... window is [-296,4])
counter.hit(300);       // hit at timestamp 300
counter.getHits(300);   // window is [1,300], all 4 hits count, return 4
counter.getHits(301);   // window is [2,301], hit at 1 is now outside, return 3
```

**Constraints:**
- 1 <= timestamp <= 2 * 10^9
- All calls to hit are made with strictly increasing timestamps
- 0 <= timestamp - last timestamp of hit <= 2 * 10^9
- At most 300 calls total to hit and getHits

**Follow-up:** What if the number of hits per second could be huge? Does your design scale?

## Approach

The simplest structure that works well here is a **queue of timestamps**, one entry per hit (or `(timestamp, count)` pairs if hits at the same instant are batched, which matters for the follow-up).

- `hit(timestamp)`: enqueue the timestamp.
- `getHits(timestamp)`: before counting, evict everything from the *front* of the queue whose timestamp is older than `timestamp - 300` (i.e., falls outside `[timestamp - 299, timestamp]`) — since timestamps only ever increase, the queue is naturally sorted, so anything that needs evicting is always at the front, never buried in the middle. After evicting, the queue's length is the answer.

Because timestamps across calls are non-decreasing, once a timestamp is evicted from the front it will never need to be checked again — each hit is enqueued once and dequeued at most once, so the total eviction work across all calls is bounded by the total number of hits, not the number of `getHits` calls times the window size.

**Follow-up (huge hits per second):** storing one entry per individual hit wastes space when a single timestamp can have millions of hits. Instead store `(timestamp, count)` pairs — if the current hit's timestamp matches the queue's most recent entry, just increment that entry's count instead of pushing a new one. `getHits` then sums the counts of whatever remains after evicting stale entries (or keeps a running total adjusted incrementally on evict/insert to avoid re-summing every call).

**Time complexity:** O(1) amortized for `hit` (O(1) always) and `getHits` (each timestamp is evicted at most once across all calls, so total eviction work is O(n) over n hits).

**Space complexity:** O(n) in the worst case, where n is the number of hits within any 300-second window (or O(1) amortized per distinct timestamp with the counted-pair variant).
