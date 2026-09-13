class Solution:
    def countArrangement(self, n: int) -> int:
        used = [False] * (n + 1)
        self.count = 0

        def backtrack(pos: int) -> None:
            if pos > n:
                self.count += 1
                return
            for num in range(1, n + 1):
                if not used[num] and (num % pos == 0 or pos % num == 0):
                    used[num] = True
                    backtrack(pos + 1)
                    used[num] = False

        backtrack(1)
        return self.count
