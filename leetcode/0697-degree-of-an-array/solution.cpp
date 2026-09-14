#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findShortestSubArray(vector<int>& nums) {
        unordered_map<int, int> firstIndex, lastIndex, count;

        for (int i = 0; i < (int) nums.size(); i++) {
            int x = nums[i];
            if (firstIndex.find(x) == firstIndex.end()) {
                firstIndex[x] = i;
            }
            lastIndex[x] = i;
            count[x]++;
        }

        int degree = 0;
        for (auto& [x, freq] : count) {
            degree = max(degree, freq);
        }

        int answer = (int) nums.size();
        for (auto& [x, freq] : count) {
            if (freq == degree) {
                answer = min(answer, lastIndex[x] - firstIndex[x] + 1);
            }
        }

        return answer;
    }
};
