#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        int n = (int)position.size();
        vector<pair<int, int>> cars; // (position, speed)
        for (int i = 0; i < n; i++) {
            cars.push_back({position[i], speed[i]});
        }
        sort(cars.rbegin(), cars.rend()); // closest to target first

        int fleets = 0;
        double currentTime = 0.0;

        for (auto& [pos, spd] : cars) {
            double timeToTarget = (double)(target - pos) / spd;
            if (timeToTarget > currentTime) {
                fleets++;
                currentTime = timeToTarget;
            }
        }

        return fleets;
    }
};
