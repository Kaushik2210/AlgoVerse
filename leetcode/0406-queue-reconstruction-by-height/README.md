# 406. Queue Reconstruction by Height

**Commonly asked at:** Amazon, Google

Given a list of people described as `[height, k]`, where `k` is the number of people in front of this person who have a height greater than or equal to theirs, reconstruct the queue so every person's `k` value is satisfied.

**Example 1:**
```
Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
```

**Example 2:**
```
Input: people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
Output: [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]
```

**Constraints:**
- 1 <= people.length <= 2000
- 0 <= heights[i] <= 10^6
- 0 <= k[i] < people.length

## Approach

The `k` value for a person only counts people who are taller or equally tall standing in front of them — shorter people placed anywhere don't affect it at all. That asymmetry is the key: if the tallest people are placed first, no one placed after them (who is necessarily shorter or equal) can ever change how many "tall enough" people stand in front of an already-placed taller person, because a shorter/equal-height person can only be inserted after — never counted toward — a taller person's own `k`.

So sort everyone by height descending, and among equal heights, by `k` ascending. Then process people in that order, inserting each one directly at index `k` in the result list being built. Since only taller-or-equal people (which, among those processed so far, means only people from earlier in the sorted order, all already placed) matter for a person's own `k`, and inserting at index `k` puts exactly `k` such people in front of them (all previously placed people qualify, since they're all taller or equal), this single pass produces a valid queue with no need for lookahead or backtracking. Inserting shorter people afterward at any position never disturbs any already-satisfied `k` count, since shorter people never count toward anyone's `k`.

**Time complexity:** O(n^2) — sorting is O(n log n), but each of the n insertions into a list can shift up to O(n) elements, giving O(n^2) overall (using a more advanced structure like a balanced BIT could improve insertion, but a plain array is standard and sufficient here).

**Space complexity:** O(n) for the result list.
