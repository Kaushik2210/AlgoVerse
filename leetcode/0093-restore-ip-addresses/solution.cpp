#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    vector<string> restoreIpAddresses(string s) {
        vector<string> result;
        vector<string> segments;
        backtrack(s, 0, segments, result);
        return result;
    }

private:
    void backtrack(const string& s, int start, vector<string>& segments, vector<string>& result) {
        int n = s.size();

        if (segments.size() == 4) {
            if (start == n) {
                string ip = segments[0] + "." + segments[1] + "." + segments[2] + "." + segments[3];
                result.push_back(ip);
            }
            return;
        }

        if (n - start > (int)(4 - segments.size()) * 3) {
            return;
        }

        for (int length = 1; length <= 3 && start + length <= n; length++) {
            string segment = s.substr(start, length);
            if (isValid(segment)) {
                segments.push_back(segment);
                backtrack(s, start + length, segments, result);
                segments.pop_back();
            }
        }
    }

    bool isValid(const string& segment) {
        if (segment.size() > 1 && segment[0] == '0') {
            return false;
        }
        int value = stoi(segment);
        return value >= 0 && value <= 255;
    }
};
