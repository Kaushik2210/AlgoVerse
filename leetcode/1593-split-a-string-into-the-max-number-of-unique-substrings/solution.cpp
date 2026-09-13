#include <string>
#include <unordered_set>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxUniqueSplit(string s) {
        this->s = s;
        best = 0;
        backtrack(0);
        return best;
    }

private:
    string s;
    unordered_set<string> seen;
    int best;

    void backtrack(int start) {
        int n = (int)s.size();
        if (start == n) {
            best = max(best, (int)seen.size());
            return;
        }
        if ((int)seen.size() + (n - start) <= best) {
            return;
        }
        for (int end = start + 1; end <= n; end++) {
            string piece = s.substr(start, end - start);
            if (!seen.count(piece)) {
                seen.insert(piece);
                backtrack(end);
                seen.erase(piece);
            }
        }
    }
};
