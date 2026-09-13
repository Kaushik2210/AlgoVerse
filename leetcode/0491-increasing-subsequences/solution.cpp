#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    vector<vector<int>> findSubsequences(vector<int>& nums) {
        backtrack(nums, 0);
        return result;
    }

private:
    vector<vector<int>> result;
    vector<int> path;

    void backtrack(vector<int>& nums, int start) {
        if (path.size() >= 2) {
            result.push_back(path);
        }

        unordered_set<int> seenThisLevel;
        for (int i = start; i < (int)nums.size(); i++) {
            if (seenThisLevel.count(nums[i])) {
                continue;
            }
            if (!path.empty() && nums[i] < path.back()) {
                continue;
            }
            seenThisLevel.insert(nums[i]);
            path.push_back(nums[i]);
            backtrack(nums, i + 1);
            path.pop_back();
        }
    }
};
