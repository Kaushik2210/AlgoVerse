#include <vector>
using namespace std;

class Solution {
public:
    int countPrimes(int n) {
        if (n < 3) {
            return 0;
        }

        vector<bool> isPrime(n, true);
        isPrime[0] = isPrime[1] = false;

        for (long long i = 2; i * i < n; i++) {
            if (isPrime[i]) {
                for (long long multiple = i * i; multiple < n; multiple += i) {
                    isPrime[multiple] = false;
                }
            }
        }

        int count = 0;
        for (int i = 0; i < n; i++) {
            if (isPrime[i]) count++;
        }
        return count;
    }
};
