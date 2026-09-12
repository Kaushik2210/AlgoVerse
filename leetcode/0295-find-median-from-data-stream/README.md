# 295. Find Median from Data Stream

Design a data structure that supports adding integers from a data stream and finding the median of all elements added so far. Implement the `MedianFinder` class:

- `MedianFinder()` — initializes the object.
- `void addNum(int num)` — adds `num` to the data structure.
- `double findMedian()` — returns the median of all elements so far. If the count is even, it's the average of the two middle values; if odd, it's the single middle value.

**Example:**
```
Input:
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]

Output:
[null, null, null, 1.5, null, 2.0]

Explanation:
MedianFinder mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
mf.findMedian();  // (1 + 2) / 2 = 1.5
mf.addNum(3);
mf.findMedian();  // sorted: [1,2,3], median = 2.0
```

**Constraints:**
- -10^5 <= num <= 10^5
- At most 5 * 10^4 calls total to addNum and findMedian
- findMedian is never called before addNum has been called at least once

## Approach

Sorting the whole stream every time `findMedian` is called (or even re-inserting into a sorted structure) is wasteful when all that's actually needed is the one or two values sitting right in the middle. The **two-heap trick** keeps exactly that boundary maintained incrementally, without ever needing the full sorted order.

Split all seen numbers into two halves: a **max-heap** holding the smaller half (so its top is the largest of the small numbers) and a **min-heap** holding the larger half (so its top is the smallest of the large numbers). Keep the two heaps balanced in size — equal, or the max-heap ahead by exactly one — so the median is always sitting right at one or both of their tops: if the max-heap is one larger, its top alone is the median; if they're equal in size, the median is the average of both tops.

For `addNum(num)`: push `num` onto the max-heap (the "small half") first, then immediately move the max-heap's top over to the min-heap — this guarantees every value in the min-heap is >= every value in the max-heap, keeping the two halves properly ordered relative to each other rather than just by insertion order. Then rebalance: if the min-heap ends up strictly larger than the max-heap, move its top back over to the max-heap, so the max-heap never falls behind and is at most one ahead.

For `findMedian`: if the max-heap has one more element, return its top. Otherwise return the average of both tops.

**Time complexity:** O(log n) per `addNum` (heap push/pop), O(1) per `findMedian`.

**Space complexity:** O(n) to store every number seen across the two heaps.
