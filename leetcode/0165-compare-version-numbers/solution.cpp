#include <string>
#include <vector>
#include <sstream>
using namespace std;

class Solution {
public:
    int compareVersion(string version1, string version2) {
        vector<int> parts1 = split(version1);
        vector<int> parts2 = split(version2);
        int n = max(parts1.size(), parts2.size());

        for (int i = 0; i < n; i++) {
            int v1 = i < (int)parts1.size() ? parts1[i] : 0;
            int v2 = i < (int)parts2.size() ? parts2[i] : 0;
            if (v1 < v2) return -1;
            if (v1 > v2) return 1;
        }

        return 0;
    }

private:
    vector<int> split(const string& version) {
        vector<int> result;
        stringstream ss(version);
        string token;
        while (getline(ss, token, '.')) {
            result.push_back(stoi(token));
        }
        return result;
    }
};
