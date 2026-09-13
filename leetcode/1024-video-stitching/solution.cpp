#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int videoStitching(vector<vector<int>>& clips, int time) {
        vector<int> farthest(time, 0);
        for (auto& clip : clips) {
            if (clip[0] < time) {
                farthest[clip[0]] = max(farthest[clip[0]], clip[1]);
            }
        }

        int count = 0;
        int currentEnd = 0;
        int nextEnd = 0;
        int s = 0;
        while (currentEnd < time) {
            while (s <= currentEnd && s < time) {
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
