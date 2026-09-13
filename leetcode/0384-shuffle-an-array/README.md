# 384. Shuffle an Array

Design an algorithm to shuffle an array of unique numbers, uniformly at random over all possible permutations. Implement `Solution(nums)` (store the original), `reset()` (return the original configuration), and `shuffle()` (return a random shuffle, each permutation equally likely).

**Example:**
```
Solution s = new Solution([1,2,3]);
s.shuffle();  // returns a random permutation, e.g. [3,1,2]
s.reset();    // returns [1,2,3]
s.shuffle();  // returns another random permutation
```

## Approach

A naive shuffle — repeatedly pick a random index and swap it to the front, without tracking which indices have already been placed — can produce a biased distribution where some permutations are more likely than others. Getting a truly uniform shuffle requires being careful about which positions are still "up for grabs" at each step.

The **Fisher-Yates (Knuth) shuffle** does this correctly in one linear pass: walk the array from the last index down to the first (or first up to last, either direction works symmetrically), and at each position `i`, pick a uniformly random index `j` from the *remaining unshuffled range* (`0` to `i` inclusive, if walking backwards) and swap `nums[i]` with `nums[j]`. Because each element is placed into its final position by a swap with a uniformly random choice among all positions not yet finalized, every permutation of n elements is equally likely — this is a well-known proof by induction on the number of elements placed.

The key correctness detail that separates this from a buggy shuffle: the random index `j` at step `i` must be drawn from `[0, i]` (inclusive of the current position, shrinking the range as the walk progresses), not from the full array range every time — sampling from the full range every time is exactly the kind of subtle bug that breaks uniformity.

`reset()` just returns a copy of the original array stored at construction time. `shuffle()` runs Fisher-Yates on a fresh copy of that original each time (so repeated shuffles don't compound on a previous shuffle's result) and returns it.

**Time complexity:** O(n) for both `shuffle()` and `reset()`.

**Space complexity:** O(n) to store the original array and the working copy.
