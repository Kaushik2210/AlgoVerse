class Solution:
    def numWays(self, s: str) -> int:
        MOD = 10 ** 9 + 7
        n = len(s)
        total_ones = s.count('1')

        if total_ones % 3 != 0:
            return 0

        if total_ones == 0:
            # any two of the (n-1) gaps between characters can be the cut
            # points, and every choice is valid since there are no 1's to balance
            return ((n - 1) * (n - 2) // 2) % MOD

        each = total_ones // 3
        ones_idx = [i for i, c in enumerate(s) if c == '1']

        # the first cut can land anywhere in the gap between the `each`-th
        # and (each+1)-th one (0-indexed), same idea for the second cut
        first_cut_choices = ones_idx[each] - ones_idx[each - 1]
        second_cut_choices = ones_idx[2 * each] - ones_idx[2 * each - 1]

        return (first_cut_choices * second_cut_choices) % MOD
