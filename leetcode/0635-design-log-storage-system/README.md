# 635. Design Log Storage System

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-worked test cases at multiple granularities.

Design a log storage system that stores logs by `(id, timestamp)` and can retrieve log ids within a time range at a given precision:

- `LogSystem()` — initializes the object.
- `void put(int id, String timestamp)` — stores a log with the given id and timestamp, formatted `"Year:Month:Day:Hour:Minute:Second"` (e.g. `"2017:01:01:23:59:59"`).
- `List<Integer> retrieve(String start, String end, String granularity)` — returns the ids of every log whose timestamp falls within `[start, end]` inclusive, where `granularity` (one of `"Year"`, `"Month"`, `"Day"`, `"Hour"`, `"Minute"`, `"Second"`) says how precise the comparison should be — anything finer than the given granularity is ignored entirely, as if it were rounded away.

**Example:**
```
Input:
["LogSystem", "put", "put", "put", "retrieve", "retrieve"]
[[], [1, "2017:01:01:23:59:59"], [2, "2017:01:01:22:59:59"], [3, "2016:01:01:00:00:00"],
 ["2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year"],
 ["2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour"]]

Output:
[null, null, null, null, [1, 2, 3], [1, 2]]

Explanation:
LogSystem logSystem = new LogSystem();
logSystem.put(1, "2017:01:01:23:59:59");
logSystem.put(2, "2017:01:01:22:59:59");
logSystem.put(3, "2016:01:01:00:00:00");

// granularity "Year" only compares the year field, so the whole range 2016-2017 matches all three
logSystem.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year");  // [1, 2, 3]

// granularity "Hour" compares year:month:day:hour -- log 3 is 2016:01:01:00, which is
// earlier than the start bound's 2016:01:01:01, so it falls out of range
logSystem.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour"); // [1, 2]
```

**Constraints:**
- 1 <= id <= 500
- 2000 <= Year <= 2017
- 1 <= Month <= 12
- 1 <= Day <= 28 (the month has valid dates)
- 0 <= Hour <= 23
- 0 <= Minute, Second <= 59
- granularity is one of "Year", "Month", "Day", "Hour", "Minute", or "Second"
- At most 500 calls total will be made to `put` and `retrieve`

## Approach

The key trick to "ignore anything finer than the given granularity" is to realize a timestamp is naturally a 6-field tuple `(year, month, day, hour, minute, second)`, and comparing two timestamps at a coarser granularity is exactly the same as comparing only a **prefix** of that tuple. `"Year"` granularity compares just `(year,)`, `"Hour"` granularity compares `(year, month, day, hour)`, and so on — this is ordinary lexicographic tuple comparison, truncated to however many fields the requested granularity covers.

**`put(id, timestamp)`** just parses the colon-separated string into a 6-element integer array and appends `(id, parts)` to a flat list — no indexing structure needed given the small constraints (at most 500 logs, 500 calls total).

**`retrieve(start, end, granularity)`** parses `start` and `end` into their own 6-element arrays, then figures out how many leading fields to compare based on the granularity (`"Year"` -> compare 1 field, `"Second"` -> compare all 6). For every stored log, truncate its parsed timestamp to that many fields and check whether it's lexicographically between the truncated `start` and `end` — Python's native list/tuple comparison already does exactly this ordering, so `start_parts <= truncated <= end_parts` is the entire check; the Java/C++ versions replicate it with an explicit field-by-field comparison function.

Given the tiny constraints (<=500 total calls), a full linear scan per `retrieve` call is simple and plenty fast — there's no need for anything like a sorted index or trie keyed by timestamp prefix that a much larger log volume might call for.

**Time complexity:** O(1) for `put`. O(n) for `retrieve`, where n is the number of logs stored so far — each does a single truncated tuple comparison against both bounds.

**Space complexity:** O(n) to store all logs, where n is the total number of `put` calls.
