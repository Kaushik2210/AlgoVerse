# 636. Exclusive Time of Functions

On a single-threaded CPU, `n` functions (numbered 0 to n-1) run, possibly nested via recursion. You're given `logs`, where each entry is formatted `"function_id:start_or_end:timestamp"`, sorted by timestamp. Each function has a `"start"` log right before it executes and an `"end"` log right after. A function can call itself recursively (nest). Return the exclusive time of each function — the sum of time spent purely inside that function, not counting time spent inside functions it called.

**Example 1:**
```
Input: n = 2, logs = ["0:start:0","1:start:2","1:end:5","0:end:6"]
Output: [3,4]
Explanation:
Function 0 starts at 0, then function 1 starts at 2, so function 0 ran for 2 units before pausing.
Function 1 runs from 2 to 5 (inclusive) - 4 units, then ends.
Function 0 resumes at 6 and ends at 6 - 1 unit.
Function 0's exclusive time: 2 + 1 = 3. Function 1's: 4.
```

**Example 2:**
```
Input: n = 2, logs = ["0:start:0","0:start:2","0:end:5","1:start:6","1:end:6","0:end:7"]
Output: [7,1]
```

**Constraints:**
- 1 <= n <= 100
- 1 <= logs.length <= 500
- 0 <= function_id < n
- 0 <= timestamp <= 10^9
- No two start events happen at the same timestamp
- No two end events happen at the same timestamp
- Each function has an "end" log for each "start" log

## Approach

Model the call sequence with a **stack of active call frames**, since function calls nest like parentheses — the currently running function is whatever's on top of the stack, and anything below it is paused waiting for it to return.

Keep a `prev_time` marking the last timestamp something was processed at. For each log entry:
- **"start"**: if the stack isn't empty, the function currently on top has been running uninterrupted from `prev_time` up to (but not including) this new start — add `current_time - prev_time` to its exclusive time. Then push the new `function_id` onto the stack, and set `prev_time = current_time` (the new function starts being timed from here).
- **"end"**: the function on top of the stack (which must be the one this "end" log refers to) has been running from `prev_time` through `current_time`, *inclusive* — add `current_time - prev_time + 1` to its exclusive time. Pop it off the stack (it's done), and set `prev_time = current_time + 1`, since the next unit of time belongs to whatever resumes next.

The `+1`/`-1` bookkeeping around "end" logs exists because timestamps are inclusive at both ends: a function that starts at 2 and ends at 5 occupied timestamps 2, 3, 4, 5 — that's `5 - 2 + 1 = 4` units, not 3.

Since only the function on top of the stack ever accumulates time on any given step, time spent inside nested calls is automatically excluded from whatever called them.

**Time complexity:** O(m) where m is the number of log entries — each is processed once.

**Space complexity:** O(n) for the stack (bounded by recursion depth) and O(n) for the result array.
