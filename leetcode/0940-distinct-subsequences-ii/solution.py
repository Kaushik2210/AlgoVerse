class Solution:
    def distinctSubseqII(self, s: str) -> int:
        MOD = 10 ** 9 + 7

        # end_with[c] = number of distinct non-empty subsequences seen so far
        # that end with character c.
        end_with = {}
        total = 0

        for ch in s:
            prev_total = total
            new_count = (prev_total + 1) % MOD  # extend every existing subsequence with ch, plus ch alone

            total = (total - end_with.get(ch, 0) + new_count) % MOD
            end_with[ch] = new_count

        return total % MOD
