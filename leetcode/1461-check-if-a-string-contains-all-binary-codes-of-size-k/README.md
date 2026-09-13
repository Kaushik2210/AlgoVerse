# 1461. Check If a String Contains All Binary Codes of Size K

Given a binary string `s` and an integer `k`, return `true` if every possible binary code of length `k` (there are `2^k` of them, from `000...0` to `111...1`) appears as a substring somewhere in `s`.

**Example 1:**
```
Input: s = "00110110", k = 2
Output: true
Explanation: The substrings of length 2 in s are "00","01","11","11","10","01" — that covers "00","01","10","11", all 4 possible codes.
```

**Example 2:**
```
Input: s = "0110", k = 1
Output: true
Explanation: Both "0" and "1" appear.
```

**Example 3:**
```
Input: s = "0110", k = 2
Output: false
Explanation: "0110" only contains substrings "01","11","10" — "00" never appears.
```

**Constraints:**
- 1 <= s.length <= 10^5
- 1 <= k <= 20
- s[i] is either '0' or '1'

## Approach

There are exactly `2^k` distinct binary codes of length `k` to look for. A quick early exit: if `s` doesn't even have `2^k` distinct substrings of length `k` available (i.e. `len(s) - k + 1 < 2^k`), it's immediately impossible to contain them all, so return false without scanning.

Otherwise, slide a window of size `k` across `s`, maintaining it not as a string but as an integer — since it's binary, a length-`k` window is literally a `k`-bit number. Instead of recomputing it from scratch at every position, maintain it incrementally: shift the current window's bits left by 1, OR in the new incoming bit, then mask off everything above the lowest `k` bits (`& ((1 << k) - 1)`) to drop the bit that just fell off the left edge. This is the same rolling-hash trick used for other fixed-window substring problems, except here the "hash" is exact rather than approximate, since the alphabet is just 0/1.

Every window value encountered (once the window has grown to full size `k`, i.e. from index `k - 1` onward) gets added to a hash set. Once the whole string has been scanned, the string contains every possible code if and only if the set collected exactly `2^k` distinct values — since there are only `2^k` possible k-bit integers total, seeing that many distinct ones means none were missed.

**Time complexity:** O(n) where n is the length of s — each position does O(1) work to update the rolling window and insert into the set.

**Space complexity:** O(2^k) for the set of seen window values, which is also bounded by O(n) since the early-exit check ensures 2^k <= n - k + 1.
