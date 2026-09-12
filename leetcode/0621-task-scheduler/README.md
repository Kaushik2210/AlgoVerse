# 621. Task Scheduler

You're given an array of CPU tasks `tasks`, where each element is a letter representing a task type, and an integer `n` representing a mandatory cooldown: the same task type can't run again until at least `n` other units of time (running a different task, or idling) have passed. Return the minimum total time needed to finish all tasks.

**Example 1:**
```
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A -> B -> idle -> A -> B -> idle -> A -> B
```

**Example 2:**
```
Input: tasks = ["A","C","A","B","D","B"], n = 1
Output: 6
Explanation: Enough variety to schedule back-to-back with no idle time needed.
```

**Example 3:**
```
Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation: No cooldown needed, tasks run back-to-back.
```

**Constraints:**
- 1 <= tasks.length <= 10^4
- n >= 0

## Approach

The busiest task type — the one with the highest count — sets the overall shape of the schedule. Picture laying out slots for that task with the required cooldown gap between each occurrence: if it appears `max_count` times, that creates `max_count - 1` gaps, each of size `n + 1` (one slot for the task itself, plus `n` cooldown slots after it), followed by one final slot for the very last occurrence.

Every other task type gets slotted into those cooldown gaps wherever possible. As long as there's still room in the gaps, the frame `(max_count - 1) * (n + 1) + max_count` is exactly how long the whole schedule takes, because the gaps can absorb all the other tasks without needing extra idle time.

There's a wrinkle: if *multiple* task types are tied for the maximum count, all of them need a slot in that very last group too (since none of them can be scheduled earlier than the last "round" without violating their own cooldown). So the final term isn't just 1, it's `num_max` — the count of task types tied for the max.

But if there are enough distinct tasks to fill every gap with no idle time left over, the frame formula can actually undercount — in that case the real answer is just `len(tasks)`, since you can never finish faster than running every task at least once. So the answer is `max(frame, len(tasks))`.

**Time complexity:** O(m) where m is the number of distinct task types (bounded by 26 letters) plus O(len(tasks)) to build the frequency count.

**Space complexity:** O(1) — the frequency counter holds at most 26 entries.
