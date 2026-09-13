#include <vector>
using namespace std;

class Solution {
public:
    int totalHammingDistance(vector<int>& nums) {
        int n = (int)nums.size();
        long long total = 0;
        for (int bit = 0; bit < 30; bit++) {
            int ones = 0;
            for (int num : nums) {
                ones += (num >> bit) & 1;
            }
            total += (long long)ones * (n - ones);
        }
        return (int)total;
    }
};
