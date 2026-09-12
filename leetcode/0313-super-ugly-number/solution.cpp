#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    int nthSuperUglyNumber(int n, vector<int>& primes) {
        int k = primes.size();
        vector<long long> ugly(n);
        ugly[0] = 1;
        vector<int> pointers(k, 0);

        for (int i = 1; i < n; i++) {
            long long nextUgly = LLONG_MAX;
            for (int j = 0; j < k; j++) {
                nextUgly = min(nextUgly, ugly[pointers[j]] * (long long)primes[j]);
            }
            ugly[i] = nextUgly;

            for (int j = 0; j < k; j++) {
                if (ugly[pointers[j]] * (long long)primes[j] == nextUgly) {
                    pointers[j]++;
                }
            }
        }

        return (int)ugly[n - 1];
    }
};
