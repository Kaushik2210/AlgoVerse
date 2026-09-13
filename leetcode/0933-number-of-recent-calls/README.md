# 933. Number of Recent Calls

Implement `RecentCounter`, which counts the number of requests within a certain time frame. `RecentCounter()` initializes with no requests. `ping(t)` is called with a timestamp `t` in milliseconds (calls to `ping` are made with strictly increasing `t`), adds a new request at time `t`, and returns the number of requests that have happened in the inclusive range `[t - 3000, t]`.

**Example:**
```
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // 1, requests = [1]
recentCounter.ping(100);   // 2, requests = [1, 100]
recentCounter.ping(3001);  // 3, requests = [1, 100, 3001]
recentCounter.ping(3002);  // 3, requests = [100, 3001, 3002], since 1 is now outside [2, 3002]
```

**Constraints:**
- 1 <= t <= 10^9
- Each test case calls ping with strictly increasing t values
- At most 10^4 calls to ping

## Approach

Since calls arrive with strictly increasing timestamps, a queue is a natural fit. Keep a queue of all timestamps seen so far. On each `ping(t)`: push `t` onto the back, then pop timestamps off the front while they're older than `t - 3000` (i.e. less than `t - 3000`), since increasing order guarantees anything still stale at the front stays stale and anything not stale hasn't been reached yet. After trimming, the queue's length is exactly the count of requests within the window, since everything left in it is within `[t - 3000, t]` by construction.

Each timestamp is pushed once and popped at most once across the whole run, so the amortized cost per call stays constant even though a single call could in theory pop many old entries.

**Time complexity:** O(1) amortized per `ping` call, O(n) total across n calls.

**Space complexity:** O(n) for the queue in the worst case (no timestamps ever expire within the 3000ms window).
