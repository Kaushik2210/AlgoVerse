#include <vector>
#include <queue>
#include <unordered_map>
#include <set>
using namespace std;

class Solution {
public:
    vector<int> sortItems(int n, int m, vector<int>& group, vector<vector<int>>& beforeItems) {
        vector<int> g = group;
        int nextGroup = m;
        for (int i = 0; i < n; i++) {
            if (g[i] == -1) g[i] = nextGroup++;
        }
        int totalGroups = nextGroup;

        vector<vector<int>> itemGraph(n);
        vector<int> itemInDegree(n, 0);
        vector<vector<int>> groupGraph(totalGroups);
        vector<int> groupInDegree(totalGroups, 0);
        set<pair<int,int>> groupEdgesSeen;

        for (int i = 0; i < n; i++) {
            for (int dep : beforeItems[i]) {
                itemGraph[dep].push_back(i);
                itemInDegree[i]++;

                int gi = g[i], gd = g[dep];
                if (gi != gd) {
                    auto key = make_pair(gd, gi);
                    if (!groupEdgesSeen.count(key)) {
                        groupEdgesSeen.insert(key);
                        groupGraph[gd].push_back(gi);
                        groupInDegree[gi]++;
                    }
                }
            }
        }

        auto topoSort = [](int size, vector<vector<int>>& graph, vector<int>& inDegree) -> vector<int> {
            queue<int> q;
            for (int v = 0; v < size; v++) {
                if (inDegree[v] == 0) q.push(v);
            }
            vector<int> order;
            while (!q.empty()) {
                int v = q.front(); q.pop();
                order.push_back(v);
                for (int nxt : graph[v]) {
                    if (--inDegree[nxt] == 0) q.push(nxt);
                }
            }
            if ((int)order.size() != size) return {};
            return order;
        };

        vector<int> groupOrder = topoSort(totalGroups, groupGraph, groupInDegree);
        if ((int)groupOrder.size() != totalGroups) return {};

        vector<int> itemOrder = topoSort(n, itemGraph, itemInDegree);
        if ((int)itemOrder.size() != n) return {};

        unordered_map<int, vector<int>> itemsByGroup;
        for (int item : itemOrder) {
            itemsByGroup[g[item]].push_back(item);
        }

        vector<int> result;
        result.reserve(n);
        for (int gid : groupOrder) {
            if (itemsByGroup.count(gid)) {
                for (int item : itemsByGroup[gid]) {
                    result.push_back(item);
                }
            }
        }

        return result;
    }
};
