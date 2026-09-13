# 401. Binary Watch

A binary watch has 4 LEDs on top representing the hours (0-11) and 6 LEDs on the bottom representing the minutes (0-59). Each LED is either on or off, and the value shown is the sum of the powers of 2 for the LEDs that are lit. Given an integer `turnedOn`, the number of LEDs that are currently on, return all possible times the watch could be showing, in any order. A valid time has hours in `[0, 11]` and minutes in `[0, 59]`, and minutes must be shown with two digits (zero-padded).

**Example 1:**
```
Input: turnedOn = 1
Output: ["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]
```

**Example 2:**
```
Input: turnedOn = 9
Output: []
```

**Constraints:**
- 0 <= turnedOn <= 10

## Approach

There are only 12 possible hour values and 60 possible minute values, so brute force over the full space is cheap: just try every hour 0-11 and every minute 0-59, count the number of 1 bits across both, and keep the combination if that count equals `turnedOn`.

Counting set bits is a call to a popcount / bit_count operation (or `bin(x).count('1')` in Python). No need to build LED combinations explicitly — the number of "LEDs lit" for a given hour/minute pair is exactly the total number of 1 bits in their binary representations, since hours and minutes are literally just read off their own independent LED sets.

**Time complexity:** O(12 * 60) = O(1), a fixed small constant regardless of input.

**Space complexity:** O(1) auxiliary beyond the output list, whose size is bounded by the fixed search space.
