#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        int rob1 = 0, rob2 = 0;

        for (int n : nums) {
            int newRob2 = max(rob2, rob1 + n);
            rob1 = rob2;
            rob2 = newRob2;
        }

        return rob2;
    }
};
