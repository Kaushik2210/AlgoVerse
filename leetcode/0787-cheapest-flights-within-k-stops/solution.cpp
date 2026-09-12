#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> dist(n, INT_MAX);
        dist[src] = 0;

        for (int i = 0; i <= k; i++) {
            vector<int> newDist = dist;
            for (auto& flight : flights) {
                int u = flight[0], v = flight[1], price = flight[2];
                if (dist[u] != INT_MAX && dist[u] + price < newDist[v]) {
                    newDist[v] = dist[u] + price;
                }
            }
            dist = newDist;
        }

        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};
