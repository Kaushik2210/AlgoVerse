from typing import List


class Solution:
    def numsSameConsecDiff(self, n: int, k: int) -> List[int]:
        # Start with every valid 1-digit number (no leading-zero issue yet).
        current = list(range(1, 10))

        for _ in range(n - 1):
            next_level = []
            for num in current:
                last_digit = num % 10
                for diff in {k, -k}:
                    new_digit = last_digit + diff
                    if 0 <= new_digit <= 9:
                        next_level.append(num * 10 + new_digit)
            current = next_level

        return current
