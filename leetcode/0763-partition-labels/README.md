# 763. Partition Labels

**Commonly asked at:** Amazon, Facebook

You're given a string `s`. Split it into as many partitions as possible such that each letter appears in at most one partition (every occurrence of a given letter must be confined to a single piece). Return a list of the sizes of these partitions, in order.

**Example 1:**
```
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation: The partition is "ababcbaca", "defegde", "hijhklij". Each letter appears in at most one of these three parts.
```

**Example 2:**
```
Input: s = "eccbbbbdec"
Output: [10]
Explanation: Every letter's occurrences are spread across the whole string, so it can't be split at all.
```

**Constraints:**
- 1 <= s.length <= 500
- s consists of lowercase English letters

## Approach

First record the last index at which each character appears anywhere in the string — one pass, a simple array/hash map keyed by character.

Then greedily build partitions left to right. Keep a running `end` marking the furthest position that the current partition must extend to, based on every character seen so far in it: for each character at index `i`, extend `end` to `max(end, last[char])`, since if that character shows up again later, the partition can't close until that later occurrence is included too.

The current partition can only safely close once the scan pointer `i` actually reaches `end` — meaning every character encountered inside this stretch has had all of its occurrences accounted for. At that point, record the partition's length (`end - start + 1`) and start a fresh partition right after it.

This works because it's always safe to close a partition as early as possible: waiting longer never helps (it can only merge unrelated partitions together and produce fewer, larger pieces), and closing at `i == end` is the earliest point where it's actually valid to do so.

**Time complexity:** O(n) — one pass to record last occurrences, one pass to build partitions.

**Space complexity:** O(1) extra — the last-occurrence table is bounded by the 26-letter alphabet.
