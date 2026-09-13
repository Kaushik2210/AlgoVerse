#include <vector>
using namespace std;

class Solution {
public:
    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>>& edges) {
        vector<int> indegree(n, 0);
        for (auto& edge : edges) {
            indegree[edge[1]]++;
        }

        vector<int> result;
        for (int node = 0; node < n; node++) {
            if (indegree[node] == 0) {
                result.push_back(node);
            }
        }
        return result;
    }
};
