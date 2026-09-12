#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        auto dist = [](const vector<int>& p) { return p[0] * p[0] + p[1] * p[1]; };

        // max-heap keyed on squared distance
        auto cmp = [&](const vector<int>& a, const vector<int>& b) {
            return dist(a) < dist(b);
        };
        priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> heap(cmp);

        for (auto& p : points) {
            heap.push(p);
            if ((int)heap.size() > k) {
                heap.pop();
            }
        }

        vector<vector<int>> result;
        while (!heap.empty()) {
            result.push_back(heap.top());
            heap.pop();
        }
        return result;
    }
};
