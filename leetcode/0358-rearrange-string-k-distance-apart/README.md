# 358. Rearrange String k Distance Apart

**Commonly asked at:** Amazon, Google, TikTok

*Note: this problem is marked premium on LeetCode.*

Given a string `s` and an integer `k`, rearrange `s` such that the same characters are at least distance `k` from each other. If it is not possible to rearrange the string, return an empty string `""`.

**Example 1:**
```
Input: s = "aabbcc", k = 3
Output: "abcabc"
Explanation: The same letters are at least a distance of 3 from each other.
```

**Example 2:**
```
Input: s = "aaabc", k = 3
Output: ""
Explanation: It is not possible to rearrange the string.
```

**Example 3:**
```
Input: s = "aaadbbcc", k = 2
Output: "abacabcd"
Explanation: The same letters are at least a distance of 2 from each other.
```

**Constraints:**
- 1 <= s.length <= 3 * 10^5
- s consists of only lowercase English letters.
- 0 <= k <= s.length

## Approach

This is the general form of Reorganize String (LeetCode 767, which is this problem with `k` fixed at 2): always place whichever remaining character currently has the highest count, but this time a placed character has to sit out for `k` steps (not just 1) before it's eligible to be placed again.

If `k <= 1` there's no separation requirement at all, so the original string already satisfies it — return it unchanged.

Otherwise, use a max-heap (negated counts) to always grab the most frequent remaining character, plus a FIFO queue that tracks characters currently "cooling down" along with the step index at which their cooldown ends (`current_step + k`). Because characters are always placed at increasing step numbers, and each one's release step is exactly its placement step plus the fixed `k`, entries land in the cooldown queue in non-decreasing order of release step — so a plain queue (not a heap) correctly reflects release order.

At each step:
- If the front of the cooldown queue has reached its release step, pop it and push it back into the max-heap so it can compete for placement again.
- If the heap is empty at this point but there are still characters left to place, no valid arrangement exists — return `""` (this happens when one character is disproportionately frequent relative to `k` and the string length).
- Otherwise pop the most frequent character off the heap, append it to the result, decrement its count, and if any occurrences remain, push it into the cooldown queue with release step `current_step + k`.

After `n` steps, the result contains every character correctly spaced at least `k` apart.

**Time complexity:** O(n log m) where `m` is the number of distinct characters (at most 26), since each of the `n` placements does O(log m) heap work.

**Space complexity:** O(m) for the heap and O(m) for the cooldown queue (bounded by the number of distinct characters), plus O(n) for the output.
