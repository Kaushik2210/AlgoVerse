# 735. Asteroid Collision

You're given an array `asteroids` of integers representing asteroids in a row. For each asteroid, the absolute value is its size, and the sign is its direction (positive = moving right, negative = moving left). Every asteroid moves at the same speed. Find out the state of the asteroids after all collisions: two asteroids moving in the same direction never meet, but if two moving toward each other meet, the smaller one explodes (if both are the same size, both explode); an asteroid moving right will never meet another asteroid moving right or one to its left already moving away.

**Example 1:**
```
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: 10 and -5 collide, 10 survives (it's bigger). 5 and 10 never collide (both moving right).
```

**Example 2:**
```
Input: asteroids = [8,-8]
Output: []
Explanation: 8 and -8 collide, both explode (same size).
```

**Example 3:**
```
Input: asteroids = [10,2,-5]
Output: [10]
Explanation: 2 and -5 collide, -5 survives (bigger). 10 and -5 collide, 10 survives.
```

**Constraints:**
- 2 <= asteroids.length <= 10^4
- -10^4 <= asteroids[i] <= 10^4
- asteroids[i] != 0

## Approach

The only asteroids that can ever collide are a right-mover (positive) that's followed later by a left-mover (negative) — anything else (two moving the same direction, or a left-mover followed by a right-mover) can never catch up to each other since everything moves at the same speed. That "followed later" structure is exactly what a stack captures: walk the asteroids left to right, and use a stack to hold the asteroids that are still alive and moving right (they're the only ones that can still get hit from the right).

For each new asteroid:
- If it's moving right (positive), or the stack is empty, or the top of the stack is already moving left (no possible collision), just push it.
- If it's moving left (negative) and the stack's top is moving right, they collide — repeatedly compare sizes:
  - if the stack's top is smaller, it explodes (pop it) and keep checking the new top against the same incoming asteroid, since it might collide again with what's now exposed;
  - if they're equal size, both explode (pop the stack, and don't push the incoming one either);
  - if the stack's top is bigger, the incoming asteroid explodes and nothing gets pushed.
- The loop over "keep colliding while stack top is right-moving and smaller" naturally handles chains — one asteroid can destroy several smaller right-movers in a row before either surviving itself or eventually getting destroyed by a bigger one.

Whatever's left on the stack at the end, in order, is the final state.

**Time complexity:** O(n) — each asteroid is pushed once and popped at most once.

**Space complexity:** O(n) for the stack.
