#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
        int target = (int)graph.size() - 1;
        vector<vector<int>> results;
        vector<int> path = {0};
        dfs(graph, 0, target, path, results);
        return results;
    }

private:
    void dfs(vector<vector<int>>& graph, int node, int target, vector<int>& path, vector<vector<int>>& results) {
        if (node == target) {
            results.push_back(path);
            return;
        }
        for (int neighbor : graph[node]) {
            path.push_back(neighbor);
            dfs(graph, neighbor, target, path, results);
            path.pop_back();
        }
    }
};
