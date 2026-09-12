#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> counts(26, 0);
        int left = 0;
        int maxFreq = 0;
        int best = 0;

        for (int right = 0; right < (int)s.size(); right++) {
            int c = s[right] - 'A';
            counts[c]++;
            maxFreq = max(maxFreq, counts[c]);

            int windowLen = right - left + 1;
            if (windowLen - maxFreq > k) {
                counts[s[left] - 'A']--;
                left++;
            }

            best = max(best, right - left + 1);
        }

        return best;
    }
};
