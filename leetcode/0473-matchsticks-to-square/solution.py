from typing import List


class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        total = sum(matchsticks)
        if total % 4 != 0:
            return False
        side = total // 4

        matchsticks.sort(reverse=True)
        if matchsticks[0] > side:
            return False

        n = len(matchsticks)
        sides = [0] * 4

        def backtrack(idx: int) -> bool:
            if idx == n:
                return True

            seen_sums = set()
            for i in range(4):
                if sides[i] in seen_sums:
                    continue
                if sides[i] + matchsticks[idx] > side:
                    continue

                seen_sums.add(sides[i])
                sides[i] += matchsticks[idx]
                if backtrack(idx + 1):
                    return True
                sides[i] -= matchsticks[idx]

                if sides[i] == 0:
                    break

            return False

        return backtrack(0)
