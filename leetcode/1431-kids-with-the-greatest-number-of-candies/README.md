# 1431. Kids With the Greatest Number of Candies

There are kids with candies, given as `candies`, and an extra amount `extraCandies`. For each kid, check whether giving that kid all `extraCandies` would make them have the greatest number of candies among all the kids (ties count). Return a boolean array with the answer for each kid.

**Example 1:**
```
Input: candies = [2,3,5,1,3], extraCandies = 3
Output: [true,true,true,false,true]
Explanation: The max is 5. Every kid except the one with 1 candy reaches >= 5 after adding 3.
```

**Example 2:**
```
Input: candies = [4,2,1,1,2], extraCandies = 1
Output: [true,false,false,false,false]
```

**Example 3:**
```
Input: candies = [12,1,12], extraCandies = 10
Output: [true,false,true]
```

**Constraints:**
- 2 <= candies.length <= 100
- 1 <= candies[i] <= 100
- 1 <= extraCandies <= 50

## Approach

The only thing that matters is the current maximum, computed once up front — it doesn't change based on any individual kid's decision, since every kid is evaluated independently and hypothetically ("if THIS kid got the extra candies"). So find `max(candies)` in one pass, then for each kid check whether `candies[i] + extraCandies >= greatest`.

**Time complexity:** O(n) — one pass to find the max, one pass to build the answer.

**Space complexity:** O(n) for the output array (O(1) extra beyond that).
