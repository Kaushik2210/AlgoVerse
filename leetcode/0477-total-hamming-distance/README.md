# 477. Total Hamming Distance

**Commonly asked at:** Apple, Meta, Bloomberg

Given an integer array `nums`, return the sum of the Hamming distances between all pairs of numbers in the array. The Hamming distance between two integers is the number of positions at which their bits differ.

**Example 1:**
```
Input: nums = [4, 14, 2]
Output: 6
Explanation:
4  = 0100
14 = 1110
2  = 0010
HammingDistance(4, 14) = 2
HammingDistance(4, 2)  = 2
HammingDistance(14, 2) = 2
Total = 6
```

**Example 2:**
```
Input: nums = [4, 14, 4]
Output: 4
```

**Constraints:**
- 1 <= nums.length <= 10^4
- 0 <= nums[i] <= 10^9

## Approach

Computing every pair's Hamming distance directly is O(n^2), which is too slow for n up to 10^4. The way out is to stop thinking pair-by-pair and instead think bit-position-by-bit-position.

For a single bit position, a pair of numbers contributes 1 to the total exactly when one of them has a 0 there and the other has a 1. If there are `ones` numbers in the array with a 1 at that position and `n - ones` with a 0, every one of the `ones * (n - ones)` cross pairs disagrees at that position and contributes 1 to the total distance — pairs that share the same bit contribute nothing there. So the total over all pairs, summed over just this one bit position, is `ones * (n - ones)`.

Do this independently for each of the up to 30 relevant bit positions (since nums[i] <= 10^9 < 2^30) and add up the contributions. This turns an O(n^2) pairwise comparison into an O(n * 30) counting pass.

**Time complexity:** O(n * 30) = O(n), where n is the length of nums, since the bit width is a constant.

**Space complexity:** O(1).
