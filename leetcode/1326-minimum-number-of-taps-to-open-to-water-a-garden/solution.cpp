#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minTaps(int n, vector<int>& ranges) {
        vector<int> farthest(n + 1, 0);
        for (int i = 0; i <= n; i++) {
            int start = max(0, i - ranges[i]);
            int end = min(n, i + ranges[i]);
            farthest[start] = max(farthest[start], end);
        }

        int count = 0;
        int currentEnd = 0;
        int nextEnd = 0;
        int s = 0;
        while (currentEnd < n) {
            while (s <= currentEnd && s <= n) {
                nextEnd = max(nextEnd, farthest[s]);
                s++;
            }
            if (nextEnd <= currentEnd) {
                return -1;
            }
            count++;
            currentEnd = nextEnd;
        }
        return count;
    }
};
