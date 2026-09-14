class Solution {
    public int countPrimes(int n) {
        if (n < 3) {
            return 0;
        }

        boolean[] isPrime = new boolean[n];
        java.util.Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;

        for (int i = 2; (long) i * i < n; i++) {
            if (isPrime[i]) {
                for (int multiple = i * i; multiple < n; multiple += i) {
                    isPrime[multiple] = false;
                }
            }
        }

        int count = 0;
        for (boolean prime : isPrime) {
            if (prime) count++;
        }
        return count;
    }
}
