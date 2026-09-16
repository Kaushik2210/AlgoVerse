# 165. Compare Version Numbers

**Commonly asked at:** Meta

You're given two version strings `version1` and `version2`, each a sequence of one or more non-negative integer "revisions" separated by dots (like `"1.01.3"` or `"1.2"`). Compare them revision by revision, from left to right, treating each revision as an integer (so leading zeros don't matter — `"01"` equals `"1"`), and a missing trailing revision counts as `0`. Return `-1` if `version1 < version2`, `1` if `version1 > version2`, and `0` if they're equal.

**Example 1:**
```
Input: version1 = "1.2", version2 = "1.10"
Output: -1
Explanation: version1's second revision is 2, version2's is 10, and 2 < 10 numerically.
```

**Example 2:**
```
Input: version1 = "1.01", version2 = "1.001"
Output: 0
Explanation: Both revisions equal 1 once leading zeros are ignored.
```

**Example 3:**
```
Input: version1 = "1.0", version2 = "1.0.0.0"
Output: 0
Explanation: The extra revisions in version2 are all 0, so they don't matter.
```

**Constraints:**
- 1 <= version1.length, version2.length <= 500
- Each revision consists only of digits, revisions are non-empty, and there's no leading/trailing dot or two consecutive dots

## Approach

The naive trap here is comparing the version strings lexicographically or comparing revisions as strings — that breaks immediately on something like `"1.2"` vs `"1.10"`, since `"2" > "10"` as strings but `2 < 10` as numbers. Revisions have to be compared as integers, and they need to line up positionally even when one version has more revisions than the other.

Split each version on `.` to get a list of revision strings, then walk both lists side by side using an index that goes up to the longer of the two lengths. At each position, pull the revision from each list if it exists, converting it to an integer (which naturally strips leading zeros), or treat it as `0` if that version ran out of revisions. Compare the two integers: if they differ, the answer is immediate (`-1` or `1`). If every position ties, the versions are equal and the answer is `0`.

**Time complexity:** O(n + m) where n and m are the lengths of the two version strings — splitting and scanning are both linear.

**Space complexity:** O(n + m) for the split revision lists.
