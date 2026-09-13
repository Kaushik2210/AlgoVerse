# 1700. Number of Students Unable to Eat Lunch

The cafeteria has a stack of sandwiches (`sandwiches[i]` is 0 for circular or 1 for square) and a queue of students (`students[i]` is each student's preference, 0 or 1). Each round, the student at the front of the queue looks at the sandwich on top of the stack: if they want it, they take it and leave; otherwise they go to the back of the queue. This repeats until either the stack is empty, or every remaining student has already refused the top sandwich once (meaning no one will ever take it). Return how many students are left unable to eat.

**Example 1:**
```
Input: students = [1,1,0,0], sandwiches = [0,1,0,1]
Output: 0
```

**Example 2:**
```
Input: students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]
Output: 3
```

**Constraints:**
- 1 <= students.length, sandwiches.length <= 100
- students.length == sandwiches.length
- sandwiches[i] and students[i] are 0 or 1

## Approach

Simulating the queue literally (rotating students to the back one at a time) works, but there's a cleaner way to see it: a student's actual *position* in the queue never matters, only how many students currently in the queue want each sandwich type. Since students only cycle to the back and never leave except by eating, the moment the top sandwich has zero takers left among the remaining students, the process is deadlocked — every remaining student will just keep rotating forever, since none of them want what's on top and rotating doesn't change what's on top.

So instead of a queue, keep a count of how many remaining students prefer 0 and how many prefer 1. Walk through `sandwiches` in order: if there's a remaining student who wants the current top sandwich, decrement that count (one of them "eats" it — which specific student doesn't matter). If the count for the current sandwich's type is already zero, stop immediately — nobody left wants it, so nobody eats another sandwich ever again. The answer is whatever students remain in the two counts when the loop ends (either because the stack ran out, or because it broke early).

**Time complexity:** O(n) — the sandwich stack is scanned at most once.

**Space complexity:** O(1) — just two counters, regardless of input size.
