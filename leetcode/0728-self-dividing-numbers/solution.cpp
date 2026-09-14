#include <vector>
using namespace std;

class Solution {
public:
    vector<int> selfDividingNumbers(int left, int right) {
        vector<int> result;
        for (int n = left; n <= right; n++) {
            if (isSelfDividing(n)) {
                result.push_back(n);
            }
        }
        return result;
    }

private:
    bool isSelfDividing(int n) {
        int x = n;
        while (x > 0) {
            int digit = x % 10;
            if (digit == 0 || n % digit != 0) {
                return false;
            }
            x /= 10;
        }
        return true;
    }
};
