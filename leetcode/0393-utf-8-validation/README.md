# 393. UTF-8 Validation

Given an integer array `data` representing a sequence of bytes, return whether it forms a valid UTF-8 encoding. Each integer in `data` represents one byte, so only the 8 least significant bits should be used to represent that byte.

A valid UTF-8 character can be 1 to 4 bytes long, following these rules:
- For a 1-byte character, the first bit is `0`, followed by its Unicode code point.
- For an n-byte character (n in [2,4]), the first byte starts with n 1s followed by a 0, and each of the following n-1 bytes starts with `10`.

**Example 1:**
```
Input: data = [197,130,1]
Output: true
Explanation: 197 = 11000101, 130 = 10000010, this is a valid 2-byte character followed by a valid 1-byte character (00000001)
```

**Example 2:**
```
Input: data = [235,140,4]
Output: false
Explanation: 235 = 11101011, this signals a 3-byte character, but there are only 2 bytes following it (140 and 4), and 4 = 00000100 doesn't start with 10
```

**Constraints:**
- 1 <= data.length <= 2 * 10^4
- 0 <= data[i] <= 255

## Approach

This is a byte-by-byte state machine: at any point, either you're expecting the start of a new character, or you're partway through a multi-byte character and expecting a fixed number of continuation bytes.

For each byte, first mask it down to its lowest 8 bits (`byte & 0xFF`) since `data[i]` can technically hold more bits than a real byte would. When not in the middle of a multi-byte character, look at the leading bits to figure out how many bytes this character should take:
- Leading bit `0` (byte < 0x80): a 1-byte character, nothing more expected.
- Leading bits `110` (byte in the 0xC0-0xDF range): expect 1 more continuation byte.
- Leading bits `1110` (0xE0-0xEF): expect 2 more.
- Leading bits `11110` (0xF0-0xF7): expect 3 more.
- Anything else as a leading byte (like `10xxxxxx` appearing where a new character should start, or `11111xxx`) is invalid immediately.

While continuation bytes are expected, each one must match the pattern `10xxxxxx` (i.e. `(byte & 0xC0) == 0x80`); anything else invalidates the whole sequence. After processing every byte in `data`, the encoding is valid only if there's no unfinished multi-byte character left dangling (the count of expected continuation bytes must be back to 0).

**Time complexity:** O(n) — one pass over the bytes.

**Space complexity:** O(1).
