# 791. Custom Sort String

**Commonly asked at:** Google, Facebook

You're given two strings `order` and `s`. `order` contains each of some set of lowercase letters exactly once, giving a custom priority order. Permute `s` so that its characters appear according to that custom order — characters of `s` that appear in `order` should show up in the relative order given by `order`, and any characters of `s` not mentioned in `order` can be placed anywhere (any valid arrangement of them is accepted).

**Example 1:**
```
Input: order = "cba", s = "abcd"
Output: "cbad"
Explanation: 'c' comes first, then 'b', then 'a' (matching order), and 'd' isn't in order so it can go anywhere — appending it at the end works.
```

**Example 2:**
```
Input: order = "bcafg", s = "abcd"
Output: "bcad"
```

**Constraints:**
- 1 <= order.length <= 26
- 1 <= s.length <= 2 * 10^4
- order and s consist of lowercase English letters
- All characters of order are unique

## Approach

Count how many times each character appears in `s`. Then walk through `order` one letter at a time, and for each letter that actually shows up in `s`, append that many copies of it to the result — this places every character that `order` cares about in exactly the priority sequence given.

Whatever's left over in the count map afterward is characters from `s` that `order` never mentioned; since their placement is unconstrained, just append them (in any order) at the end.

**Time complexity:** O(n + m) where n is the length of `s` and m is the length of `order` — one pass to count `s`, one pass over `order`, and a pass over any leftover characters.

**Space complexity:** O(n) for the character counts and the result string.
