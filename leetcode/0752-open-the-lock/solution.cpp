#include <string>
#include <vector>
#include <queue>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        unordered_set<string> dead(deadends.begin(), deadends.end());

        if (dead.count("0000")) return -1;
        if (target == "0000") return 0;

        unordered_set<string> visited;
        visited.insert("0000");
        queue<string> q;
        q.push("0000");
        int steps = 0;

        while (!q.empty()) {
            int size = q.size();
            steps++;
            for (int s = 0; s < size; s++) {
                string state = q.front();
                q.pop();
                for (int i = 0; i < 4; i++) {
                    int digit = state[i] - '0';
                    for (int delta : {-1, 1}) {
                        int nextDigit = (digit + delta + 10) % 10;
                        string nextState = state;
                        nextState[i] = '0' + nextDigit;
                        if (!dead.count(nextState) && !visited.count(nextState)) {
                            if (nextState == target) return steps;
                            visited.insert(nextState);
                            q.push(nextState);
                        }
                    }
                }
            }
        }

        return -1;
    }
};
