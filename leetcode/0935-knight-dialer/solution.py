class Solution:
    def knightDialer(self, n: int) -> int:
        MOD = 10 ** 9 + 7

        # Phone pad layout:
        # 1 2 3
        # 4 5 6
        # 7 8 9
        #   0
        # For each digit, the list of digits a knight move can land on next.
        moves = {
            0: [4, 6],
            1: [6, 8],
            2: [7, 9],
            3: [4, 8],
            4: [0, 3, 9],
            5: [],
            6: [0, 1, 7],
            7: [2, 6],
            8: [1, 3],
            9: [2, 4],
        }

        counts = [1] * 10  # counts[d] = number of dial sequences of current length ending on digit d

        for _ in range(n - 1):
            new_counts = [0] * 10
            for d in range(10):
                for nxt in moves[d]:
                    new_counts[nxt] = (new_counts[nxt] + counts[d]) % MOD
            counts = new_counts

        return sum(counts) % MOD
