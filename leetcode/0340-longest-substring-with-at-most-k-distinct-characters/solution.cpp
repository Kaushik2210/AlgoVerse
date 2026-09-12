#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstringKDistinct(string s, int k) {
        if (k == 0) {
            return 0;
        }

        unordered_map<char, int> counts;
        int left = 0, best = 0;

        for (int right = 0; right < (int)s.size(); right++) {
            counts[s[right]]++;

            while ((int)counts.size() > k) {
                char leftCh = s[left];
                if (--counts[leftCh] == 0) {
                    counts.erase(leftCh);
                }
                left++;
            }

            best = max(best, right - left + 1);
        }

        return best;
    }
};
