#include <vector>
#include <unordered_map>
#include <queue>
using namespace std;

class Solution {
public:
    int minJumps(vector<int>& arr) {
        int n = arr.size();
        if (n == 1) {
            return 0;
        }

        unordered_map<int, vector<int>> valueToIndices;
        for (int i = 0; i < n; i++) {
            valueToIndices[arr[i]].push_back(i);
        }

        vector<bool> visited(n, false);
        visited[0] = true;
        queue<int> q;
        q.push(0);
        int steps = 0;

        while (!q.empty()) {
            int size = q.size();
            for (int k = 0; k < size; k++) {
                int i = q.front();
                q.pop();
                if (i == n - 1) {
                    return steps;
                }

                vector<int> neighbors = valueToIndices[arr[i]];
                neighbors.push_back(i - 1);
                neighbors.push_back(i + 1);
                valueToIndices[arr[i]].clear();

                for (int j : neighbors) {
                    if (j >= 0 && j < n && !visited[j]) {
                        visited[j] = true;
                        q.push(j);
                    }
                }
            }
            steps++;
        }

        return -1;
    }
};
