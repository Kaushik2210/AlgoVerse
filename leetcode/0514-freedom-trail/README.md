# 514. Freedom Trail

In the video game Fallout 4, the quest "Road to Freedom" requires players to reach a metal dial called the "Freedom Trail Ring" and use the dial to spell a specific keyword to open a door.

Given a string `ring` that represents the code engraved on the outer ring and another string `key` that represents the keyword that needs to be spelled, return the minimum number of steps to spell all the characters in the keyword.

Initially, the first character of the ring is aligned at the "12:00" direction. You should spell all the characters in `key` one by one by rotating `ring` clockwise or anticlockwise to make each character of the string key aligned at the "12:00" direction and then by pressing the center button.

At the stage of rotating the ring to spell the key character `key[i]`:
- You can rotate the ring clockwise or anticlockwise by one place, which counts as one step. The final purpose of the rotation is to align one of `ring`'s characters at the "12:00" direction, where this character must equal `key[i]`.
- If the character `key[i]` has been aligned at the "12:00" direction, press the center button to spell, which also counts as one step. After the pressing, you can begin to spell the next character in the key (next stage). Otherwise, you have finished all the spelling.

**Example:**
```
Input: ring = "godding", key = "gd"
Output: 4
Explanation: For ring "godding", initially "g" is aligned at 12:00.
Rotate ring counterclockwise by 1 to make "d" aligned at 12:00, 1 step. Then press the button, 1 step.
So the total steps for spelling "gd" is 4.
```

**Constraints:**
- 1 <= ring.length, key.length <= 100
- ring and key consist of only lowercase English letters.
- It's guaranteed that `key` could always be spelled by rotating `ring`.

## Approach

This is a dynamic programming problem over two dimensions: how far we've gotten through `key`, and which position on the ring the 12:00 pointer currently sits at. Directly it looks like `dp[i][j]` = minimum steps to have spelled `key[0..i]` with the pointer resting on ring index `j`, but `j` only ever matters when `ring[j] == key[i]`, so instead of a full `n x m` table, track a dict keyed only by the ring positions that actually hold the needed character.

Precompute, for each letter, the list of ring indices where it appears (`positions[ch]`).

Start with `dp = {0: 0}` — before spelling anything, the pointer is at ring index 0 having taken 0 steps.

For each character `ch` in `key`, build a new dp dict: for every ring index `pos` where `ring[pos] == ch`, look at every position `prev_pos` reachable from the previous stage and take:

```
new_dp[pos] = min over prev_pos of dp[prev_pos] + min(|pos - prev_pos|, n - |pos - prev_pos|) + 1
```

The `min(diff, n - diff)` term is the cheaper of rotating clockwise or counterclockwise around the circular ring to get from `prev_pos` to `pos`; the `+1` is the button press once the character is aligned.

After processing all characters in `key`, the answer is the minimum value remaining in the final dp dict — whichever occurrence of the last character was cheapest to reach.

**Time complexity:** O(m * k^2) where `m = len(key)` and `k` is the max number of occurrences of any character in `ring` (bounded by `n = len(ring)`), since each stage compares every occurrence of the current character against every occurrence of the previous one.

**Space complexity:** O(n) for the positions map and O(k) for each dp layer.
