#include <climits>
#include <cstdlib>
using namespace std;

class Solution {
public:
    int divide(int dividend, int divisor) {
        if (dividend == INT_MIN && divisor == -1) {
            return INT_MAX;
        }

        bool negative = (dividend < 0) != (divisor < 0);

        long long remaining = llabs((long long)dividend);
        long long div = llabs((long long)divisor);

        long long quotient = 0;
        while (remaining >= div) {
            long long chunk = div;
            long long multiple = 1;
            while (remaining >= (chunk << 1)) {
                chunk <<= 1;
                multiple <<= 1;
            }
            remaining -= chunk;
            quotient += multiple;
        }

        if (negative) {
            quotient = -quotient;
        }

        if (quotient > INT_MAX) return INT_MAX;
        if (quotient < INT_MIN) return INT_MIN;
        return (int)quotient;
    }
};
