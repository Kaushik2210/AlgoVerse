#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) {
            swap(nums1, nums2);
        }

        unordered_map<int, int> counts;
        for (int x : nums1) {
            counts[x]++;
        }

        vector<int> result;
        for (int x : nums2) {
            auto it = counts.find(x);
            if (it != counts.end() && it->second > 0) {
                result.push_back(x);
                it->second--;
            }
        }

        return result;
    }
};
