#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    string multiply(string num1, string num2) {
        if (num1 == "0" || num2 == "0") {
            return "0";
        }

        int n1 = num1.size(), n2 = num2.size();
        vector<int> result(n1 + n2, 0);

        for (int i = n1 - 1; i >= 0; i--) {
            int d1 = num1[i] - '0';
            for (int j = n2 - 1; j >= 0; j--) {
                int d2 = num2[j] - '0';
                int total = d1 * d2 + result[i + j + 1];
                result[i + j + 1] = total % 10;
                result[i + j] += total / 10;
            }
        }

        int start = 0;
        while (start < (int)result.size() - 1 && result[start] == 0) {
            start++;
        }

        string out;
        for (int i = start; i < (int)result.size(); i++) {
            out += char('0' + result[i]);
        }

        return out;
    }
};
