#include <vector>
#include <algorithm>
using namespace std;

// Definition for an Interval.
class Interval {
public:
    int start;
    int end;

    Interval() {}
    Interval(int _start, int _end) {
        start = _start;
        end = _end;
    }
};

class Solution {
public:
    vector<Interval> employeeFreeTime(vector<vector<Interval>>& schedule) {
        vector<Interval> intervals;
        for (auto& employee : schedule) {
            for (auto& iv : employee) {
                intervals.push_back(iv);
            }
        }
        sort(intervals.begin(), intervals.end(), [](const Interval& a, const Interval& b) {
            return a.start < b.start;
        });

        vector<Interval> merged;
        for (auto& iv : intervals) {
            if (!merged.empty() && iv.start <= merged.back().end) {
                merged.back().end = max(merged.back().end, iv.end);
            } else {
                merged.push_back(iv);
            }
        }

        vector<Interval> free;
        for (int i = 1; i < (int)merged.size(); i++) {
            if (merged[i - 1].end < merged[i].start) {
                free.push_back(Interval(merged[i - 1].end, merged[i].start));
            }
        }
        return free;
    }
};
