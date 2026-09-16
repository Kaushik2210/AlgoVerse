# 246. Strobogrammatic Number

**Commonly asked at:** Google

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway since it's the natural warm-up before "Strobogrammatic Number II" (247).*

A strobogrammatic number looks the same right-side up as it does rotated 180 degrees. Given a string `num` representing an integer, return whether it's strobogrammatic.

**Example 1:**
```
Input: num = "69"
Output: true
Explanation: rotate 180 degrees and "69" becomes "69" again — 6 flips into 9 and 9 flips into 6, swapping positions correctly.
```

**Example 2:**
```
Input: num = "88"
Output: true
Explanation: 8 rotated 180 degrees is still 8.
```

**Example 3:**
```
Input: num = "962"
Output: false
Explanation: 2 has no valid rotated counterpart, so the number can't be strobogrammatic.
```

**Constraints:**
- `1 <= num.length <= 50`
- `num` consists of only digits
- `num` doesn't contain any leading zero except for `num == "0"` itself

## Approach

Only a handful of digits survive a 180-degree rotation at all, and each one maps to a specific digit: `0->0`, `1->1`, `6->9`, `8->8`, `9->6`. Every other digit (`2,3,4,5,7`) has no valid rotated form, so any number containing one of those is immediately disqualified.

Beyond that, rotating the whole number reverses its digit order (the last digit ends up first). So checking strobogrammatic-ness is a two-pointer walk from both ends toward the middle: for each pair of digits at positions `left` and `right`, the digit at `left`, once rotated, must equal the digit at `right`. If any pair fails that check, or either digit isn't in the rotation map at all, the answer is false. If every pair checks out (including the middle character alone in an odd-length string, which must rotate to itself — true only for `0`, `1`, `8`), the number is strobogrammatic.

**Time complexity:** O(n) where n is the length of `num` — each pair of characters is checked once.

**Space complexity:** O(1) beyond the fixed-size rotation map.
