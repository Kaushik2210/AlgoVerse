class Solution:
    def checkPerfectNumber(self, num: int) -> bool:
        if num <= 1:
            return False

        divisor_sum = 1  # 1 always divides num (and we exclude num itself)
        i = 2
        while i * i <= num:
            if num % i == 0:
                divisor_sum += i
                other = num // i
                if other != i:
                    divisor_sum += other
            i += 1

        return divisor_sum == num
