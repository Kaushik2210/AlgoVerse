class Solution:
    def kInversePairs(self, n: int, k: int) -> int:
        MOD = 10 ** 9 + 7

        # dp[j] = number of permutations of 1..i with exactly j inverse pairs,
        # rolled forward over i so only one row is kept at a time.
        dp = [0] * (k + 1)
        dp[0] = 1  # the empty permutation has 0 inverse pairs

        for i in range(1, n + 1):
            new_dp = [0] * (k + 1)
            new_dp[0] = 1
            for j in range(1, k + 1):
                # Inserting the value i into a permutation of 1..i-1 that
                # already has (j - x) inverse pairs, at a position that adds
                # x new inversions (x ranges from 0 to i-1), gives a running
                # permutation with j inverse pairs. Using the running sum:
                # new_dp[j] = new_dp[j-1] + dp[j] - dp[j-i]
                new_dp[j] = (new_dp[j - 1] + dp[j]) % MOD
                if j - i >= 0:
                    new_dp[j] = (new_dp[j] - dp[j - i]) % MOD
            dp = new_dp

        return dp[k] % MOD
