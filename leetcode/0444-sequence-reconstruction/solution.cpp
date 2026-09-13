#include <vector>
#include <unordered_set>
#include <unordered_map>
#include <queue>
using namespace std;

class Solution {
public:
    bool sequenceReconstruction(vector<int>& nums, vector<vector<int>>& sequences) {
        int n = nums.size();
        vector<unordered_set<int>> graph(n + 1);
        vector<int> inDegree(n + 1, 0);
        unordered_set<int> seen;

        for (auto& seq : sequences) {
            for (int v : seq) seen.insert(v);
            for (int i = 0; i + 1 < (int)seq.size(); i++) {
                int a = seq[i], b = seq[i + 1];
                if (graph[a].insert(b).second) {
                    inDegree[b]++;
                }
            }
        }

        if ((int)seen.size() != n) return false;
        for (int v = 1; v <= n; v++) {
            if (!seen.count(v)) return false;
        }

        queue<int> q;
        for (int v = 1; v <= n; v++) {
            if (inDegree[v] == 0) q.push(v);
        }

        vector<int> order;
        while (!q.empty()) {
            if (q.size() != 1) return false;
            int v = q.front();
            q.pop();
            order.push_back(v);
            for (int nxt : graph[v]) {
                if (--inDegree[nxt] == 0) q.push(nxt);
            }
        }

        return order == nums;
    }
};
