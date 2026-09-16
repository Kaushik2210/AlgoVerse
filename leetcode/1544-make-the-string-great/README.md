# 1544. Make The String Great

**Commonly asked at:** Amazon, Google, Microsoft, Bloomberg

A string is "bad" if it has two adjacent characters that are the same letter but different case (like `'a'` and `'A'`). Given a string `s`, repeatedly remove any such adjacent bad pair until the string is good (no bad pairs remain), and return the resulting string. The final result is unique regardless of removal order.

**Example 1:**
```
Input: s = "leEeetcode"
Output: "leetcode"
Explanation: remove "Ee" (positions 2-3) to get "leetcode", no more bad pairs
```

**Example 2:**
```
Input: s = "abBAcC"
Output: ""
Explanation: "abBAcC" -> "aAcC" -> "cC" -> ""
```

**Example 3:**
```
Input: s = "s"
Output: "s"
```

**Constraints:**
- 1 <= s.length <= 100
- s contains only lowercase and uppercase English letters

## Approach

Same shape as the general "collapse adjacent cancelling pairs" family: use a stack, and for each character check whether it cancels with the top of the stack. Here "cancels" means same letter, opposite case — checkable by comparing the characters aren't equal but their lowercase forms are (equivalently, checking that they differ by exactly the bit that separates upper and lower case in ASCII, but the lowercase-comparison is more readable).

Walk `s` left to right: if the stack is non-empty and the top character forms a bad pair with the current character, pop it (they cancel). Otherwise push the current character. As with any stack-based adjacent-cancellation problem, a cancellation can reveal a new bad pair with what's now exposed on top, and that gets handled automatically the next time a matching character shows up — no need to rescan.

At the end, join the stack into the final string.

**Time complexity:** O(n) — each character is pushed and popped at most once.

**Space complexity:** O(n) for the stack.
