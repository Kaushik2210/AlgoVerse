class Solution {
public:
    bool checkPerfectNumber(int num) {
        if (num <= 1) {
            return false;
        }

        long long divisorSum = 1;
        for (long long i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                divisorSum += i;
                long long other = num / i;
                if (other != i) {
                    divisorSum += other;
                }
            }
        }

        return divisorSum == num;
    }
};
