# 367. Valid Perfect Square

You're given a positive integer `num`. Return `true` if `num` is a perfect square, and `false` otherwise. You can't use any built-in square root function like `sqrt`.

**Example 1:**
```
Input: num = 16
Output: true
```

**Example 2:**
```
Input: num = 14
Output: false
```

**Constraints:**
- 1 <= num <= 2^31 - 1

## Approach

The brute-force way is to try every integer `i` starting from 1, squaring it, and checking if it equals `num` — stopping once `i * i` exceeds `num`. That's O(sqrt(num)) which is fine for small inputs but wasteful for something close to the 2^31 bound.

Since squaring is monotonically increasing over positive integers, the search space is sorted — binary search applies directly. Search for an integer `mid` in `[1, num]` such that `mid * mid == num`: if `mid * mid` is too small, the answer must be larger, so search the upper half; if too big, search the lower half.

The only trap is overflow — for `num` near 2^31 - 1, `mid * mid` can exceed the range of a 32-bit int in Java/C++, so the multiplication has to happen in a wider type (`long` / `long long`); Python doesn't have this issue since ints are arbitrary precision.

Verified against `num = 16` -> `True`, `num = 14` -> `False`, `num = 1` -> `True`, `num = 2` -> `False`, and the large cases `num = 2147395600` (= 46340^2) -> `True` and `num = 808201` (= 899^2) -> `True` — all match.

**Time complexity:** O(log num) — binary search halves the range each step.

**Space complexity:** O(1).
