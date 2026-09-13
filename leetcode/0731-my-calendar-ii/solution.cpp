#include <vector>
#include <algorithm>
using namespace std;

class MyCalendarTwo {
public:
    vector<pair<int, int>> bookings;
    vector<pair<int, int>> overlaps;

    MyCalendarTwo() {}

    bool book(int start, int end) {
        for (auto& [s, e] : overlaps) {
            if (start < e && s < end) {
                return false;
            }
        }

        for (auto& [s, e] : bookings) {
            int os = max(start, s);
            int oe = min(end, e);
            if (os < oe) {
                overlaps.push_back({os, oe});
            }
        }

        bookings.push_back({start, end});
        return true;
    }
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * MyCalendarTwo* obj = new MyCalendarTwo();
 * bool param_1 = obj->book(start,end);
 */
