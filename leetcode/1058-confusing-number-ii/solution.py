class Solution:
    def confusingNumberII(self, n: int) -> int:
        valid_digits = [0, 1, 6, 8, 9]
        rotation = {0: 0, 1: 1, 6: 9, 8: 8, 9: 6}
        self.count = 0

        def is_confusing(num: int) -> bool:
            rotated = 0
            temp = num
            while temp:
                rotated = rotated * 10 + rotation[temp % 10]
                temp //= 10
            return rotated != num

        def backtrack(current: int) -> None:
            if current > n:
                return
            if current != 0 and is_confusing(current):
                self.count += 1

            for d in valid_digits:
                if current == 0 and d == 0:
                    continue  # never build a number with a leading zero
                next_num = current * 10 + d
                if next_num > n:
                    continue
                backtrack(next_num)

        backtrack(0)
        return self.count
