#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<string> maxNumOfSubstrings(string s) {
        vector<int> first(26, -1), last(26, -1);
        for (int i = 0; i < (int)s.size(); i++) {
            int c = s[i] - 'a';
            if (first[c] == -1) {
                first[c] = i;
            }
            last[c] = i;
        }

        vector<pair<int, int>> intervals;
        for (int i = 0; i < (int)s.size(); i++) {
            int c = s[i] - 'a';
            if (first[c] != i) {
                continue;
            }

            int end = last[c];
            int j = i;
            bool valid = true;
            while (j <= end) {
                int cj = s[j] - 'a';
                if (first[cj] < i) {
                    valid = false;
                    break;
                }
                end = max(end, last[cj]);
                j++;
            }

            if (valid) {
                intervals.push_back({i, end});
            }
        }

        sort(intervals.begin(), intervals.end(),
             [](const pair<int, int>& a, const pair<int, int>& b) { return a.second < b.second; });

        vector<string> result;
        int prevEnd = -1;
        for (auto& [start, end] : intervals) {
            if (start > prevEnd) {
                result.push_back(s.substr(start, end - start + 1));
                prevEnd = end;
            }
        }

        return result;
    }
};
