from typing import List


class Solution:
    def getCollisionTimes(self, cars: List[List[int]]) -> List[float]:
        n = len(cars)
        ans = [-1.0] * n
        stack = []  # indices of cars that are still "candidate obstacles"

        for i in range(n - 1, -1, -1):
            pos_i, speed_i = cars[i]

            while stack:
                j = stack[-1]
                pos_j, speed_j = cars[j]

                if speed_i <= speed_j:
                    # i can never catch j, so j is irrelevant to i
                    stack.pop()
                    continue

                time_to_j = (pos_j - pos_i) / (speed_i - speed_j)
                if ans[j] != -1 and time_to_j >= ans[j]:
                    # j collides with whoever's ahead of it before i would
                    # ever reach j, so j gets absorbed first — skip past it
                    stack.pop()
                    continue

                break

            if stack:
                j = stack[-1]
                pos_j, speed_j = cars[j]
                ans[i] = (pos_j - pos_i) / (speed_i - speed_j)

            stack.append(i)

        return ans
