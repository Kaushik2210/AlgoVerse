# 935. Knight Dialer

The chess knight has a unique movement, it may move two squares vertically and one square horizontally, or two squares horizontally and one square vertically (with both forming the shape of an L). The possible movements of chess knight are shown in this diagram.

A chess knight can move as indicated in the chess diagram below. We have a chess knight and a phone pad as shown below, the knight can only stand on a numeric cell (i.e. blue cell).

```
1 2 3
4 5 6
7 8 9
  0
```

Given an integer `n`, return how many distinct phone numbers of length `n` we can dial. You are allowed to place the knight on any numeric cell initially and then you should perform `n - 1` jumps to dial a number of length `n`. All jumps should be valid knight jumps. As the answer may be very large, return the answer modulo `10^9 + 7`.

**Example 1:**
```
Input: n = 1
Output: 10
Explanation: We need to dial a number of length 1, so placing the knight over any numeric cell of the 10 cells is sufficient.
```

**Example 2:**
```
Input: n = 2
Output: 20
Explanation: All the valid number we can dial are [04, 06, 16, 18, 27, 29, 34, 38, 40, 43, 49, 60, 61, 67, 81, 83, 89, 92, 94, 98]
```

**Constraints:**
- 1 <= n <= 5000

## Approach

Build the knight's move graph for the phone pad by hand once: from each digit, list the digits a single valid knight jump can reach. The center digit `5` has no valid knight moves at all.

From there this is a straightforward DP over sequence length: `counts[d]` holds the number of length-`k` dial sequences that currently end on digit `d`. Starting at length 1, every digit has exactly one sequence ending on it (itself), so `counts = [1] * 10`.

For each additional digit needed (`n - 1` more steps), build a new counts array: for every digit `d` and every digit `nxt` reachable from `d` by a knight move, add `counts[d]` to `new_counts[nxt]` — every sequence that used to end on `d` can be extended by jumping to `nxt`, producing a distinct sequence ending on `nxt`.

After `n - 1` rounds, the total number of valid dial sequences of length `n` is the sum across all ten digits of how many sequences end there, taken modulo `10^9 + 7`.

**Time complexity:** O(n) since each of the `n - 1` rounds does O(1) work (10 digits, each with at most 3 outgoing moves).

**Space complexity:** O(1), just the fixed-size 10-entry counts array and move table.
