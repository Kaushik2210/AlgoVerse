#include <vector>
using namespace std;

class Solution {
public:
    vector<int> getModifiedArray(int length, vector<vector<int>>& updates) {
        vector<int> diff(length + 1, 0);
        for (auto& update : updates) {
            int start = update[0];
            int end = update[1];
            int inc = update[2];
            diff[start] += inc;
            diff[end + 1] -= inc;
        }

        vector<int> result(length, 0);
        int running = 0;
        for (int i = 0; i < length; i++) {
            running += diff[i];
            result[i] = running;
        }
        return result;
    }
};
