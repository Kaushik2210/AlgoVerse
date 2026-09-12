class Solution {
    public int nthSuperUglyNumber(int n, int[] primes) {
        int k = primes.length;
        long[] ugly = new long[n];
        ugly[0] = 1;
        int[] pointers = new int[k];

        for (int i = 1; i < n; i++) {
            long nextUgly = Long.MAX_VALUE;
            for (int j = 0; j < k; j++) {
                nextUgly = Math.min(nextUgly, ugly[pointers[j]] * primes[j]);
            }
            ugly[i] = nextUgly;

            for (int j = 0; j < k; j++) {
                if (ugly[pointers[j]] * primes[j] == nextUgly) {
                    pointers[j]++;
                }
            }
        }

        return (int) ugly[n - 1];
    }
}
