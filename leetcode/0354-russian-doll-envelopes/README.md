# 354. Russian Doll Envelopes

**Commonly asked at:** Google

You're given a list of envelopes, each represented as `[width, height]`. One envelope can fit inside another only if both its width and height are strictly smaller than the other's. Envelopes can't be rotated. Find the maximum number of envelopes you can nest inside each other (like a chain of Russian nesting dolls).

**Example 1:**
```
Input: envelopes = [[5,4],[6,4],[6,7],[2,3]]
Output: 3
Explanation: [2,3] -> [5,4] -> [6,7] gives a chain of 3.
```

**Example 2:**
```
Input: envelopes = [[1,1],[1,1],[1,1]]
Output: 1
```

**Constraints:**
- 1 <= envelopes.length <= 10^5
- envelopes[i].length == 2
- 1 <= width[i], height[i] <= 10^5

## Approach

Nesting a chain of envelopes where both dimensions must strictly increase looks like a 2D version of longest increasing subsequence — and it can be reduced to exactly that, with one careful trick for handling ties.

**Sort by width ascending, but for equal widths sort by height descending.** Once sorted this way, apply the classic O(n log n) LIS algorithm (patience sorting with binary search) to just the heights and find the longest strictly increasing run.

**Why the tie-breaking rule matters.** If two envelopes share the same width, neither can ever nest inside the other, no matter their heights (width isn't strictly smaller). If envelopes were sorted by width ascending and height ascending naively, same-width envelopes would appear in increasing height order, and a plain LIS over heights would happily treat that as a valid increasing run — incorrectly allowing same-width envelopes into the same nesting chain. Sorting same-width groups by height *descending* prevents this: within a group of equal widths, heights now appear in decreasing order, so LIS can pick at most one envelope from each same-width group, exactly matching the fact that same-width envelopes can never nest together.

After sorting, since width is now guaranteed non-decreasing across the whole array, whenever LIS finds an increasing run in the height sequence, the widths along that run are also non-decreasing — and because of the descending tie-break, any two heights in the same LIS run that came from equal widths would violate strict-increase in height, so LIS naturally rules them out. That leaves exactly the runs where both dimensions strictly increase.

Run standard patience-sorting LIS on the height sequence: maintain a list `tails`, where `tails[k]` is the smallest possible tail height of an increasing subsequence of length `k+1` seen so far. For each height, binary search for the first position in `tails` that is `>=` it and replace that position (or append if none found). The final length of `tails` is the answer.

**Time complexity:** O(n log n) — sorting is O(n log n), and each of the n heights does an O(log n) binary search.

**Space complexity:** O(n) for the `tails` array (and the sorted copy of envelopes).
