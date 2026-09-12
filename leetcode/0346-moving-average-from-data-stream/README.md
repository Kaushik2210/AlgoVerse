# 346. Moving Average from Data Stream

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway because "fixed-size sliding window over a stream" is a fundamental pattern that comes up constantly in interviews.*

Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window, starting from the last `size` values added (or fewer, if fewer than `size` values have been added so far). Implement the `MovingAverage` class:

- `MovingAverage(int size)` — initializes the object with the size of the window.
- `double next(int val)` — returns the moving average of the last `size` values of the stream, after appending `val`.

**Example:**
```
Input:
["MovingAverage", "next", "next", "next", "next"]
[[3], [1], [10], [3], [5]]

Output:
[null, 1.0, 5.5, 4.66667, 6.0]

Explanation:
MovingAverage m = new MovingAverage(3);
m.next(1);  // window [1], average 1.0
m.next(10); // window [1,10], average 5.5
m.next(3);  // window [1,10,3], average 4.66667
m.next(5);  // window [10,3,5] (1 fell out), average 6.0
```

**Constraints:**
- 1 <= size <= 1000
- -10^5 <= val <= 10^5
- At most 10^4 calls to next

## Approach

The naive approach recomputes the sum of the current window from scratch every call, which is O(size) per `next`. Instead, maintain a **queue holding at most `size` values** plus a running `total` sum, so each call only does O(1) work.

- `next(val)`: append `val` to the queue and add it to `total`. If the queue now holds more than `size` elements, pop the oldest one off the front and subtract it from `total` — this keeps the queue exactly matching "the last `size` values seen" (or fewer, early on). Return `total / len(queue)`.

Because insertion happens at the back and eviction happens at the front, and the window size is fixed, a plain FIFO queue with a running sum is all that's needed — no need to re-sum the whole window on every call.

**Time complexity:** O(1) per `next` call.

**Space complexity:** O(size) for the queue.
