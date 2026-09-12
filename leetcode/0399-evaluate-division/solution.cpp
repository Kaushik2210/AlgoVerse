#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
using namespace std;

class Solution {
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        unordered_map<string, unordered_map<string, double>> graph;

        for (size_t i = 0; i < equations.size(); i++) {
            const string& a = equations[i][0];
            const string& b = equations[i][1];
            double value = values[i];
            graph[a][b] = value;
            graph[b][a] = 1.0 / value;
        }

        vector<double> results;
        for (auto& query : queries) {
            const string& c = query[0];
            const string& d = query[1];
            if (!graph.count(c) || !graph.count(d)) {
                results.push_back(-1.0);
            } else {
                unordered_set<string> visited;
                results.push_back(dfs(graph, c, d, 1.0, visited));
            }
        }
        return results;
    }

private:
    double dfs(unordered_map<string, unordered_map<string, double>>& graph, const string& node,
               const string& target, double product, unordered_set<string>& visited) {
        if (node == target) {
            return product;
        }
        visited.insert(node);
        for (auto& [neighbor, weight] : graph[node]) {
            if (!visited.count(neighbor)) {
                double result = dfs(graph, neighbor, target, product * weight, visited);
                if (result != -1.0) {
                    return result;
                }
            }
        }
        return -1.0;
    }
};
