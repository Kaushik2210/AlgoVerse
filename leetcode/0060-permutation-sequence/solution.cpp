#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    string getPermutation(int n, int k) {
        vector<int> digits;
        for (int d = 1; d <= n; d++) {
            digits.push_back(d);
        }

        vector<int> factorial(n + 1);
        factorial[0] = 1;
        for (int i = 1; i <= n; i++) {
            factorial[i] = factorial[i - 1] * i;
        }

        k -= 1; // switch to 0-indexed rank
        string result;

        for (int i = n; i >= 1; i--) {
            int blockSize = factorial[i - 1];
            int index = k / blockSize;
            k %= blockSize;

            result += to_string(digits[index]);
            digits.erase(digits.begin() + index);
        }

        return result;
    }
};
