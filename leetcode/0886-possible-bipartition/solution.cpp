#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    bool possibleBipartition(int n, vector<vector<int>>& dislikes) {
        vector<vector<int>> graph(n + 1);
        for (auto& dislike : dislikes) {
            graph[dislike[0]].push_back(dislike[1]);
            graph[dislike[1]].push_back(dislike[0]);
        }

        vector<int> group(n + 1, 0);

        for (int start = 1; start <= n; start++) {
            if (group[start] != 0) {
                continue;
            }
            group[start] = 1;
            queue<int> q;
            q.push(start);
            while (!q.empty()) {
                int person = q.front();
                q.pop();
                for (int neighbor : graph[person]) {
                    if (group[neighbor] == 0) {
                        group[neighbor] = -group[person];
                        q.push(neighbor);
                    } else if (group[neighbor] == group[person]) {
                        return false;
                    }
                }
            }
        }

        return true;
    }
};
