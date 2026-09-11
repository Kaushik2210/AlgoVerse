#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;

        for (int n : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), n);
            if (it == tails.end()) {
                tails.push_back(n);
            } else {
                *it = n;
            }
        }

        return tails.size();
    }
};
