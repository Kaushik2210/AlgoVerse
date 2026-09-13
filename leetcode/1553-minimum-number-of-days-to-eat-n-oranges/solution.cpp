#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minDays(int n) {
        return (int)f(n);
    }

private:
    unordered_map<long long, long long> memo;

    long long f(long long n) {
        if (n <= 1) return n;
        auto it = memo.find(n);
        if (it != memo.end()) return it->second;
        long long result = 1 + min(n % 2 + f(n / 2), n % 3 + f(n / 3));
        memo[n] = result;
        return result;
    }
};
