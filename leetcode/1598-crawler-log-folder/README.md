# 1598. Crawler Log Folder

A file system crawler starts in the main folder and executes a sequence of folder-change operations, given as a string array `logs`. Each operation is one of:
- `"../"`: move to the parent folder (stays in the main folder if already there).
- `"./"`: stay in the current folder.
- `"x/"`: move into a child folder named `x`.

Return the minimum number of `"../"` operations needed to go back to the main folder after executing all the operations in `logs`.

**Example 1:**
```
Input: logs = ["d1/","d2/","../","d21/","./"]
Output: 2
Explanation: after all ops, current folder is main/d1/d21, need 2 "../" to get back
```

**Example 2:**
```
Input: logs = ["d1/","d2/","./","d3/","../","d31/"]
Output: 3
```

**Example 3:**
```
Input: logs = ["d1/","../","../","../"]
Output: 0
Explanation: already at main folder, extra "../" ops do nothing
```

**Constraints:**
- 1 <= logs.length <= 10^3
- 2 <= logs[i].length <= 10
- logs[i] contains lowercase English letters, digits, '.', and '/'
- logs[i] follows the format described above
- folder names consist of lowercase English letters and digits

## Approach

The only thing that matters is the current depth (how many folders deep from main), not the actual folder names — since the question only asks how many `"../"` steps get back to depth 0. Track depth as a single counter: start at 0, `"../"` decrements it (but never below 0, since you can't go above the main folder), `"./"` leaves it unchanged, and any other operation (`"x/"`) increments it.

After processing every log entry, the counter itself is exactly the answer — it's the current depth, which is also the minimum number of `"../"` needed to walk back up to depth 0.

**Time complexity:** O(n) — one pass over logs.

**Space complexity:** O(1).
