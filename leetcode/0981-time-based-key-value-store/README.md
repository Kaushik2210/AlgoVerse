# 981. Time Based Key-Value Store

**Commonly asked at:** Amazon, Google

Design a time-based key-value store. Implement `TimeMap` with:
- `set(key, value, timestamp)`: stores the given key-value pair at the given timestamp.
- `get(key, timestamp)`: returns the value associated with `key` set at the largest timestamp `<= timestamp`. If no such value exists, returns `""`.

**Example:**
```
set("foo", "bar", 1)
get("foo", 1)   // "bar"
get("foo", 3)   // "bar" (timestamp 1 is still the most recent one <= 3)
set("foo", "bar2", 4)
get("foo", 4)   // "bar2"
get("foo", 5)   // "bar2"
```

**Constraints:**
- 1 <= key.length, value.length <= 100
- 1 <= timestamp <= 10^7
- All timestamps `set` for the same key are strictly increasing
- At most 2 * 10^5 calls total to set and get

## Approach

Because timestamps for a given key are guaranteed to arrive in strictly increasing order, storing each key's history as a plain list (appending on every `set`) keeps that list naturally sorted by timestamp for free — no extra sorting step needed.

`get` then reduces to: find the largest timestamp in this key's list that is `<= timestamp`, i.e. binary search for the rightmost qualifying entry. Do a standard binary search over the list: whenever the midpoint's timestamp is `<= timestamp`, it's a candidate answer — record its value and try to find an even later qualifying entry by searching the right half. Whenever the midpoint's timestamp is too large, it can't be the answer (nor can that half help), so search the left half instead. Whatever the last recorded candidate was by the time the search bounds cross is the answer, or `""` if nothing ever qualified (including when the key has never been set, or every timestamp on record is later than the query).

**Time complexity:** O(log n) per `get` (n being the number of entries for that key), O(1) amortized per `set`.

**Space complexity:** O(total number of set calls) to store every version of every key.
