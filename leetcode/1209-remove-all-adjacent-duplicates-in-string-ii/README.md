# 1209. Remove All Adjacent Duplicates in String II

Given a string `s` and an integer `k`, repeatedly remove `k` adjacent and equal letters until no such run of exactly `k` (or more, collapsing as they merge) identical adjacent letters remains, and return the final string after all such removals.

**Example 1:**
```
Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
Explanation: remove "eee" -> "dbbcccbdaa", remove "ccc" -> "dbbbdaa", remove "bbb" -> "dddaa", remove "ddd" -> "aa"
```

**Example 2:**
```
Input: s = "pbbcggttciiippooaais", k = 2
Output: "ps"
```

**Constraints:**
- 1 <= s.length <= 10^5
- 1 <= k <= 10^4
- s only contains lowercase English letters

## Approach

Like the k=2 version of this problem, this is a stack-based collapse, but now each stack entry needs to track a run count instead of just a single character, since removal only happens once a run reaches exactly `k`.

Keep a stack of `(character, count)` pairs. For each character in `s`: if the stack is non-empty and its top character matches, increment that top entry's count; otherwise push a new entry `(char, 1)`. After updating, if the top entry's count has reached `k`, pop it entirely — that whole run just got removed. This mirrors the same "cancellations reveal new adjacencies automatically" property as the k=2 case: popping a completed run exposes whatever was below it, and if that now matches the next incoming character, the counting continues seamlessly from there.

At the end, reconstruct the final string by expanding each remaining `(character, count)` pair back into `count` copies of `character`, in stack order.

**Time complexity:** O(n) — each character triggers O(1) stack work, and the final reconstruction also visits each remaining character once.

**Space complexity:** O(n) for the stack.
