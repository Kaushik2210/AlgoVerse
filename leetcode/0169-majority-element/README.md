# 169. Majority Element

Given an array `nums` of size `n`, find the element that appears more than `n / 2` times. It's guaranteed that the majority element always exists in the array.

**Example 1:**
```
Input: nums = [3,2,3]
Output: 3
```

**Example 2:**
```
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

**Constraints:**
- n == nums.length
- 1 <= n <= 5 * 10^4
- -10^9 <= nums[i] <= 10^9
- The array always has a majority element

## Approach

The straightforward way is to count how many times each value shows up using a hashmap, then scan the counts for the one that exceeds `n / 2`. That works fine and is O(n) time, but it also costs O(n) extra space for the counts.

The more elegant approach — since we're guaranteed a majority element exists — is **Boyer-Moore voting**. The idea: keep a `candidate` and a `count`. Walk through the array; if `count` is 0, adopt the current number as the new candidate. Then, if the current number matches the candidate, increment `count`, otherwise decrement it. Think of it like a tug of war — every occurrence of the candidate adds a vote, every occurrence of anything else cancels a vote. Because the majority element appears more than half the time, its votes can never be fully cancelled out by all the other elements combined, so whatever candidate survives to the end must be the majority element.

- Initialize `candidate = None`, `count = 0`.
- For each number: if `count == 0`, set `candidate = num`. Then add 1 to `count` if `num == candidate`, else subtract 1.
- Return `candidate` at the end.

**Time complexity:** O(n) — one pass through the array (the hashmap approach is also O(n) but with extra space).

**Space complexity:** O(1) for Boyer-Moore voting — just the candidate and a counter, no auxiliary structures.
