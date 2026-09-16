# 249. Group Shifted Strings

**Commonly asked at:** Meta, Google

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given an array of strings. Two strings belong to the same "shifting sequence" if every letter of one can be shifted by the same fixed amount (wrapping `z` back to `a`) to produce the other. Group all strings that belong to the same shifting sequence, in any order.

**Example 1:**
```
Input: strings = ["abc","bcd","acef","xyz","az","ba","a","z"]
Output: [["acef"],["a","z"],["abc","bcd","xyz"],["az","ba"]]
```

**Example 2:**
```
Input: strings = ["a"]
Output: [["a"]]
```

**Constraints:**
- 1 <= strings.length <= 200
- 1 <= strings[i].length <= 50
- strings[i] consists of lowercase English letters

## Approach

Two strings are in the same group exactly when the offset from the first character is the same at every position. If you shift `"abc"` by some amount to get `"bcd"`, then for every index `i`, `(s[i] - s[0]) mod 26` must equal `(t[i] - t[0]) mod 26` — the shift amount cancels out once you measure relative to the string's own first letter.

So the brute-force idea of comparing every pair of strings directly (checking all 26 possible shifts against each other) is O(n^2 * 26 * L), which is wasteful. Instead, build a canonical key per string: the tuple of `(char - first_char) mod 26` for every character. Two strings produce the identical key if and only if they're shift-equivalent. Bucket strings into a hash map keyed by this tuple, one pass over the input, and the map's values are the answer.

The `mod 26` (rather than a plain subtraction) matters for wraparound cases like `"az"` and `"ba"`: shifting `'a'` -> `'b'` is +1, and `'z'` -> `'a'` wrapping is also +1, so both produce key `(0, 1)`.

**Time complexity:** O(n * L) — one pass building an O(L) key per string.

**Space complexity:** O(n * L) — storing every string's key and the grouped output.
