#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minOperations(vector<string>& logs) {
        int depth = 0;
        for (const string& log : logs) {
            if (log == "../") {
                depth = max(0, depth - 1);
            } else if (log == "./") {
                continue;
            } else {
                depth++;
            }
        }
        return depth;
    }
};
