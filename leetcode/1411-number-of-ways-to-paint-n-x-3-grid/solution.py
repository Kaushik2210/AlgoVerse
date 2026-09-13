class Solution:
    def numOfWays(self, n: int) -> int:
        MOD = 10 ** 9 + 7

        # every valid row of 3 cells (no two adjacent cells same color, 3 colors)
        # falls into one of two shapes:
        #   "aba" - two distinct colors, ends match (e.g. red-green-red)   -> 6 combos
        #   "abc" - three distinct colors (e.g. red-green-blue)            -> 6 combos
        aba = 6
        abc = 6

        for _ in range(n - 1):
            new_aba = (aba * 3 + abc * 2) % MOD
            new_abc = (aba * 2 + abc * 2) % MOD
            aba, abc = new_aba, new_abc

        return (aba + abc) % MOD
