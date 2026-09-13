#include <string>
#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int maximumRemovals(string s, string p, vector<int>& removable) {
        int lo = 0, hi = removable.size();

        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (isSubsequence(s, p, removable, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

private:
    bool isSubsequence(string& s, string& p, vector<int>& removable, int k) {
        unordered_set<int> removed(removable.begin(), removable.begin() + k);

        int j = 0;
        for (int i = 0; i < (int)s.size() && j < (int)p.size(); i++) {
            if (removed.count(i)) continue;
            if (s[i] == p[j]) j++;
        }
        return j == (int)p.size();
    }
};
