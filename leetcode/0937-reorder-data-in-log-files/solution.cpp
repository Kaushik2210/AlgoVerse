#include <string>
#include <vector>
#include <algorithm>
#include <cctype>
using namespace std;

class Solution {
public:
    vector<string> reorderLogFiles(vector<string>& logs) {
        vector<string> letterLogs, digitLogs;

        for (auto& log : logs) {
            size_t spaceIdx = log.find(' ');
            if (isdigit(log[spaceIdx + 1])) {
                digitLogs.push_back(log);
            } else {
                letterLogs.push_back(log);
            }
        }

        stable_sort(letterLogs.begin(), letterLogs.end(), [](const string& a, const string& b) {
            size_t aSpace = a.find(' ');
            size_t bSpace = b.find(' ');
            string aId = a.substr(0, aSpace), aRest = a.substr(aSpace + 1);
            string bId = b.substr(0, bSpace), bRest = b.substr(bSpace + 1);

            if (aRest != bRest) return aRest < bRest;
            return aId < bId;
        });

        letterLogs.insert(letterLogs.end(), digitLogs.begin(), digitLogs.end());
        return letterLogs;
    }
};
