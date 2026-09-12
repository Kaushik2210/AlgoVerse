#include <vector>
#include <unordered_set>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n == 1) {
            return {0};
        }

        vector<unordered_set<int>> graph(n);
        for (auto& edge : edges) {
            graph[edge[0]].insert(edge[1]);
            graph[edge[1]].insert(edge[0]);
        }

        queue<int> leaves;
        for (int node = 0; node < n; node++) {
            if (graph[node].size() == 1) {
                leaves.push(node);
            }
        }

        int remaining = n;
        while (remaining > 2) {
            int leafCount = leaves.size();
            remaining -= leafCount;
            for (int i = 0; i < leafCount; i++) {
                int leaf = leaves.front();
                leaves.pop();
                int neighbor = *graph[leaf].begin();
                graph[neighbor].erase(leaf);
                if (graph[neighbor].size() == 1) {
                    leaves.push(neighbor);
                }
            }
        }

        vector<int> result;
        while (!leaves.empty()) {
            result.push_back(leaves.front());
            leaves.pop();
        }
        return result;
    }
};
