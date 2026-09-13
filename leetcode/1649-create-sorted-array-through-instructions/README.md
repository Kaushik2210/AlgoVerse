# 1649. Create Sorted Array through Instructions

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given an integer array `instructions`. You build another array one element at a time by inserting `instructions[i]` into it in order, always keeping it sorted (like an insertion sort). The cost of inserting `instructions[i]` is `min(count of currently-inserted elements strictly less than instructions[i], count of currently-inserted elements strictly greater than instructions[i])`. Return the total cost of inserting every element, modulo 10^9 + 7.

**Example 1:**
```
Input: instructions = [1,5,6,2]
Output: 1
Explanation: insert 1 (cost 0) -> [1]. insert 5 (cost 0) -> [1,5]. insert 6 (cost 0) -> [1,5,6]. insert 2: less=1 (just "1"), greater=2 ("5","6"), cost=min(1,2)=1 -> total 1.
```

**Example 2:**
```
Input: instructions = [1,2,3,6,5,4]
Output: 3
```

**Constraints:**
- 1 <= instructions.length <= 10^5
- 1 <= instructions[i] <= 10^5

## Approach

For each element, the cost only depends on two counts of previously-inserted values — how many are less than it, and how many are greater — both of which are classic "count of elements <= x among what's been seen so far" range queries. A Fenwick tree (Binary Indexed Tree) over the value domain `[1, max(instructions)]` answers exactly that kind of prefix-count query in O(log(maxVal)), and supports point updates (adding one more occurrence of a value) just as fast.

Process `instructions` left to right, maintaining a BIT where index `v` accumulates how many times value `v` has been inserted so far. Before inserting `instructions[i]`:
- `less = bit.query(instructions[i] - 1)` — the count of everything strictly smaller (prefix sum up to one below the value).
- `greater = i - bit.query(instructions[i])` — `i` is how many elements have been inserted before this one, and `bit.query(instructions[i])` is how many of them are `<= instructions[i]`, so subtracting gives strictly greater.

Add `min(less, greater)` to the running cost, then insert `instructions[i]` into the BIT with a point update, and move to the next element. Take the total modulo 10^9+7 at the end (it's fine to sum without modding along the way since n and maxVal are both bounded by 10^5, keeping the running total well within a 64-bit range, though many implementations mod along the way as a habit).

**Time complexity:** O(n log(maxVal)) — each of the n elements does two O(log(maxVal)) BIT queries and one O(log(maxVal)) update.

**Space complexity:** O(maxVal) for the Fenwick tree array.
