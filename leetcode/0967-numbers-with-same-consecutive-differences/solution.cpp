#include <vector>
#include <set>
using namespace std;

class Solution {
public:
    vector<int> numsSameConsecDiff(int n, int k) {
        vector<int> current;
        for (int d = 1; d <= 9; d++) {
            current.push_back(d);
        }

        for (int level = 1; level < n; level++) {
            vector<int> nextLevel;
            for (int num : current) {
                int lastDigit = num % 10;
                set<int> diffs = {k, -k};
                for (int diff : diffs) {
                    int newDigit = lastDigit + diff;
                    if (newDigit >= 0 && newDigit <= 9) {
                        nextLevel.push_back(num * 10 + newDigit);
                    }
                }
            }
            current = nextLevel;
        }

        return current;
    }
};
