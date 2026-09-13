#include <vector>
#include <queue>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    vector<int> smallestRange(vector<vector<int>>& nums) {
        int k = (int)nums.size();
        // min-heap of (value, listIndex, elementIndex)
        using Entry = tuple<int, int, int>;
        priority_queue<Entry, vector<Entry>, greater<Entry>> heap;

        int currentMax = INT_MIN;
        for (int i = 0; i < k; i++) {
            heap.push({nums[i][0], i, 0});
            currentMax = max(currentMax, nums[i][0]);
        }

        int bestStart = -1000000000, bestEnd = 1000000000;

        while (true) {
            auto [val, i, j] = heap.top();
            heap.pop();

            if (currentMax - val < bestEnd - bestStart) {
                bestStart = val;
                bestEnd = currentMax;
            }

            if (j + 1 == (int)nums[i].size()) {
                break;
            }

            int nextVal = nums[i][j + 1];
            currentMax = max(currentMax, nextVal);
            heap.push({nextVal, i, j + 1});
        }

        return {bestStart, bestEnd};
    }
};
