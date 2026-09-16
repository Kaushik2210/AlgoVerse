# 38. Count and Say

**Commonly asked at:** Amazon, Google, Meta

The count-and-say sequence starts with `"1"`. Each following term is built by reading off the previous term, describing runs of the same digit as "count then digit". Given `n`, return the nth term of the sequence.

**Example 1:**
```
Input: n = 1
Output: "1"
```

**Example 2:**
```
Input: n = 4
Output: "1211"
Explanation:
countAndSay(1) = "1"
countAndSay(2) = "11" (one 1)
countAndSay(3) = "21" (two 1s)
countAndSay(4) = "1211" (one 2, then one 1)
```

**Constraints:**
- 1 <= n <= 30

## Approach

There's no trick to skip here — the definition is inherently sequential, so the only way to get term `n` is to build every term before it, each one derived from the last.

Start with `"1"`. For each of the remaining `n - 1` steps, scan the current string left to right and group consecutive identical digits into runs. For each run, append its length followed by the digit itself to the output. Repeat this `n - 1` times and the final string is the answer.

**Time complexity:** O(n * L) where L is the length of the longest term produced — each of the n terms is built by a single linear scan over the previous one, and terms only grow.

**Space complexity:** O(L) to hold the current and next term.
