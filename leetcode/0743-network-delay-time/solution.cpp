#include <vector>
#include <queue>
#include <climits>
using namespace std;

class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int, int>>> graph(n + 1);
        for (auto& time : times) {
            graph[time[0]].push_back({time[1], time[2]});
        }

        vector<int> dist(n + 1, INT_MAX);
        dist[k] = 0;

        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> heap;
        heap.push({0, k});

        while (!heap.empty()) {
            auto [d, node] = heap.top();
            heap.pop();
            if (d > dist[node]) {
                continue;
            }
            for (auto& [neighbor, weight] : graph[node]) {
                int newDist = d + weight;
                if (newDist < dist[neighbor]) {
                    dist[neighbor] = newDist;
                    heap.push({newDist, neighbor});
                }
            }
        }

        int farthest = 0;
        for (int i = 1; i <= n; i++) {
            farthest = max(farthest, dist[i]);
        }
        return farthest == INT_MAX ? -1 : farthest;
    }
};
