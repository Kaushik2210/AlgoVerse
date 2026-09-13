# 1122. Relative Sort Array

You're given two arrays, `arr1` and `arr2`, where `arr2` contains distinct elements and every element of `arr2` also appears in `arr1`. Sort the elements of `arr1` so that items appear in the same relative order as they do in `arr2`. Elements of `arr1` that don't appear in `arr2` should go at the end, sorted in ascending order.

**Example 1:**
```
Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
Output: [2,2,2,1,4,3,3,9,6,7,19]
```

**Example 2:**
```
Input: arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]
Output: [22,28,8,6,17,44]
```

**Constraints:**
- 1 <= arr1.length, arr2.length <= 1000
- 0 <= arr1[i], arr2[i] <= 1000
- All the elements of arr2 are distinct
- Each element of arr2 is also in arr1

## Approach

This is essentially a custom sort key problem, same shape as Custom Sort String but over numbers instead of letters. Count how many times each value appears in `arr1`. Then walk through `arr2` in order, and for each value, append that many copies to the result (since `arr2` gives the exact relative ordering desired for those values), removing it from the count map as it's used up.

Whatever's left in the count map afterward is values from `arr1` that never appeared in `arr2` — expand those counts back into individual elements and sort them ascending, then append them to the end.

**Time complexity:** O(n + m log m) where n is the length of `arr1` and m is the number of leftover (unmatched) elements — counting and placing the `arr2`-ordered elements is linear, and only the leftovers need an actual sort.

**Space complexity:** O(n) for the count map and the result array.
