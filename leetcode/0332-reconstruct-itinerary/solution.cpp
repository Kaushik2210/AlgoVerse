#include <vector>
#include <string>
#include <queue>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        unordered_map<string, priority_queue<string, vector<string>, greater<>>> graph;
        for (auto& ticket : tickets) {
            graph[ticket[0]].push(ticket[1]);
        }

        vector<string> result;
        dfs("JFK", graph, result);
        reverse(result.begin(), result.end());
        return result;
    }

private:
    void dfs(const string& airport, unordered_map<string, priority_queue<string, vector<string>, greater<>>>& graph, vector<string>& result) {
        auto it = graph.find(airport);
        while (it != graph.end() && !it->second.empty()) {
            string next = it->second.top();
            it->second.pop();
            dfs(next, graph, result);
        }
        result.push_back(airport);
    }
};
