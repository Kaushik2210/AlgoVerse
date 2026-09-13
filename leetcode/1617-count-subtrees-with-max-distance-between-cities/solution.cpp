#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> countSubgraphsForEachDiameter(int n, vector<vector<int>>& edges) {
        vector<vector<int>> graph(n);
        for (auto& e : edges) {
            graph[e[0] - 1].push_back(e[1] - 1);
            graph[e[1] - 1].push_back(e[0] - 1);
        }

        vector<int> answer(n - 1, 0);

        for (int mask = 1; mask < (1 << n); mask++) {
            int count = __builtin_popcount(mask);
            if (count < 2) continue;

            int start = __builtin_ctz(mask);
            vector<int> dist = bfs(graph, start, mask, n);

            int reached = 0, farthestNode = start, farthestDist = 0;
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) && dist[i] != -1) {
                    reached++;
                    if (dist[i] > farthestDist) {
                        farthestDist = dist[i];
                        farthestNode = i;
                    }
                }
            }
            if (reached != count) continue;

            vector<int> dist2 = bfs(graph, farthestNode, mask, n);
            int diameter = 0;
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    diameter = max(diameter, dist2[i]);
                }
            }

            answer[diameter - 1]++;
        }

        return answer;
    }

private:
    vector<int> bfs(vector<vector<int>>& graph, int start, int mask, int n) {
        vector<int> dist(n, -1);
        dist[start] = 0;
        queue<int> q;
        q.push(start);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : graph[u]) {
                if ((mask & (1 << v)) && dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    q.push(v);
                }
            }
        }
        return dist;
    }
};
