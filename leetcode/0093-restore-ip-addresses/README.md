# 93. Restore IP Addresses

You're given a string `s` made only of digits. Return every way it can be split into a
valid IPv4 address — four dot-separated segments where each segment is:

- Between 1 and 3 digits long
- A value from 0 to 255
- Never has a leading zero, unless the segment is literally the single digit `"0"`

**Example**

```
Input: s = "25525511135"
Output: ["255.255.11.135", "255.255.111.35"]
```

## Brute force

You could try every possible way of placing 3 "cut points" among the digits (there are
at most `n-1` choose `3` ways), then check if the resulting 4 segments are all valid.
Works, but it wastes time building and checking splits that were doomed from the first
segment onward.

## The actual approach

This is backtracking, but with pruning built in from the start:

1. Keep a running list of segments already chosen and a `start` index into the string.
2. At each step, try taking the next segment as length 1, 2, or 3 characters.
3. A segment is valid only if: it doesn't have a leading zero (unless it's exactly
   `"0"`), and its integer value is between 0 and 255.
4. If a segment is valid, add it to the list and recurse further into the string. If
   the recursive branch doesn't pan out, pop the segment back off and try the next
   length — that's the "backtrack" part.
5. Stop successfully once you've placed exactly 4 segments AND consumed the entire
   string — both conditions matter, since 4 segments that don't use every character
   isn't a real answer.

One extra pruning trick that keeps this fast: if the remaining characters can't
possibly fit in the remaining segment slots (more than `3 * segments_left` characters
left), bail out of that branch immediately instead of exploring it.

## Complexity

- **Time:** O(1) in the sense that a string can only be so long before it stops having
  any valid splits at all (max useful length is 12 digits), but thinking of it as
  branching: each of the 4 segments only ever tries 3 possible lengths, so it's
  bounded by a small constant — roughly O(3^4) branches explored in the worst case.
- **Space:** O(1) extra beyond the output itself (a handful of segments on the
  recursion stack at any time), plus whatever space the result list itself needs.
