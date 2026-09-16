# 443. String Compression

**Commonly asked at:** Amazon, Meta

You're given an array of characters `chars`. Compress it in place using this rule: for each group of consecutive repeating characters, write the character once, then (if the group length is more than 1) write the length as separate digit characters right after it. Return the new length of the array; the first that many characters of `chars` should hold the compressed result.

**Example 1:**
```
Input: chars = ["a","a","b","b","c","c","c"]
Output: 6, chars = ["a","2","b","2","c","3"]
Explanation: "aa" -> "a2", "bb" -> "b2", "ccc" -> "c3"
```

**Example 2:**
```
Input: chars = ["a"]
Output: 1, chars = ["a"]
Explanation: A single character stays as-is, no count is appended for groups of length 1.
```

**Example 3:**
```
Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: 4, chars = ["a","b","1","2"]
Explanation: "b" repeats 12 times, and 12 is written as the two digit characters '1' and '2'.
```

**Constraints:**
- 1 <= chars.length <= 2000
- chars[i] is a lowercase/uppercase English letter, digit, or symbol

## Approach

A tempting but wrong shortcut is to build a separate compressed string with something like `str(count)` and copy it back — that works but uses O(n) extra space, and the problem asks for an in-place, O(1)-extra-space compression.

The in-place way uses two pointers: a slow `write` pointer marking where the next compressed character should go, and a `read` pointer that scans through groups. For each group, note its starting index, then advance `read` while the character stays the same to find the group's length. Write the character at `chars[write]` and bump `write`. If the group length is more than 1, convert it to a string of digits and write each digit character at `chars[write]`, bumping `write` each time. Move to the next group and repeat until `read` reaches the end.

Because `write` never advances faster than `read` (a group's compressed form — one letter plus optionally a few digits — is never longer than the group itself unless the group is length 1, where they're equal), it's always safe to overwrite `chars` in place as you go without clobbering data you still need to read.

**Time complexity:** O(n) — each character is visited once by `read`, and digit-writing is bounded by the number of digits in counts that sum to at most n.

**Space complexity:** O(1) extra — everything is written back into the input array; only a handful of scalar variables are used.
