#include <vector>
#include <cstdlib>
using namespace std;

class Solution {
public:
    Solution(vector<int>& w) {
        int sum = 0;
        for (int weight : w) {
            sum += weight;
            prefix.push_back(sum);
        }
        total = sum;
    }

    int pickIndex() {
        int target = rand() % total + 1;
        int lo = 0, hi = (int)prefix.size() - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (prefix[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

private:
    vector<int> prefix;
    int total;
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(w);
 * int param_1 = obj->pickIndex();
 */
