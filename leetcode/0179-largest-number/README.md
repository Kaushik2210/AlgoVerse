# 179. Largest Number

**Commonly asked at:** Amazon, Google, Microsoft

You're given a list of non-negative integers `nums`. Arrange them so that when concatenated together, they form the largest possible number, and return that number as a string.

**Example 1:**
```
Input: nums = [10,2]
Output: "210"
```

**Example 2:**
```
Input: nums = [3,30,34,5,9]
Output: "9534330"
```

**Constraints:**
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 10^9

## Approach

Sorting numerically (largest first) doesn't work — `9` beats `30` numerically, but so does `30` beat `9` if you only look at magnitude versus something like `34`: the right ordering depends on how digits interact once concatenated, not on the numbers' sizes. For example, `9` should come before `30` (`930 > 309`), but `3` should come after `34` (`334 < 343`).

The trick is a custom comparator: given two numbers `a` and `b` as strings, compare `a + b` against `b + a`. Whichever concatenation is lexicographically larger tells you which number should come first — this pairwise ordering is exactly what "produces the largest overall number" reduces to, since only the two numbers' relative order to each other matters at any point in a valid total order (the comparator is transitive here, which is what makes a global sort valid).

So convert every number to a string, sort the list using that custom pairwise comparator (descending), then concatenate everything. One edge case: if the input is all zeros (like `[0, 0]`), naive concatenation gives `"00"`, but the answer should be `"0"` — so if the largest (first) piece after sorting is `"0"`, the whole answer collapses to `"0"`.

**Time complexity:** O(n log n · k) where k is the max number of digits, since each comparison during the sort does O(k) string work.

**Space complexity:** O(n · k) to hold the string versions of all the numbers.
