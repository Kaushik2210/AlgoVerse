# 421. Maximum XOR of Two Numbers in an Array

**Commonly asked at:** Google, Amazon

Given an integer array `nums`, return the maximum result of `nums[i] XOR nums[j]`, where `0 <= i <= j < nums.length`.

**Example 1:**
```
Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: 5 XOR 25 = 28
```

**Example 2:**
```
Input: nums = [14,70,53,83,49,91,36,80,92,51,66,70]
Output: 127
```

**Constraints:**
- 1 <= nums.length <= 2 * 10^5
- 0 <= nums[i] <= 2^31 - 1

## Approach

Checking every pair directly is O(n^2), too slow for n up to 2*10^5. To do better, build a binary trie of each number's bits, most significant bit first, then for every number greedily search the trie for the partner that maximizes the XOR with it.

Insert every number into the trie bit by bit (say, 31 bits down to bit 0), creating a 0-child or 1-child at each level as needed. Then, for each number `x`, walk the trie again: at each bit position, XOR is maximized by picking the *opposite* bit of `x` at that position if such a child exists in the trie (because XORing two different bits gives 1, the best possible contribution at that position), otherwise fall back to the same-bit child (the only option available). Accumulate the resulting value bit by bit as you descend, and track the maximum found across all numbers.

This works because higher bits dominate the XOR value more than any combination of lower bits, so greedily maximizing from the most significant bit down is always optimal — never worth sacrificing a high bit to gain lower ones.

**Time complexity:** O(n * 32) = O(n) — inserting and querying each number costs O(32) trie steps.

**Space complexity:** O(n * 32) for the trie nodes in the worst case.
