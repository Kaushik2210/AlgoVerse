#include <string>
using namespace std;

class Solution {
public:
    string strWithout3a3b(int a, int b) {
        string result;

        while (a > 0 || b > 0) {
            int n = (int)result.size();
            bool lastTwoSame = n >= 2 && result[n - 1] == result[n - 2];

            if (lastTwoSame) {
                if (result[n - 1] == 'a') {
                    result += 'b';
                    b--;
                } else {
                    result += 'a';
                    a--;
                }
            } else {
                if (a >= b && a > 0) {
                    result += 'a';
                    a--;
                } else {
                    result += 'b';
                    b--;
                }
            }
        }

        return result;
    }
};
