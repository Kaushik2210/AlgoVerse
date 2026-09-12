#include <vector>
using namespace std;

class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        int xorAll = 0;
        for (int n : nums) {
            xorAll ^= n;
        }

        int diffBit = xorAll & (-xorAll);

        int a = 0;
        for (int n : nums) {
            if (n & diffBit) {
                a ^= n;
            }
        }

        int b = xorAll ^ a;
        return {a, b};
    }
};
