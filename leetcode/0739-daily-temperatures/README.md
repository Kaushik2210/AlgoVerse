# 739. Daily Temperatures

Given an array `temperatures` representing daily temperatures, return an array `answer` where `answer[i]` is the number of days you'd have to wait after day `i` to get a warmer temperature. If there's no future day with a warmer temperature, put `0` instead.

**Example 1:**
```
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

**Example 2:**
```
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
```

**Example 3:**
```
Input: temperatures = [30,60,90]
Output: [1,1,0]
```

**Constraints:**
- 1 <= temperatures.length <= 10^5
- 30 <= temperatures[i] <= 100

## Approach

Checking every day against every future day is O(n^2) — for each day, scan forward until something warmer shows up.

A **monotonic stack of indices** gets this to O(n): walk through the temperatures once, keeping the stack's temperatures in decreasing order from bottom to top. Each index on the stack represents a day that's still "waiting" for a warmer day.

At day `i` with temperature `T[i]`: while the stack isn't empty and `T[i]` is warmer than the temperature at the index on top of the stack, that top index has just found its answer — pop it and set `answer[popped] = i - popped` (today is the first warmer day it's been waiting for). Keep popping while this holds, since today might resolve several previously-stuck colder days at once. Once the stack's top is no longer colder (or the stack is empty), push `i` — today is now waiting for its own future warmer day.

Any index left on the stack at the end never found a warmer day, so its answer stays at the default 0.

Each index is pushed once and popped at most once, so the total work across the whole pass is linear despite the nested-looking while loop.

**Time complexity:** O(n) — each index is pushed and popped from the stack at most once.

**Space complexity:** O(n) for the stack and the answer array.
