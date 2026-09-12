#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        if (intervals.empty()) {
            return 0;
        }

        int n = (int)intervals.size();
        vector<int> starts(n), ends(n);
        for (int i = 0; i < n; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }
        sort(starts.begin(), starts.end());
        sort(ends.begin(), ends.end());

        int rooms = 0, maxRooms = 0;
        int s = 0, e = 0;

        while (s < n) {
            if (starts[s] < ends[e]) {
                rooms++;
                maxRooms = max(maxRooms, rooms);
                s++;
            } else {
                rooms--;
                e++;
            }
        }

        return maxRooms;
    }
};
