#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    string fractionToDecimal(int numerator, int denominator) {
        if (numerator == 0) return "0";

        string result;
        if ((numerator < 0) != (denominator < 0)) {
            result += "-";
        }

        long long num = abs((long long)numerator);
        long long den = abs((long long)denominator);
        result += to_string(num / den);
        long long remainder = num % den;

        if (remainder == 0) {
            return result;
        }

        result += ".";
        unordered_map<long long, int> seen;
        string frac;

        while (remainder != 0) {
            if (seen.count(remainder)) {
                int idx = seen[remainder];
                frac.insert(frac.begin() + idx, '(');
                frac += ")";
                break;
            }
            seen[remainder] = frac.size();
            remainder *= 10;
            frac += to_string(remainder / den);
            remainder %= den;
        }

        result += frac;
        return result;
    }
};
