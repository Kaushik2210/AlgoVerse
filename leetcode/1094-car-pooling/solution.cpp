#include <vector>
using namespace std;

class Solution {
public:
    bool carPooling(vector<vector<int>>& trips, int capacity) {
        vector<int> delta(1001, 0);
        for (auto& trip : trips) {
            delta[trip[1]] += trip[0];
            delta[trip[2]] -= trip[0];
        }

        int passengers = 0;
        for (int change : delta) {
            passengers += change;
            if (passengers > capacity) {
                return false;
            }
        }
        return true;
    }
};
