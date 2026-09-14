#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <cstdlib>
using namespace std;

class Solution {
public:
    int bound;
    unordered_map<int, int> remap;

    Solution(int n, vector<int>& blacklist) {
        bound = n - (int)blacklist.size();
        unordered_set<int> blacklisted(blacklist.begin(), blacklist.end());

        int nextWhitelisted = bound;
        for (int b : blacklist) {
            if (b < bound) {
                while (blacklisted.count(nextWhitelisted)) {
                    nextWhitelisted++;
                }
                remap[b] = nextWhitelisted;
                nextWhitelisted++;
            }
        }
    }

    int pick() {
        int x = rand() % bound;
        auto it = remap.find(x);
        return it != remap.end() ? it->second : x;
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(n, blacklist);
 * int param_1 = obj->pick();
 */
