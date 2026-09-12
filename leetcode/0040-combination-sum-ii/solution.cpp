#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> result;
        vector<int> path;
        backtrack(candidates, target, 0, path, result);
        return result;
    }

private:
    void backtrack(vector<int>& candidates, int remaining, int start,
                    vector<int>& path, vector<vector<int>>& result) {
        if (remaining == 0) {
            result.push_back(path);
            return;
        }

        for (int i = start; i < (int)candidates.size(); i++) {
            if (candidates[i] > remaining) {
                break;
            }
            if (i > start && candidates[i] == candidates[i - 1]) {
                continue;
            }

            path.push_back(candidates[i]);
            backtrack(candidates, remaining - candidates[i], i + 1, path, result);
            path.pop_back();
        }
    }
};
