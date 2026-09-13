# 1047. Remove All Adjacent Duplicates In String

Given a string `s`, repeatedly remove two adjacent and equal letters until no such pair remains, and return the final string. It's guaranteed the answer is unique.

**Example 1:**
```
Input: s = "abbaca"
Output: "ca"
Explanation: remove "bb" to get "aaca", then remove "aa" to get "ca"
```

**Example 2:**
```
Input: s = "azxxzy"
Output: "ay"
```

**Constraints:**
- 1 <= s.length <= 10^5
- s consists of lowercase English letters

## Approach

Repeatedly scanning the string for adjacent pairs and rebuilding it each time would be slow (and awkward to implement correctly, since removing a pair can create a new adjacent pair on either side). A stack handles this cleanly in one linear pass.

Walk through `s` left to right, maintaining a stack of characters kept so far. For each character, check the top of the stack: if it matches the current character, pop it (the two just cancelled as an adjacent duplicate pair); otherwise, push the current character. Because the stack always reflects the current state of "what would be left after collapsing everything processed so far," a cancellation revealing a new adjacent pair with what's now on top gets handled naturally on the very next matching character, without needing to rescan.

At the end, the stack holds the final string with all adjacent duplicates fully collapsed — join it back into a string in order.

**Time complexity:** O(n) — each character is pushed and popped at most once.

**Space complexity:** O(n) for the stack.
