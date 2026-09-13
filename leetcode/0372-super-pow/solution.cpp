#include <vector>
using namespace std;

class Solution {
public:
    const long long MOD = 1337;

    long long power(long long base, long long exp) {
        base %= MOD;
        long long result = 1;
        while (exp > 0) {
            if (exp & 1) {
                result = (result * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return result;
    }

    int superPow(int a, vector<int>& b) {
        long long result = 1;
        for (int digit : b) {
            result = (power(result, 10) * power(a, digit)) % MOD;
        }
        return (int) result;
    }
};
