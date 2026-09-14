class Solution {
    public boolean checkPerfectNumber(int num) {
        if (num <= 1) {
            return false;
        }

        long divisorSum = 1;
        for (long i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                divisorSum += i;
                long other = num / i;
                if (other != i) {
                    divisorSum += other;
                }
            }
        }

        return divisorSum == num;
    }
}
