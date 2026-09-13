# 1146. Snapshot Array

Design an array that supports taking a snapshot of its state and can retrieve the value at any given index as it was at any past snapshot:

- `SnapshotArray(int length)` — initializes an array-like data structure with `length` indices, all starting at 0.
- `void set(index, val)` — sets the value at `index` to `val`.
- `int snap()` — takes a snapshot of the array and returns the `snap_id`, the total number of snapshots taken so far minus 1 (i.e. the ID of the snapshot just taken).
- `int get(index, snap_id)` — returns the value at `index` as it was at the time of the snapshot with the given `snap_id`.

**Example:**
```
Input:
["SnapshotArray", "set", "snap", "set", "get"]
[[3], [0, 5], [], [0, 6], [0, 0]]

Output:
[null, null, 0, null, 5]

Explanation:
SnapshotArray snapshotArr = new SnapshotArray(3); // 3 indices, all 0
snapshotArr.set(0, 5);   // index 0 is now 5
snapshotArr.snap();      // returns 0, snapshot 0 saved index 0 as 5
snapshotArr.set(0, 6);   // index 0 is now 6, but this happens AFTER snapshot 0
snapshotArr.get(0, 0);   // returns 5, the value at index 0 when snapshot 0 was taken
```

**Constraints:**
- 1 <= length <= 5 * 10^4
- 0 <= index < length
- 0 <= val <= 10^9
- 0 <= snap_id < number of times `snap()` has been called
- At most 5 * 10^4 calls total will be made to `set`, `snap`, and `get`

## Approach

The naive way to support this is to physically copy the whole array on every `snap()` call — but with up to 5*10^4 snapshots on a 5*10^4-length array, that's O(n) per snapshot and blows up to O(n^2) total, way too slow, and also wasteful since in practice most indices barely ever change between snapshots.

The key realization: instead of storing every index's value at every snapshot, only record a change **when a `set` actually happens**, tagged with the snapshot ID that's currently pending. Each index gets its own small sorted list of `(snap_id, value)` pairs — effectively "index i changed to value v as of snapshot s." If an index is never touched between two snapshots, no new entry is added at all, so the cost is proportional to the number of actual writes, not the number of snapshots times the array length.

- **`set(index, val)`**: append `(current_snap_id, val)` to that index's history — unless the last entry already has the current (not-yet-taken) snapshot ID, in which case just overwrite its value in place, since only the last write before a snapshot matters.
- **`snap()`**: just increment and return a counter. No data is copied at all — O(1).
- **`get(index, snap_id)`**: binary search that index's history for the last entry whose `snap_id` is `<=` the requested one (every history list is naturally sorted by snap_id since writes only append with an increasing counter). That's the value that was "current" at the time of that snapshot. If nothing was ever set before that snapshot, the initial `(0, 0)` entry covers it.

**Time complexity:** O(1) for `set` and `snap`; O(log k) for `get`, where k is the number of times that specific index was set — bounded by the total number of `set` calls.

**Space complexity:** O(n + m) where n is the array length (one initial entry per index) and m is the total number of `set` calls across all indices.
