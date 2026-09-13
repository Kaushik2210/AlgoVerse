#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxDistance(vector<int>& position, int m) {
        sort(position.begin(), position.end());
        int lo = 1, hi = position.back() - position.front();

        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (feasible(position, m, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

private:
    bool feasible(vector<int>& position, int m, int d) {
        int count = 1;
        int last = position[0];
        for (int i = 1; i < (int)position.size(); i++) {
            if (position[i] - last >= d) {
                count++;
                last = position[i];
            }
        }
        return count >= m;
    }
};
