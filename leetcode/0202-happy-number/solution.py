class Solution:
    def isHappy(self, n: int) -> bool:
        def next_value(x: int) -> int:
            total = 0
            while x > 0:
                x, digit = divmod(x, 10)
                total += digit * digit
            return total

        slow, fast = n, next_value(n)
        while fast != 1 and slow != fast:
            slow = next_value(slow)
            fast = next_value(next_value(fast))
        return fast == 1
