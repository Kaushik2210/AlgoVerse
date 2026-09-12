# 205. Isomorphic Strings

Given two strings `s` and `t`, determine if they're isomorphic. Two strings are isomorphic if the characters in `s` can be replaced to get `t`, where every occurrence of a character must map to the same character, and no two different characters may map to the same character (the mapping must be one-to-one in both directions).

**Example 1:**
```
Input: s = "egg", t = "add"
Output: true
Explanation: e->a, g->d
```

**Example 2:**
```
Input: s = "foo", t = "bar"
Output: false
Explanation: both o's in "foo" would need to map to both a and r
```

**Example 3:**
```
Input: s = "paper", t = "title"
Output: true
```

**Constraints:**
- 1 <= s.length <= 5 * 10^4
- t.length == s.length

## Approach

This is a character-mapping problem, and the trap is only checking the mapping in one direction. If you only track `s -> t` and see that both `'o'` characters in `"foo"` map to different letters, you'd correctly reject it — but a case like `s = "ab"`, `t = "aa"` needs the *reverse* check too: `'a'` maps to `'a'` and `'b'` also wants to map to `'a'`, which isn't allowed since two different source characters can't collapse onto the same target character.

So keep two hash maps, one for each direction: `s_to_t` and `t_to_s`. Walk both strings in lockstep. For each pair of characters `(c1, c2)`:
- If `c1` is already mapped in `s_to_t`, its mapping must equal `c2`, otherwise fail.
- If `c2` is already mapped in `t_to_s`, its mapping must equal `c1`, otherwise fail.
- Otherwise, record both mappings (`s_to_t[c1] = c2` and `t_to_s[c2] = c1`) and move on.

If every pair passes both checks, the strings are isomorphic.

**Time complexity:** O(n) — one pass through both strings with O(1) hash map operations.

**Space complexity:** O(1) — at most one entry per distinct character, and the alphabet is bounded.
