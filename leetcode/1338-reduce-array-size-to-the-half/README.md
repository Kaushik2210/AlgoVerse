# 1338. Reduce Array Size to The Half

You're given an integer array `arr`. You can pick a set of distinct integers and remove every occurrence of each chosen integer from `arr`. Return the minimum size of such a set so that at least half of `arr`'s elements are removed.

**Example 1:**
```
Input: arr = [3,3,3,3,5,5,5,2,2,7]
Output: 2
Explanation: arr has 10 elements. Choosing to remove 3 and 5 removes 4 + 3 = 7 elements, which is at least half (5). No single value removes enough on its own.
```

**Example 2:**
```
Input: arr = [7,7,7,7,7,7]
Output: 1
```

**Constraints:**
- 2 <= arr.length <= 10^5
- arr.length is even
- 1 <= arr[i] <= 10^5

## Approach

To remove as many elements as possible with as few distinct values as possible, always pick the values with the highest occurrence counts first — removing a value that appears many times clears more of the array per "pick" than removing a rare one, so sorting by frequency, largest first, and greedily taking from the top is optimal: any other selection of the same size removes at most as many elements, since swapping in a lower-frequency value for a higher-frequency one can only reduce the total removed.

Concretely: count the frequency of each distinct value with a hash map, then sort those frequencies in descending order. Walk down that sorted list, accumulating a running total of elements removed, and stop as soon as that running total reaches at least half of `arr`'s length — the number of values taken to get there is the answer.

**Time complexity:** O(n log n) — dominated by sorting the up-to-n distinct frequencies (counting itself is O(n)).

**Space complexity:** O(n) for the frequency map and the sorted list of counts.
