#include <vector>
using namespace std;

class Solution {
public:
    vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {
        vector<int> diff(n + 1, 0);
        for (auto& booking : bookings) {
            int first = booking[0];
            int last = booking[1];
            int seats = booking[2];
            diff[first - 1] += seats;
            diff[last] -= seats;
        }

        vector<int> result(n, 0);
        int running = 0;
        for (int i = 0; i < n; i++) {
            running += diff[i];
            result[i] = running;
        }
        return result;
    }
};
