#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> counts(26, 0);
        for (char c : tasks) {
            counts[c - 'A']++;
        }

        int maxCount = *max_element(counts.begin(), counts.end());

        int numMax = 0;
        for (int c : counts) {
            if (c == maxCount) {
                numMax++;
            }
        }

        int frame = (maxCount - 1) * (n + 1) + numMax;

        return max(frame, (int)tasks.size());
    }
};
