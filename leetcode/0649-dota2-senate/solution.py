from collections import deque


class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        n = len(senate)
        radiant = deque(i for i, ch in enumerate(senate) if ch == 'R')
        dire = deque(i for i, ch in enumerate(senate) if ch == 'D')

        while radiant and dire:
            r = radiant.popleft()
            d = dire.popleft()
            if r < d:
                radiant.append(r + n)
            else:
                dire.append(d + n)

        return "Radiant" if radiant else "Dire"
