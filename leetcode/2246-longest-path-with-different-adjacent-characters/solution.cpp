#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestPath(vector<int>& parent, string s) {
        int n = parent.size();
        vector<vector<int>> children(n);
        for (int v = 1; v < n; v++) {
            children[parent[v]].push_back(v);
        }

        vector<int> longestDown(n, 1);
        int answer = 1;

        vector<int> order;
        vector<int> stack = {0};
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (int c : children[u]) {
                stack.push_back(c);
            }
        }

        for (int i = (int)order.size() - 1; i >= 0; i--) {
            int u = order[i];
            int best1 = 0, best2 = 0;
            for (int c : children[u]) {
                if (s[c] != s[u]) {
                    int chain = longestDown[c];
                    if (chain > best1) {
                        best2 = best1;
                        best1 = chain;
                    } else if (chain > best2) {
                        best2 = chain;
                    }
                }
            }
            longestDown[u] = 1 + best1;
            answer = max(answer, 1 + best1 + best2);
        }

        return answer;
    }
};
