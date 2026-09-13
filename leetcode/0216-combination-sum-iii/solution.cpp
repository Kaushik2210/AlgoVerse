#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> combinationSum3(int k, int n) {
        backtrack(1, k, n);
        return result;
    }

private:
    vector<vector<int>> result;
    vector<int> path;

    void backtrack(int start, int remainingCount, int remainingSum) {
        if (remainingCount == 0) {
            if (remainingSum == 0) {
                result.push_back(path);
            }
            return;
        }

        if (remainingSum <= 0) {
            return;
        }

        for (int candidate = start; candidate <= 9; candidate++) {
            if (candidate > remainingSum) {
                break;
            }

            path.push_back(candidate);
            backtrack(candidate + 1, remainingCount - 1, remainingSum - candidate);
            path.pop_back();
        }
    }
};
