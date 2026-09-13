#include <vector>
#include <array>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        vector<vector<int>> graph(n);
        for (auto& c : connections) {
            graph[c[0]].push_back(c[1]);
            graph[c[1]].push_back(c[0]);
        }

        vector<int> disc(n, -1), low(n, -1);
        vector<vector<int>> bridges;
        int timer = 0;

        // Iterative Tarjan bridge-finding to avoid recursion-depth issues on
        // graphs with up to 10^5 nodes.
        for (int start = 0; start < n; start++) {
            if (disc[start] != -1) continue;

            // stack frame: {node, parentEdgeIndex, nextChildIdx}
            vector<array<int, 3>> stack;
            disc[start] = low[start] = timer++;
            stack.push_back({start, -1, 0});

            while (!stack.empty()) {
                auto& frame = stack.back();
                int u = frame[0], parentEdge = frame[1];
                int idx = frame[2];

                if (idx < (int)graph[u].size()) {
                    frame[2]++;
                    int v = graph[u][idx];

                    if (idx == parentEdge) continue;

                    if (disc[v] == -1) {
                        disc[v] = low[v] = timer++;
                        int backIdx = (int)(find(graph[v].begin(), graph[v].end(), u) - graph[v].begin());
                        stack.push_back({v, backIdx, 0});
                    } else {
                        low[u] = min(low[u], disc[v]);
                    }
                } else {
                    stack.pop_back();
                    if (!stack.empty()) {
                        int parentU = stack.back()[0];
                        low[parentU] = min(low[parentU], low[u]);
                        if (low[u] > disc[parentU]) {
                            bridges.push_back({parentU, u});
                        }
                    }
                }
            }
        }

        return bridges;
    }
};
