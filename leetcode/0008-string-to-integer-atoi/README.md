# 8. String to Integer (atoi)

Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer, mimicking the behavior of the C `atoi` function.

The algorithm:
1. Skip leading whitespace.
2. Check for an optional `'+'` or `'-'` sign.
3. Read digits until a non-digit character appears (or the string ends), ignoring leading zeros in the result.
4. Clamp the value to the 32-bit signed integer range `[-2^31, 2^31 - 1]`.
5. Return the result (0 if no digits were read).

**Example 1:**
```
Input: s = "42"
Output: 42
```

**Example 2:**
```
Input: s = "   -042"
Output: -42
```

**Example 3:**
```
Input: s = "1337c0d3"
Output: 1337
```

**Example 4:**
```
Input: s = "words and 987"
Output: 0
```

**Constraints:**
- 0 <= s.length <= 200
- `s` consists of English letters, digits, `' '`, `'+'`, `'-'`, and `'.'`

## Approach

This is less about algorithmic cleverness and more about carefully following a state machine, in order: skip whitespace, read at most one sign, read digits, stop at the first non-digit. Any character that breaks the digit run — even something like `.` or another digit-looking token later after a break — just ends the number right there; everything after is irrelevant.

Walk the string with an index. First advance past any spaces. If nothing's left, return 0. Then check for `+` or `-` and record a sign (defaulting to positive), advancing the index past it if present. From there, keep consuming characters while they're digits, building up the number as `result = result * 10 + digit`.

The clamp has to happen against the 32-bit bounds, and it should happen incrementally rather than only at the end, since the input can have arbitrarily many digits (e.g. a string of 200 nines) and building the full number first would blow past what you'd want to track. So during the digit-accumulation loop, check before each multiply: if the unsigned magnitude would exceed `INT_MAX` (2147483647), clamp immediately to `INT_MAX` or `INT_MIN` depending on the sign and stop reading further digits — the answer's already fixed at that point.

**Time complexity:** O(n) — a single left-to-right scan of the string.

**Space complexity:** O(1) — only a few scalar variables are kept.
