#include <vector>
using namespace std;

class RangeModule {
    vector<pair<int, int>> intervals; // sorted, disjoint, non-adjacent [start, end)

public:
    RangeModule() {}

    void addRange(int left, int right) {
        vector<pair<int, int>> newIntervals;
        size_t i = 0, n = intervals.size();
        while (i < n && intervals[i].second < left) {
            newIntervals.push_back(intervals[i]);
            i++;
        }
        while (i < n && intervals[i].first <= right) {
            left = min(left, intervals[i].first);
            right = max(right, intervals[i].second);
            i++;
        }
        newIntervals.push_back({left, right});
        while (i < n) {
            newIntervals.push_back(intervals[i]);
            i++;
        }
        intervals = newIntervals;
    }

    bool queryRange(int left, int right) {
        for (auto& [s, e] : intervals) {
            if (s <= left && right <= e) {
                return true;
            }
            if (s > left) {
                break;
            }
        }
        return false;
    }

    void removeRange(int left, int right) {
        vector<pair<int, int>> newIntervals;
        for (auto& [s, e] : intervals) {
            if (e <= left || s >= right) {
                newIntervals.push_back({s, e});
            } else {
                if (s < left) newIntervals.push_back({s, left});
                if (e > right) newIntervals.push_back({right, e});
            }
        }
        intervals = newIntervals;
    }
};

/**
 * Your RangeModule object will be instantiated and called as such:
 * RangeModule* obj = new RangeModule();
 * obj->addRange(left,right);
 * bool param_2 = obj->queryRange(left,right);
 * obj->removeRange(left,right);
 */
