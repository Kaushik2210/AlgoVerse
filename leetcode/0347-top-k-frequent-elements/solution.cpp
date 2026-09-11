#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> counts;
        for (int x : nums) counts[x]++;

        int n = nums.size();
        vector<vector<int>> buckets(n + 1);
        for (auto& [value, freq] : counts) {
            buckets[freq].push_back(value);
        }

        vector<int> result;
        for (int freq = n; freq >= 1 && (int)result.size() < k; freq--) {
            for (int value : buckets[freq]) {
                result.push_back(value);
                if ((int)result.size() == k) break;
            }
        }

        return result;
    }
};
