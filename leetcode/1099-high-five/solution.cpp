#include <vector>
#include <map>
#include <queue>
using namespace std;

class Solution {
public:
    vector<vector<int>> highFive(vector<vector<int>>& items) {
        map<int, priority_queue<int, vector<int>, greater<int>>> heaps;

        for (auto& item : items) {
            int studentId = item[0], score = item[1];
            auto& heap = heaps[studentId];
            heap.push(score);
            if (heap.size() > 5) {
                heap.pop();
            }
        }

        vector<vector<int>> result;
        for (auto& [studentId, heap] : heaps) {
            int sum = 0;
            auto copy = heap;
            while (!copy.empty()) {
                sum += copy.top();
                copy.pop();
            }
            result.push_back({studentId, sum / 5});
        }

        return result;
    }
};
