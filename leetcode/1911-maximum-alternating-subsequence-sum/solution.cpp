#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    long long maxAlternatingSum(vector<int>& nums) {
        long long even = 0, odd = 0;
        for (int x : nums) {
            long long newEven = max(even, odd + x);
            long long newOdd = max(odd, even - x);
            even = newEven;
            odd = newOdd;
        }
        return even;
    }
};
