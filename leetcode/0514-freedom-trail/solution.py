from collections import defaultdict


class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        n = len(ring)
        positions = defaultdict(list)
        for i, ch in enumerate(ring):
            positions[ch].append(i)

        # dp maps "current ring index that key[j] sits on" -> min total steps
        # to have spelled key[0..j] and pressed the button, with the ring's
        # 12:00 pointer now resting on that index.
        dp = {0: 0}  # before typing anything, pointer sits at ring index 0

        for ch in key:
            new_dp = {}
            for pos in positions[ch]:
                best = float("inf")
                for prev_pos, cost in dp.items():
                    diff = abs(pos - prev_pos)
                    rotate = min(diff, n - diff)
                    best = min(best, cost + rotate + 1)
                new_dp[pos] = best
            dp = new_dp

        return min(dp.values())
