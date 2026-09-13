#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestCycle(vector<int>& edges) {
        int n = edges.size();
        vector<int> visitTime(n, -1);
        int answer = -1;
        int timer = 0;

        for (int start = 0; start < n; start++) {
            if (visitTime[start] != -1) continue;

            int walkStartTime = timer;
            int u = start;
            while (u != -1 && visitTime[u] == -1) {
                visitTime[u] = timer++;
                u = edges[u];
            }

            if (u != -1 && visitTime[u] >= walkStartTime) {
                answer = max(answer, timer - visitTime[u]);
            }
        }

        return answer;
    }
};
