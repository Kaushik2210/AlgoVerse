#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
    bool isPalindrome(const string& s) {
        int lo = 0, hi = (int)s.size() - 1;
        while (lo < hi) {
            if (s[lo] != s[hi]) return false;
            lo++;
            hi--;
        }
        return true;
    }

public:
    vector<vector<int>> palindromePairs(vector<string>& words) {
        unordered_map<string, vector<int>> indicesOf;
        for (int i = 0; i < (int)words.size(); i++) {
            indicesOf[words[i]].push_back(i);
        }

        vector<vector<int>> result;
        for (int i = 0; i < (int)words.size(); i++) {
            const string& word = words[i];
            int n = (int)word.size();
            for (int k = 0; k <= n; k++) {
                string left = word.substr(0, k);
                string right = word.substr(k);

                if (isPalindrome(left)) {
                    string revRight = right;
                    reverse(revRight.begin(), revRight.end());
                    auto it = indicesOf.find(revRight);
                    if (it != indicesOf.end()) {
                        for (int j : it->second) {
                            if (j != i) result.push_back({j, i});
                        }
                    }
                }

                if (k != n && isPalindrome(right)) {
                    string revLeft = left;
                    reverse(revLeft.begin(), revLeft.end());
                    auto it = indicesOf.find(revLeft);
                    if (it != indicesOf.end()) {
                        for (int j : it->second) {
                            if (j != i) result.push_back({i, j});
                        }
                    }
                }
            }
        }
        return result;
    }
};
