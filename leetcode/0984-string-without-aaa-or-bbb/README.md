# 984. String Without AAA or BBB

**Commonly asked at:** Amazon, Google

Given two integers `a` and `b`, return any string that has exactly `a` occurrences of `'a'` and `b` occurrences of `'b'`, and does not contain the substring `"aaa"` or `"bbb"`.

**Example 1:**
```
Input: a = 1, b = 2
Output: "bab"
```

**Example 2:**
```
Input: a = 4, b = 1
Output: "aabaa"
```

**Constraints:**
- 0 <= a, b <= 100
- It is guaranteed such a string exists for the given input

## Approach

Build the string one character at a time with a greedy rule, checking only the last two characters placed so far:

- If the last two characters placed are the same letter (two `'a'`s or two `'b'`s in a row), placing a third would violate the constraint, so the next character is *forced* to be the other letter (as long as it's still available, which the problem's existence guarantee ensures).
- Otherwise, there's a free choice, and the greedy move is to take whichever of `'a'` or `'b'` currently has more remaining count (ties broken toward `'a'`, arbitrarily). The intuition: always spend down the more plentiful letter first, since it has more "runway" before running out, and holding it back only increases the risk of being forced into an unbreakable run of the *other* letter later, or getting stuck unable to place the surplus letter without tripling up.

Repeat until both counts are exhausted. Because at most 2 of the same letter are ever placed consecutively by construction (the forced-switch rule prevents ever placing a third), the result never contains `"aaa"` or `"bbb"`.

**Time complexity:** O(a + b) — one character appended per iteration.

**Space complexity:** O(a + b) for the output string (O(1) extra beyond that).
