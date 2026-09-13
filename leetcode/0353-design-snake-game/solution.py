from collections import deque
from typing import List


class SnakeGame:
    def __init__(self, width: int, height: int, food: List[List[int]]):
        self.width = width
        self.height = height
        self.food = food
        self.food_index = 0
        self.score = 0
        self.body = deque([(0, 0)])       # head is body[-1], tail is body[0]
        self.body_set = {(0, 0)}
        self.directions = {
            'U': (-1, 0),
            'D': (1, 0),
            'L': (0, -1),
            'R': (0, 1),
        }

    def move(self, direction: str) -> int:
        dr, dc = self.directions[direction]
        head_r, head_c = self.body[-1]
        new_head = (head_r + dr, head_c + dc)
        new_r, new_c = new_head

        # Wall collision.
        if new_r < 0 or new_r >= self.height or new_c < 0 or new_c >= self.width:
            return -1

        # Does the new head land on the current food?
        eats_food = (
            self.food_index < len(self.food)
            and [new_r, new_c] == self.food[self.food_index]
        )

        # The tail cell is about to vacate (unless we're growing this move),
        # so colliding with it is fine.
        tail = self.body[0]
        if new_head in self.body_set and not (new_head == tail and not eats_food):
            return -1

        self.body.append(new_head)
        self.body_set.add(new_head)

        if eats_food:
            self.food_index += 1
            self.score += 1
        else:
            old_tail = self.body.popleft()
            self.body_set.discard(old_tail)

        return self.score


# Your SnakeGame object will be instantiated and called as such:
# obj = SnakeGame(width, height, food)
# param_1 = obj.move(direction)
