from typing import List


class Solution:
    def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
        cars = sorted(zip(position, speed), reverse=True)  # closest to target first

        fleets = 0
        current_time = 0.0

        for pos, spd in cars:
            time_to_target = (target - pos) / spd
            if time_to_target > current_time:
                # this car is slower than the fleet ahead of it, can't catch up
                fleets += 1
                current_time = time_to_target

        return fleets
