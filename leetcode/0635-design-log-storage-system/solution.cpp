#include <array>
#include <string>
#include <unordered_map>
#include <vector>
using namespace std;

class LogSystem {
    vector<pair<int, array<int, 6>>> logs; // (id, [year, month, day, hour, minute, second])
    unordered_map<string, int> granularity = {
        {"Year", 0}, {"Month", 1}, {"Day", 2}, {"Hour", 3}, {"Minute", 4}, {"Second", 5}
    };

    array<int, 6> parse(const string& timestamp) {
        array<int, 6> result{};
        int idx = 0, i = 0;
        while (i < (int)timestamp.size()) {
            int j = i;
            while (j < (int)timestamp.size() && timestamp[j] != ':') j++;
            result[idx++] = stoi(timestamp.substr(i, j - i));
            i = j + 1;
        }
        return result;
    }

    // lexicographic comparison of the first (idx + 1) fields, like comparing tuples
    int compare(const array<int, 6>& a, const array<int, 6>& b, int idx) {
        for (int i = 0; i <= idx; i++) {
            if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1;
        }
        return 0;
    }

public:
    LogSystem() {}

    void put(int id, string timestamp) {
        logs.push_back({id, parse(timestamp)});
    }

    vector<int> retrieve(string start, string end, string gran) {
        int idx = granularity[gran];
        array<int, 6> startParts = parse(start);
        array<int, 6> endParts = parse(end);
        vector<int> result;
        for (auto& [id, parts] : logs) {
            if (compare(parts, startParts, idx) >= 0 && compare(parts, endParts, idx) <= 0) {
                result.push_back(id);
            }
        }
        return result;
    }
};

/**
 * Your LogSystem object will be instantiated and called as such:
 * LogSystem* obj = new LogSystem();
 * obj->put(id,timestamp);
 * vector<int> param_2 = obj->retrieve(start,end,granularity);
 */
