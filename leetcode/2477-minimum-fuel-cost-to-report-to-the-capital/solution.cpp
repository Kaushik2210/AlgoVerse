#include <vector>
using namespace std;

class Solution {
public:
    long long minimumFuelCost(vector<vector<int>>& roads, int seats) {
        int n = roads.size() + 1;
        vector<vector<int>> graph(n);
        for (auto& r : roads) {
            graph[r[0]].push_back(r[1]);
            graph[r[1]].push_back(r[0]);
        }

        vector<int> subtreeSize(n, 1);
        vector<int> parent(n, -1);
        vector<bool> visited(n, false);
        visited[0] = true;

        vector<int> order;
        vector<int> stack = {0};
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (int v : graph[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    stack.push_back(v);
                }
            }
        }

        long long totalFuel = 0;
        for (int i = (int)order.size() - 1; i >= 0; i--) {
            int u = order[i];
            if (parent[u] != -1) {
                subtreeSize[parent[u]] += subtreeSize[u];
                totalFuel += (subtreeSize[u] + seats - 1) / seats;
            }
        }

        return totalFuel;
    }
};
