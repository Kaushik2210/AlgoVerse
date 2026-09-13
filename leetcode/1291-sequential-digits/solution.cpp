#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<int> sequentialDigits(int low, int high) {
        string digits = "123456789";
        vector<int> result;
        int minLen = to_string(low).size();
        int maxLen = to_string(high).size();

        for (int length = minLen; length <= maxLen; length++) {
            for (int start = 0; start <= 9 - length; start++) {
                int num = stoi(digits.substr(start, length));
                if (num >= low && num <= high) {
                    result.push_back(num);
                }
            }
        }

        return result;
    }
};
