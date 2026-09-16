# 1776. Car Fleet II

**Commonly asked at:** Google

`n` cars are traveling on a single-lane road in the same direction, ordered by position from back to front (`cars[i] = [position, speed]`, with `position` strictly increasing across the array). A car can never pass the car ahead of it — if it catches up, it instantly slows down to match that car's speed and they travel together from then on (which can trigger further collisions later, chained forward). For every car, return the time it collides with the car (or fleet) immediately ahead of it, or `-1` if it never does.

**Example 1:**
```
Input: cars = [[1,2],[2,1],[4,3],[7,2]]
Output: [1.00000,-1.00000,3.00000,-1.00000]
Explanation: Car 0 (speed 2) catches car 1 (speed 1) at t=1. Car 2 (speed 3) catches car 3 (speed 2) at t=3, closing a gap of 3 at a relative speed of 1.
```

**Example 2:**
```
Input: cars = [[3,4],[5,4],[6,3],[9,1]]
Output: [2.00000,1.00000,1.50000,-1.00000]
```

**Constraints:**
- 1 <= cars.length <= 10^5
- 1 <= position[i], speed[i] <= 10^6
- position is sorted in strictly increasing order

## Approach

The subtlety here is that a car doesn't necessarily collide with the *physically next* car — that next car might collide with (and get absorbed into) something even further ahead first, changing its trajectory before the car behind ever reaches it. So "catching up" has to account for a chain of possible earlier collisions happening in front.

Process cars from the very front of the line backward (highest position/index to lowest), maintaining a stack of indices representing cars that are still *live candidates* to be the thing some earlier car might crash into. For each car `i`, repeatedly look at the stack's top, `j`:

- If `speed[i] <= speed[j]`, car `i` can never catch `j` no matter what happens later (it's not even faster in a vacuum), so `j` is useless as a target for `i` — pop it and keep looking further down the stack (which represents cars even further ahead that `j` itself might eventually merge into).
- Otherwise, compute the time it would take `i` to reach `j`'s *current, unmodified* trajectory: `(position[j] - position[i]) / (speed[i] - speed[j])`. If `j` already has a known collision time `ans[j]` that is less than or equal to this, that means `j` gets absorbed into whatever's ahead of it before `i` would ever reach it — so by the time `i` gets there, `j` isn't traveling on its original path anymore. Pop `j` and keep checking further down the stack (which now represents what `j` merged into, or beyond).
- Otherwise, this is a valid, still-live target: `i` will actually catch `j` before `j`'s own fate changes anything. Stop here.

Whatever remains on top of the stack (if anything) becomes `i`'s collision target, and its computed time is `ans[i]`. Then push `i` onto the stack, since it's now a candidate obstacle for anyone still to be processed behind it.

Each index is pushed and popped from the stack at most once across the whole run, which is what keeps this linear despite the nested-looking while loop.

**Time complexity:** O(n) — amortized, since each car is pushed once and popped at most once.

**Space complexity:** O(n) for the stack and the answer array.
