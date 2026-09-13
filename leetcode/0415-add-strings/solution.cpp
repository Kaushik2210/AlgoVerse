#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string addStrings(string num1, string num2) {
        int i = (int)num1.size() - 1, j = (int)num2.size() - 1;
        int carry = 0;
        string result;

        while (i >= 0 || j >= 0 || carry) {
            int d1 = i >= 0 ? num1[i] - '0' : 0;
            int d2 = j >= 0 ? num2[j] - '0' : 0;
            int total = d1 + d2 + carry;
            result += char('0' + total % 10);
            carry = total / 10;
            i--;
            j--;
        }

        reverse(result.begin(), result.end());
        return result;
    }
};
