# 535. Encode and Decode TinyURL

Design a class to encode a URL and decode a tiny URL back to the original.

- `Codec()` — initializes the object.
- `String encode(String longUrl)` — encodes a URL to a shortened URL.
- `String decode(String shortUrl)` — decodes a shortened URL produced by `encode` back to its original URL.

There is no restriction on how your encode/decode algorithm should work — the only requirement is that a URL can be encoded to a short URL and the short URL can be decoded back to the original URL.

**Example:**
```
Input: url = "https://leetcode.com/problems/design-tinyurl"

Output: "https://leetcode.com/problems/design-tinyurl"

Explanation:
Codec codec = new Codec();
codec.decode(codec.encode(url)); // returns the original URL after encoding then decoding it
```

## Approach

Since the problem places no constraint on the actual encoding scheme, the simplest correct design is a pair of hashmaps acting as a bidirectional lookup table, with a short random code standing in for the real URL.

- `long_to_short`: original URL -> short URL, so re-encoding the same URL returns the same short URL instead of minting a new one every time.
- `short_to_long`: short URL -> original URL, so `decode` is a direct lookup.
- A set of already-issued codes, so a freshly generated random code is checked against everything issued so far before being accepted — this is what actually guarantees uniqueness, since checking a bare 6-character code against a map keyed by full `"http://tinyurl.com/xxxxxx"` strings wouldn't catch a collision at all.

**`encode(longUrl)`**: if this exact URL has already been encoded, just return the short URL on file for it. Otherwise, keep generating a random 6-character alphanumeric code (62 choices per character, so 62^6 ≈ 56 billion possible codes — collisions are rare but still checked for correctness, not just probability) until one hasn't been used yet, record it in the used-codes set, build the short URL string, and store the mapping in both directions.

**`decode(shortUrl)`**: just look it up in `short_to_long`.

An alternative that avoids randomness entirely is to use a monotonically increasing counter (base-62 encoded) as the code instead — that guarantees uniqueness by construction with no retry loop, at the cost of short URLs being predictable/guessable in sequence, which the random-code version avoids.

**Time complexity:** O(1) average for both `encode` and `decode` — the retry loop for code generation has astronomically low expected iterations given the code space size relative to realistic call volumes.

**Space complexity:** O(n) where n is the number of distinct URLs encoded, across the two hashmaps and the used-codes set.
