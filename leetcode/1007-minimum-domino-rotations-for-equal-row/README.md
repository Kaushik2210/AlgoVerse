# 1007. Minimum Domino Rotations For Equal Row

**Commonly asked at:** Amazon

You're given `tops` and `bottoms`, each of length `n`, representing `n` dominoes: the `i`-th domino has `tops[i]` on top and `bottoms[i]` on bottom. In one move you can swap the top and bottom of any domino. Return the minimum number of moves needed so that every value in `tops` is the same, or every value in `bottoms` is the same — whichever is achievable with fewer moves (either counts). If it's impossible, return -1.

**Example 1:**
```
Input: tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]
Output: 2
```

**Example 2:**
```
Input: tops = [3,5,1,2,3], bottoms = [3,6,3,3,4]
Output: -1
```

**Constraints:**
- 2 <= tops.length <= 2 * 10^4
- bottoms.length == tops.length
- 1 <= tops[i], bottoms[i] <= 6

## Approach

For every row to end up all the same value `x`, that value `x` has to already be present (on top or bottom) of *every* domino — there's no way to introduce a new value that wasn't on some domino to begin with. That's a strong constraint: the target value can only be one of two candidates, `tops[0]` or `bottoms[0]`, since the first domino has to contain the target no matter what.

So the whole problem reduces to trying those two candidates. For a candidate value `x`, scan every domino: if neither its top nor bottom equals `x`, `x` is impossible, return -1 for this candidate. Otherwise tally how many dominoes need a rotation to bring `x` to the top (its top isn't `x` but its bottom is) versus how many need a rotation to bring `x` to the bottom — the answer for this candidate is the smaller of those two counts (rotate the row that needs fewer flips).

Try `tops[0]` first; if it's achievable, that's the answer (`bottoms[0]` can never do strictly better when `tops[0]` already works, and when `tops[0]` fails outright it's worth trying `bottoms[0]` as the only other possible target). If `tops[0]` doesn't work, fall back to `bottoms[0]`; if that fails too, no value works and the answer is -1.

Verified against `tops=[2,1,2,4,2,2], bottoms=[5,2,6,2,3,2]` -> 2 and `tops=[3,5,1,2,3], bottoms=[3,6,3,3,4]` -> -1.

**Time complexity:** O(n) — two linear scans over the dominoes, one per candidate value.

**Space complexity:** O(1).
