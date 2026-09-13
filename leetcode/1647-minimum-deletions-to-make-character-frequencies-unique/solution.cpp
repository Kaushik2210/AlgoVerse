#include <string>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int minDeletions(string s) {
        int freq[26] = {0};
        for (char c : s) {
            freq[c - 'a']++;
        }

        unordered_set<int> used;
        int deletions = 0;

        for (int count : freq) {
            while (count > 0 && used.count(count)) {
                count--;
                deletions++;
            }
            if (count > 0) {
                used.insert(count);
            }
        }

        return deletions;
    }
};
