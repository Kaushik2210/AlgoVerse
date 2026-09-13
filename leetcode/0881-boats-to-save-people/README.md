# 881. Boats to Save People

Given an array `people` where `people[i]` is a person's weight, and a weight `limit` per boat, find the minimum number of boats needed to carry everyone to shore. Each boat carries at most two people, as long as their combined weight doesn't exceed `limit`.

**Example 1:**
```
Input: people = [1,2], limit = 3
Output: 1
Explanation: both fit on one boat (1 + 2 = 3).
```

**Example 2:**
```
Input: people = [3,2,2,1], limit = 3
Output: 3
Explanation: (1,2), (2), (3)
```

**Constraints:**
- 1 <= people.length <= 5 * 10^4
- 1 <= people[i] <= limit <= 3 * 10^4

## Approach

Since each boat holds at most two people, the best a boat can do for the heaviest remaining person is pair them with whoever gives the biggest "discount" — the lightest remaining person. Sort everyone by weight, then use two pointers: `left` at the lightest, `right` at the heaviest.

At each step, try to pair the heaviest remaining person (`right`) with the lightest remaining person (`left`). If their combined weight fits under `limit`, both go on this boat — advance `left`. If it doesn't fit, the heaviest person can't be paired with anyone (since `left` is already the lightest possible partner, and if even that fails, no one lighter is left to try, while everyone else is at least as heavy), so they go alone on this boat. Either way, `right` always moves inward by one (the heaviest remaining person is always accounted for on this boat, whether solo or paired), and one boat gets used.

This greedy works because if the heaviest person can be paired with anyone, pairing them with the *lightest* available person is never worse than pairing them with someone heavier — it uses up the "cheapest" possible partner, leaving every other person (all of whom are heavier than `people[left]`) with more remaining boat capacity to find their own pairing later.

**Time complexity:** O(n log n) for the sort, dominating the O(n) two-pointer scan.

**Space complexity:** O(1) extra (ignoring the sort's own space).
