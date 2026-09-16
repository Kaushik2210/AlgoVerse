# 1520. Maximum Number of Non-Overlapping Substrings

**Commonly asked at:** Amazon

Given a string `s`, return the maximum number of non-overlapping substrings you can select such that each selected substring, if it contains any occurrence of a particular character, must contain **every** occurrence of that character in `s`. If multiple valid selections tie for the maximum count, return any one of them.

**Example 1:**
```
Input: s = "adefaddaccc"
Output: ["e","f","ccc"]
Explanation: "e" and "f" are each self-contained single letters. "ccc" contains every occurrence of 'c'. Note that "adefadda" also satisfies the rule for 'a' and 'd', but picking it would prevent choosing anything else, so it's not part of the optimal answer.
```

**Example 2:**
```
Input: s = "abbaccd"
Output: ["bb","cc","d"]
```

**Constraints:**
- 1 <= s.length <= 10^5
- s consists of only lowercase English letters

## Approach

First record the first and last index of every character — a simple linear scan.

For a substring to be valid, it must be "closed" under this rule: for every character it contains, it must contain that character's entire first-to-last span. Starting from any index `i`, there's exactly one *minimal* such interval that begins at `i`, and it's found the same way as merging overlapping intervals: start with `[i, last[s[i]]]`, then walk through the range — for each character `s[j]` encountered inside it, extend the interval's end to `last[s[j]]` if that's further out. Keep expanding until the walk reaches the current end without needing to extend further, at which point the interval is closed and minimal. Crucially, only bother starting this process from indices where `i` is that character's *first* occurrence — starting anywhere else either produces the same interval (shifted to have started properly) or an invalid one, so it's redundant. While expanding, if any character inside the range has a first-occurrence index *before* `i`, no valid interval can start exactly at `i` (it would need to reach back further left), so that candidate is discarded entirely.

This produces a set of candidate intervals, each one the smallest valid "closed" substring starting at its respective position. The problem now reduces to classic interval scheduling: pick the maximum number of non-overlapping intervals from this candidate set. The greedy solution for that is well known — sort by ending position, and repeatedly take the next interval whose start is past the previous pick's end. Choosing the earliest-finishing option at every step always leaves the most room for future picks, so it maximizes the total count.

**Time complexity:** O(n) to compute first/last occurrences and build candidate intervals (each character position is visited a bounded number of times across all interval expansions), plus O(n log n) for the sort of intervals (at most 26 of them, so this term is actually O(1) in practice) and O(n) for the final greedy scan.

**Space complexity:** O(1) for the first/last occurrence tables (bounded by the alphabet), O(n) for the output.
