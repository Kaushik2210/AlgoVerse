#include <string>
#include <unordered_map>
#include <vector>
using namespace std;

class TimeMap {
public:
    TimeMap() {}

    void set(string key, string value, int timestamp) {
        store[key].push_back({timestamp, value});
    }

    string get(string key, int timestamp) {
        auto it = store.find(key);
        if (it == store.end() || it->second.empty()) {
            return "";
        }
        auto& entries = it->second;

        int lo = 0, hi = (int)entries.size() - 1;
        string result = "";
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (entries[mid].first <= timestamp) {
                result = entries[mid].second;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return result;
    }

private:
    unordered_map<string, vector<pair<int, string>>> store;
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * TimeMap* obj = new TimeMap();
 * obj->set(key,value,timestamp);
 * string param_2 = obj->get(key,timestamp);
 */
