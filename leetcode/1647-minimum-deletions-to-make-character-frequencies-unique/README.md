# 1647. Minimum Deletions to Make Character Frequencies Unique

**Commonly asked at:** Amazon

Given a string, you can delete any number of characters from it. Return the minimum number of deletions needed so that no two distinct characters left in the string have the same frequency (a frequency of 0, i.e. a character deleted entirely, doesn't count as a conflict).

**Example 1:**
```
Input: s = "aab"
Output: 0
Explanation: Frequencies are a:2, b:1 — already all distinct.
```

**Example 2:**
```
Input: s = "aaabbbcc"
Output: 2
Explanation: Frequencies are a:3, b:3, c:2. Delete two b's to make it a:3, b:1, c:2.
```

**Example 3:**
```
Input: s = "ceabaacb"
Output: 2
Explanation: Frequencies are a:3, b:2, c:2, e:1. b and c collide at 2; dropping c all the way to 0 (deleting both c's) leaves a:3, b:2, e:1, all distinct — 2 deletions total.
```

**Constraints:**
- 1 <= s.length <= 10^5
- s consists of lowercase English letters

## Approach

Start by counting the frequency of each character (at most 26 distinct counts, since there are only 26 lowercase letters). The problem then reduces to: given this small set of frequency values, adjust duplicates downward (deletion only ever lowers a frequency, never raises it) until every remaining nonzero frequency is unique, using as few total decrements as possible.

Process the frequencies (order doesn't matter) while keeping a set of frequency values already "claimed" by some earlier character. For each frequency, while it's positive and already in the claimed set, decrement it by 1 and count that as a deletion — keep lowering it until it either hits an unclaimed value or drops to 0. Once it settles on an unclaimed positive value, add that value to the claimed set (a value of 0 doesn't need to be claimed, since multiple characters can simultaneously have zero occurrences without conflicting).

This greedy approach is optimal because pushing a colliding frequency down to the *nearest* available slot below it is always at least as good as any other strategy — skipping straight to a much lower value would only waste extra deletions, and there's no benefit to increasing a frequency since deletions are the only operation allowed.

**Time complexity:** O(n + 26^2) — O(n) to count frequencies, and since each of the 26 buckets can decrement at most 26 times in the worst case, the inner while loop is bounded by a small constant overall.

**Space complexity:** O(1) — a fixed 26-entry frequency array and a set bounded by 26 values.
