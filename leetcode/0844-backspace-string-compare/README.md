# 844. Backspace String Compare

You're given two strings `s` and `t`, each possibly containing the character `#`, which represents a backspace keypress — it deletes the character typed right before it (or does nothing if there's nothing left to delete). Return `true` if `s` and `t` become equal once all the backspaces are applied.

**Example 1:**
```
Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both become "ac".
```

**Example 2:**
```
Input: s = "ab##", t = "c#d#"
Output: true
Explanation: Both become "".
```

**Example 3:**
```
Input: s = "a#c", t = "b"
Output: false
Explanation: s becomes "c", t is "b".
```

**Constraints:**
- 1 <= s.length, t.length <= 200
- s and t only contain lowercase letters and '#'

## Approach

The simplest correct approach is to actually simulate typing: walk through each string with a stack, pushing every regular character and popping on `#` (if the stack isn't empty — a `#` with nothing to delete is just a no-op). Whatever's left on the stack at the end is the final typed string, so build both strings this way and compare them directly.

This is easy to reason about because a stack is exactly what "delete the most recent character" means.

A more space-efficient version processes both strings **from the end**, without building new strings at all. Walking backward, skip over any character that gets cancelled by a pending backspace count: when you hit a `#`, increment a skip counter; when you hit a real character and the skip counter is positive, decrement the counter and skip that character too; otherwise, that's the next "real" character from the end. Advance both strings' pointers this way in lockstep, comparing the real characters found at each step, and returning false the moment they differ (or one string runs out of real characters before the other).

The stack approach below is the one used for clarity; the reverse two-pointer version is a good follow-up to mention since it gets space down to O(1).

**Time complexity:** O(n + m) — each string is processed once.

**Space complexity:** O(n + m) for the stack version (building the two cleaned-up strings); the reverse two-pointer variant gets this down to O(1) extra space.
