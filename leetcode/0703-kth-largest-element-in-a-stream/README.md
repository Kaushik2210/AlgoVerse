# 703. Kth Largest Element in a Stream

Design a class that finds the `k`th largest element in a stream of numbers. Implement `KthLargest`:
- `KthLargest(int k, int[] nums)` initializes the object with the integer `k` and an initial stream of numbers.
- `int add(int val)` appends `val` to the stream and returns the element representing the `k`th largest element in the stream so far.

**Example:**
```
Input: k = 3, nums = [4,5,8,2]
add(3)  -> 4
add(5)  -> 5
add(10) -> 5
add(9)  -> 8
add(4)  -> 8
```

**Constraints:**
- 1 <= k <= 10^4
- 0 <= nums.length <= 10^4
- -10^4 <= nums[i] <= 10^4
- -10^4 <= val <= 10^4
- At most 10^4 calls to `add`
- It's guaranteed there'll be at least `k` elements in the array when you search for the `k`th element

## Approach

Re-sorting the whole stream on every `add` call would work but is wasteful — O(n log n) per insertion when all you actually need is a single number: the `k`th largest so far.

The trick is to only ever keep the `k` largest elements seen so far, in a min-heap of size `k`. The smallest element among those top `k` — the heap's root — is by definition the `k`th largest overall, since everything else in the heap is bigger and everything not in the heap is smaller. So:

- On init, push every number from the initial array onto the heap, then pop down to size `k` (only the top `k` matter going forward).
- On `add(val)`, push `val` onto the heap. If the heap now has more than `k` elements, pop the smallest one off — it can't be the answer anymore since there are already `k` values bigger than or equal to it in the heap. Either way, the heap's root after this is the `k`th largest.

This keeps the heap small (size `k`) instead of tracking the entire stream, and each `add` is just a couple of O(log k) heap operations.

**Time complexity:** O(n log k) to build from the initial array (n pushes, each O(log k) once the heap caps at size k), and O(log k) per `add` call afterward.

**Space complexity:** O(k) — the heap never holds more than k elements.
