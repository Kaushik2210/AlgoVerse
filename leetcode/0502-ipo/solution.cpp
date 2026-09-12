#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {
        int n = profits.size();
        vector<pair<int, int>> projects(n); // (capital, profit)
        for (int i = 0; i < n; i++) {
            projects[i] = {capital[i], profits[i]};
        }
        sort(projects.begin(), projects.end());

        priority_queue<int> heap;
        int i = 0;

        for (int round = 0; round < k; round++) {
            while (i < n && projects[i].first <= w) {
                heap.push(projects[i].second);
                i++;
            }

            if (heap.empty()) {
                break;
            }

            w += heap.top();
            heap.pop();
        }

        return w;
    }
};
