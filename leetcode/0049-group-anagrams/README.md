# 49. Group Anagrams

Given an array of strings `strs`, group the anagrams together. You can return the groups in any order, and the strings within each group can be in any order too.

**Example 1:**
```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

**Example 2:**
```
Input: strs = [""]
Output: [[""]]
```

**Constraints:**
- 1 <= strs.length <= 10^4
- 0 <= strs[i].length <= 100
- `strs[i]` consists of lowercase English letters

## Approach

The brute-force idea is to compare every string against every other string to see if they're anagrams of each other (e.g. by sorting each one and comparing), then bucket the matches — that's roughly O(n^2) comparisons, which gets slow once there are thousands of strings.

The better move is to give every string a "canonical signature" that's identical for all of its anagrams and different otherwise, then just group by that signature using a hash map. The simplest signature: sort the characters of the string. Two words are anagrams exactly when their sorted forms are equal — "eat", "tea", and "ate" all sort to "aet". So for each string, sort its letters to get a key, and append the original string to the map bucket for that key. At the end, the map's values are exactly the anagram groups.

(A neat alternative signature that avoids sorting is a 26-length character count tuple — same idea, just a different way to canonicalize — but sorting is simpler to write and plenty fast here.)

**Time complexity:** O(n * k log k) — n strings, each of average length k, and sorting each one costs O(k log k).

**Space complexity:** O(n * k) — storing all the strings (and their keys) in the hash map.
