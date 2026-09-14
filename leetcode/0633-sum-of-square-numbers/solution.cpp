#include <cmath>
using namespace std;

class Solution {
public:
    bool judgeSquareSum(int c) {
        long long a = 0;
        long long b = (long long) sqrt((double) c);
        while (b * b > c) b--;
        while ((b + 1) * (b + 1) <= c) b++;

        while (a <= b) {
            long long total = a * a + b * b;
            if (total == c) {
                return true;
            } else if (total < c) {
                a++;
            } else {
                b--;
            }
        }

        return false;
    }
};
