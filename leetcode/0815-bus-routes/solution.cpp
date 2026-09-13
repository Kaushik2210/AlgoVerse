#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int numBusesToDestination(vector<vector<int>>& routes, int source, int target) {
        if (source == target) return 0;

        unordered_map<int, vector<int>> stopToRoutes;
        for (int r = 0; r < (int)routes.size(); r++) {
            for (int stop : routes[r]) {
                stopToRoutes[stop].push_back(r);
            }
        }

        unordered_set<int> visitedRoutes;
        unordered_set<int> visitedStops = {source};
        queue<pair<int,int>> q; // routeIdx, buses

        for (int r : stopToRoutes[source]) {
            visitedRoutes.insert(r);
            q.push({r, 1});
        }

        while (!q.empty()) {
            auto [routeIdx, buses] = q.front();
            q.pop();
            for (int stop : routes[routeIdx]) {
                if (stop == target) return buses;
                if (visitedStops.count(stop)) continue;
                visitedStops.insert(stop);
                for (int nextRoute : stopToRoutes[stop]) {
                    if (!visitedRoutes.count(nextRoute)) {
                        visitedRoutes.insert(nextRoute);
                        q.push({nextRoute, buses + 1});
                    }
                }
            }
        }

        return -1;
    }
};
