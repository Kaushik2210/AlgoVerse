class Solution {
    private static final int MOD = 1337;

    public int superPow(int a, int[] b) {
        long result = 1;
        for (int digit : b) {
            result = (power(result, 10) * power(a, digit)) % MOD;
        }
        return (int) result;
    }

    private long power(long base, long exp) {
        base %= MOD;
        if (base < 0) base += MOD;
        long result = 1;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                result = (result * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return result;
    }
}
