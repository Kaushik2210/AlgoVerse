#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {
        priority_queue<int> maxHeap;
        long long fuel = startFuel;
        int stops = 0;
        int i = 0;
        int n = stations.size();

        while (fuel < target) {
            while (i < n && stations[i][0] <= fuel) {
                maxHeap.push(stations[i][1]);
                i++;
            }

            if (maxHeap.empty()) {
                return -1;
            }

            fuel += maxHeap.top();
            maxHeap.pop();
            stops++;
        }

        return stops;
    }
};
