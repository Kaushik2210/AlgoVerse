import math


class Solution:
    def canMeasureWater(self, jug1Capacity: int, jug2Capacity: int, targetCapacity: int) -> bool:
        if targetCapacity > jug1Capacity + jug2Capacity:
            return False
        if targetCapacity == 0:
            return True
        if jug1Capacity == 0 or jug2Capacity == 0:
            return targetCapacity == jug1Capacity or targetCapacity == jug2Capacity
        return targetCapacity % math.gcd(jug1Capacity, jug2Capacity) == 0
