#include <vector>
#include <functional>
using namespace std;

class Solution {
public:
    vector<int> loudAndRich(vector<vector<int>>& richer, vector<int>& quiet) {
        int n = quiet.size();
        vector<vector<int>> graph(n);
        for (auto& r : richer) {
            graph[r[1]].push_back(r[0]); // r[1] is poorer than r[0], explore from poorer towards richer
        }

        vector<int> memo(n, -1);

        function<int(int)> quietest = [&](int x) -> int {
            if (memo[x] != -1) {
                return memo[x];
            }

            int best = x;
            for (int y : graph[x]) {
                int candidate = quietest(y);
                if (quiet[candidate] < quiet[best]) {
                    best = candidate;
                }
            }

            memo[x] = best;
            return best;
        };

        vector<int> answer(n);
        for (int x = 0; x < n; x++) {
            answer[x] = quietest(x);
        }
        return answer;
    }
};
