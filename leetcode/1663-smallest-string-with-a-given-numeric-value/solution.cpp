#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string getSmallestString(int n, int k) {
        string result(n, 'a');
        int remaining = k - n;

        for (int i = n - 1; i >= 0 && remaining > 0; i--) {
            int add = min(25, remaining);
            result[i] = (char)('a' + add);
            remaining -= add;
        }

        return result;
    }
};
