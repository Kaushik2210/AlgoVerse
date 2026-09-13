#include <string>
using namespace std;

class Solution {
public:
    string countAndSay(int n) {
        string result = "1";
        for (int k = 0; k < n - 1; k++) {
            string next;
            int i = 0;
            while (i < (int)result.size()) {
                int j = i;
                while (j < (int)result.size() && result[j] == result[i]) {
                    j++;
                }
                next += to_string(j - i);
                next += result[i];
                i = j;
            }
            result = next;
        }
        return result;
    }
};
