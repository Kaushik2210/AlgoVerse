from typing import List


class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        stack = []

        for a in asteroids:
            alive = True

            # only a left-mover colliding with a right-mover on top of the stack matters
            while alive and a < 0 and stack and stack[-1] > 0:
                if stack[-1] < -a:
                    stack.pop()  # top explodes, keep checking against what's exposed now
                elif stack[-1] == -a:
                    stack.pop()  # both explode
                    alive = False
                else:
                    alive = False  # incoming asteroid explodes

            if alive:
                stack.append(a)

        return stack
