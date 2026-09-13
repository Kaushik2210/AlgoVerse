class Solution:
    def countNumbersWithUniqueDigits(self, n: int) -> int:
        if n == 0:
            return 1

        total = 10  # covers every 1-digit number, 0 through 9
        unique_count = 9  # count of valid k-digit numbers with unique digits
        available = 9  # digits left to choose from after the first

        for k in range(2, min(n, 10) + 1):
            unique_count *= available
            total += unique_count
            available -= 1

        return total
