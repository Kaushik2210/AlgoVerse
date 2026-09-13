#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string addBinary(string a, string b) {
        int i = (int)a.size() - 1, j = (int)b.size() - 1;
        int carry = 0;
        string result;

        while (i >= 0 || j >= 0 || carry) {
            int bit1 = i >= 0 ? a[i] - '0' : 0;
            int bit2 = j >= 0 ? b[j] - '0' : 0;
            int total = bit1 + bit2 + carry;
            result += char('0' + total % 2);
            carry = total / 2;
            i--;
            j--;
        }

        reverse(result.begin(), result.end());
        return result;
    }
};
