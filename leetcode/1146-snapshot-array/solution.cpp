#include <vector>
using namespace std;

class SnapshotArray {
    int snapId;
    vector<vector<pair<int, int>>> history; // history[index] -> list of (snapId, value)

public:
    SnapshotArray(int length) : snapId(0), history(length) {
        for (auto& hist : history) {
            hist.push_back({0, 0});
        }
    }

    void set(int index, int val) {
        auto& hist = history[index];
        if (hist.back().first == snapId) {
            hist.back().second = val;
        } else {
            hist.push_back({snapId, val});
        }
    }

    int snap() {
        return snapId++;
    }

    int get(int index, int snap_id) {
        auto& hist = history[index];
        int lo = 0, hi = (int)hist.size() - 1, ans = 0;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (hist[mid].first <= snap_id) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return hist[ans].second;
    }
};

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * SnapshotArray* obj = new SnapshotArray(length);
 * obj->set(index,val);
 * int param_2 = obj->snap();
 * int param_3 = obj->get(index,snap_id);
 */
